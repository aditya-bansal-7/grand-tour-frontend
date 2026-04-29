'use client'

import { useState, useEffect } from 'react'
import { User, UserRole, rolePermissions } from '@/lib/user-data'
import { fetchUsers, deleteUser as deleteUserApi } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Trash2, Shield, AlertCircle } from 'lucide-react'

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      fetchUsers()
        .then((data) => setUsers(data))
        .catch(() => setUsers([]))
        .finally(() => setLoading(false))
    }, [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all')
  const [showPermissions, setShowPermissions] = useState<string | null>(null)

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === 'all' || u.role === filterRole

    return matchesSearch && matchesRole
  })

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserApi(id)
        setUsers(users.filter((u) => u.id !== id))
      } catch {
        alert('Failed to delete user')
      }
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    )
  }

  const roles: UserRole[] = ['super_admin', 'admin', 'team_member', 'marketing', 'hr']

  if (loading) {
    return <div className="p-8 text-center">Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as 'all' | UserRole)}
            className="px-3 py-2 border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {rolePermissions[role].name}
              </option>
            ))}
          </select>

          <Button className="gap-2" size="sm">
            <Plus className="w-4 h-4" />
            Add User
          </Button>

          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id}>
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-0.5">Role</p>
                        <p className="font-medium text-foreground">{rolePermissions[user.role].name}</p>
                      </div>

                      {user.department && (
                        <div>
                          <p className="text-muted-foreground mb-0.5">Department</p>
                          <p className="font-medium text-foreground">{user.department}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-muted-foreground mb-0.5">Joined</p>
                        <p className="font-medium text-foreground">
                          {user.joinDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                        </p>
                      </div>

                      {user.phone && (
                        <div>
                          <p className="text-muted-foreground mb-0.5">Phone</p>
                          <p className="font-medium text-foreground text-xs">{user.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowPermissions(showPermissions === user.id ? null : user.id)
                      }
                      className="gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      Permissions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>

              {showPermissions === user.id && (
                <Card className="p-4 mt-2 bg-secondary rounded-t-none">
                  <div>
                    <h5 className="font-semibold text-sm text-foreground mb-3">
                      {rolePermissions[user.role].name} Permissions
                    </h5>
                    <p className="text-xs text-muted-foreground mb-3">
                      {rolePermissions[user.role].description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {rolePermissions[user.role].permissions.map((perm) => (
                        <div key={perm} className="flex items-start gap-2">
                          <AlertCircle className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-xs text-foreground">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
