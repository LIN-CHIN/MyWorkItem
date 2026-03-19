import { WorkItemStatus } from '../types/workItem';

const statusConfig: Record<WorkItemStatus, { label: string; className: string }> = {
  [WorkItemStatus.Todo]: { label: '待處理', className: 'bg-gray-100 text-gray-700' },
  [WorkItemStatus.InProgress]: { label: '進行中', className: 'bg-blue-100 text-blue-700' },
  [WorkItemStatus.Done]: { label: '已完成', className: 'bg-green-100 text-green-700' },
};

interface Props {
  status: WorkItemStatus;
}

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
