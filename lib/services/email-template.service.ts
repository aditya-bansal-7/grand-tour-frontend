import api from '../api-client';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export const emailTemplateService = {
  getTemplates: async (): Promise<EmailTemplate[]> => {
    const response = await api.get('/api/email-templates');
    return response.data;
  },

  getTemplate: async (id: string): Promise<EmailTemplate> => {
    const response = await api.get(`/api/email-templates/${id}`);
    return response.data;
  },

  createTemplate: async (data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.post('/api/email-templates', data);
    return response.data;
  },

  updateTemplate: async (id: string, data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.put(`/api/email-templates/${id}`, data);
    return response.data;
  },

  deleteTemplate: async (id: string): Promise<void> => {
    await api.delete(`/api/email-templates/${id}`);
  },

  seedTemplates: async (): Promise<{ message: string }> => {
    const response = await api.post('/api/email-templates/seed');
    return response.data;
  }
};
