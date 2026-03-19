import { Priority } from '../types/workItem';

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  [Priority.Low]: { label: '低', className: 'bg-slate-100 text-slate-600' },
  [Priority.Medium]: { label: '中', className: 'bg-yellow-100 text-yellow-700' },
  [Priority.High]: { label: '高', className: 'bg-red-100 text-red-700' },
};

interface Props {
  priority: Priority;
}

export function PriorityBadge({ priority }: Props) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
