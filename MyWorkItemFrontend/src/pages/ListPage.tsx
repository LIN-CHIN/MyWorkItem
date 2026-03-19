import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workItemApi } from '../api/workItemApi';
import { WorkItemStatus } from '../types/workItem';
import type { WorkItem } from '../types/workItem';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';

const ALL = 'All';

export function ListPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [filter, setFilter] = useState<WorkItemStatus | typeof ALL>(ALL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const data = await workItemApi.getAll();
      setItems(data);
    } catch {
      setError('無法載入資料，請確認後端服務是否啟動');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void fetchItems(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除此工作項目？')) return;
    try {
      await workItemApi.delete(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert('刪除失敗');
    }
  };

  const filtered = filter === ALL ? items : items.filter((i) => i.status === filter);

  const statusFilters: Array<{ value: WorkItemStatus | typeof ALL; label: string }> = [
    { value: ALL, label: '全部' },
    { value: WorkItemStatus.Todo, label: '待處理' },
    { value: WorkItemStatus.InProgress, label: '進行中' },
    { value: WorkItemStatus.Done, label: '已完成' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Work Items</h1>
            <p className="text-sm text-gray-500 mt-1">管理您的工作項目</p>
          </div>
          <button
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + 新增項目
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-400">載入中...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">目前沒有工作項目</p>
            <p className="text-sm mt-1">點擊「新增項目」開始建立</p>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <StatusBadge status={item.status} />
                    <PriorityBadge priority={item.priority} />
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    建立於 {new Date(item.createdAt).toLocaleString('zh-TW')}
                    {item.updatedAt && ` · 更新於 ${new Date(item.updatedAt).toLocaleString('zh-TW')}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate(`/edit/${item.id}`)}
                    className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
