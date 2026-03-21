import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { workItemApi, ApiError } from "../api/workItemApi";
import { WorkItemForm } from "../components/WorkItemForm";
import type { WorkItem, CreateWorkItemDto } from "../types/workItem";

export function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    workItemApi
      .getById(Number(id))
      .then(setItem)
      .catch((err: unknown) =>
        setError(err instanceof ApiError ? err.message : "找不到此工作項目"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values: CreateWorkItemDto) => {
    try {
      await workItemApi.update(Number(id), values);
      navigate("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "儲存失敗，請稍後再試");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">載入中...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error || "找不到項目"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← 返回列表
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            編輯工作項目
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            #{item.id} · {item.title}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <WorkItemForm
            initialValues={{
              title: item.title,
              description: item.description,
              status: item.status,
              priority: item.priority,
            }}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
            submitLabel="儲存變更"
          />
        </div>
      </div>
    </div>
  );
}
