import apiClient from '../api-client';

export const userService = {
  getAll: async () => {
    const response = await apiClient.get('/api/users');
    return response.data.data;
  },
  create: async (userData: any) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data.data;
  },
  updateRole: async (id: string, role: string) => {
    const response = await apiClient.patch(`/api/users/${id}/role`, { role });
    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  },
};

export const applicationService = {
  getAll: async () => {
    const response = await apiClient.get('/api/applications');
    return response.data.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/api/applications', data);
    return response.data.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.patch(`/api/applications/${id}/status`, { status });
    return response.data.data;
  },
  updateNotes: async (id: string, notes: string) => {
    const response = await apiClient.patch(`/api/applications/${id}/notes`, { notes });
    return response.data.data;
  },
  updateStep: async (id: string, currentStepId: string) => {
    const response = await apiClient.patch(`/api/applications/${id}/step`, { currentStepId });
    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/applications/${id}`);
    return response.data;
  },
};

export const interviewService = {
  getAll: async () => {
    const response = await apiClient.get('/api/interviews');
    return response.data.data;
  },
  schedule: async (data: any) => {
    const response = await apiClient.post('/api/interviews', data);
    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/interviews/${id}`);
    return response.data;
  },
};

export const workflowService = {
  get: async () => {
    const response = await apiClient.get('/api/workflow');
    return response.data.data;
  },
  update: async (data: any) => {
    const response = await apiClient.put('/api/workflow', data);
    return response.data.data;
  },
};

export const activityService = {
  getRecent: async () => {
    const response = await apiClient.get('/api/activity');
    return response.data.data;
  }
};

export const notificationService = {
  getAll: async () => {
    const response = await apiClient.get('/api/notifications');
    return response.data.data;
  },
  markRead: async (id: string) => {
    const response = await apiClient.patch(`/api/notifications/${id}/read`);
    return response.data;
  },
  markAllRead: async () => {
    const response = await apiClient.patch('/api/notifications/read-all');
    return response.data;
  }
};

export const analyticsService = {
  getDashboard: async () => {
    const response = await apiClient.get('/api/analytics/dashboard');
    return response.data.data;
  },
  getWorkflow: async () => {
    const response = await apiClient.get('/api/analytics/workflow');
    return response.data.data;
  }
};

export const permissionService = {
  getAll: async () => {
    const response = await apiClient.get('/api/permissions');
    return response.data.data;
  },
  update: async (role: string, features: string[]) => {
    const response = await apiClient.put(`/api/permissions/${role}`, { features });
    return response.data.data;
  }
};

export const documentService = {
  getAll: async () => {
    const response = await apiClient.get('/api/documents');
    return response.data.data;
  },
  updateStatus: async (id: string, status: string, remarks?: string) => {
    const response = await apiClient.patch(`/api/documents/${id}/status`, { status, remarks });
    return response.data.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/documents/${id}`);
    return response.data;
  }
};
