'use client';

export function ApplicationFunnel() {
  const funnelData = [
    { stage: 'Total Applications', count: 248 },
    { stage: 'Reviewed', count: 180 },
    { stage: 'Interviewed', count: 45 },
    { stage: 'Offers Made', count: 12 },
    { stage: 'Hired', count: 8 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Hiring Pipeline
      </h2>
      <div className="space-y-4">
        {funnelData.map((stage) => (
          <div key={stage.stage}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">{stage.stage}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{stage.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(stage.count / 248) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 