import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workItemApi, ApiError } from "../api/workItemApi";
import { WorkItemForm } from "../components/WorkItemForm";
import type { CreateWorkItemDto } from "../types/workItem";

export function CreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values: CreateWorkItemDto) => {
    try {
      await workItemApi.create(values);
      navigate("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "新增失敗，請稍後再試");
    }
  };

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
            新增工作項目
          </h1>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <WorkItemForm
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
            submitLabel="新增"
          />
        </div>
      </div>
    </div>
  );
}
