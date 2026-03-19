import axios from 'axios';
import type { WorkItem, CreateWorkItemDto, UpdateWorkItemDto } from '../types/workItem';

const api = axios.create({
  baseURL: 'http://localhost:5237/api',
  headers: { 'Content-Type': 'application/json' },
});

export const workItemApi = {
  getAll: (): Promise<WorkItem[]> =>
    api.get<WorkItem[]>('/workitems').then((r) => r.data),

  getById: (id: number): Promise<WorkItem> =>
    api.get<WorkItem>(`/workitems/${id}`).then((r) => r.data),

  create: (dto: CreateWorkItemDto): Promise<WorkItem> =>
    api.post<WorkItem>('/workitems', dto).then((r) => r.data),

  update: (id: number, dto: UpdateWorkItemDto): Promise<WorkItem> =>
    api.put<WorkItem>(`/workitems/${id}`, dto).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    api.delete(`/workitems/${id}`).then(() => undefined),
};
