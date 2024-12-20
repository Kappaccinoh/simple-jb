interface BadgeProps {
  variant: 'success' | 'warning' | 'info' | 'error' | 'default';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const variants = {
    success: 'bg-green-50/50 text-green-700 ring-green-600/10',
    warning: 'bg-yellow-50/50 text-yellow-700 ring-yellow-600/10',
    info: 'bg-blue-50/50 text-blue-700 ring-blue-600/10',
    error: 'bg-red-50/50 text-red-700 ring-red-600/10',
    default: 'bg-gray-50/50 text-gray-600 ring-gray-500/10'
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant]}`}>
      {children}
    </span>
  );
} 