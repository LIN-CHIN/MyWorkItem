import { useState, SubmitEvent } from "react";
import { WorkItemStatus, Priority } from "../types/workItem";
import type { CreateWorkItemDto } from "../types/workItem";

interface Props {
  initialValues?: CreateWorkItemDto;
  onSubmit: (values: CreateWorkItemDto) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function WorkItemForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "儲存",
}: Props) {
  const [form, setForm] = useState<CreateWorkItemDto>(
    initialValues ?? {
      title: "",
      description: "",
      status: WorkItemStatus.Todo,
      priority: Priority.Medium,
    },
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("標題為必填欄位");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSubmit(form);
    } catch {
      setError("操作失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          標題 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="輸入工作項目標題"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          描述
        </label>
        <textarea
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="輸入描述（選填）"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            狀態
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as WorkItemStatus })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={WorkItemStatus.Todo}>待處理</option>
            <option value={WorkItemStatus.InProgress}>進行中</option>
            <option value={WorkItemStatus.Done}>已完成</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            優先度
          </label>
          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value as Priority })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={Priority.Low}>低</option>
            <option value={Priority.Medium}>中</option>
            <option value={Priority.High}>高</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "處理中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
