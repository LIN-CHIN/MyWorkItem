export enum WorkItemStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface WorkItem {
  id: number;
  title: string;
  description?: string;
  status: WorkItemStatus;
  priority: Priority;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateWorkItemDto {
  title: string;
  description?: string;
  status: WorkItemStatus;
  priority: Priority;
}

export interface UpdateWorkItemDto {
  title: string;
  description?: string;
  status: WorkItemStatus;
  priority: Priority;
}
