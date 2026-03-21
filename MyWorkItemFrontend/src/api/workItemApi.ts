import axios from "axios";
import type {
  WorkItem,
  CreateWorkItemDto,
  UpdateWorkItemDto,
} from "../types/workItem";
import { ResponseCode } from "../types/apiResponse";
import type { ApiResponse } from "../types/apiResponse";

const api = axios.create({
  baseURL: "http://localhost:5237/api",
  headers: { "Content-Type": "application/json" },
});

export class ApiError extends Error {
  constructor(
    public code: ResponseCode,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      const data = error.response.data as ApiResponse<unknown>;
      return Promise.reject(new ApiError(data.code, data.message));
    }
    return Promise.reject(error);
  },
);

function unwrap<T>(res: ApiResponse<T>): T {
  return res.content as T;
}

export const workItemApi = {
  getAll: (): Promise<WorkItem[]> =>
    api.get<ApiResponse<WorkItem[]>>("/workitems").then((r) => unwrap(r.data)),

  getById: (id: number): Promise<WorkItem> =>
    api
      .get<ApiResponse<WorkItem>>(`/workitems/${id}`)
      .then((r) => unwrap(r.data)),

  create: (dto: CreateWorkItemDto): Promise<WorkItem> =>
    api
      .post<ApiResponse<WorkItem>>("/workitems", dto)
      .then((r) => unwrap(r.data)),

  update: (id: number, dto: UpdateWorkItemDto): Promise<WorkItem> =>
    api
      .put<ApiResponse<WorkItem>>(`/workitems/${id}`, dto)
      .then((r) => unwrap(r.data)),

  delete: (id: number): Promise<void> =>
    api.delete<ApiResponse<boolean>>(`/workitems/${id}`).then(() => undefined),
};
