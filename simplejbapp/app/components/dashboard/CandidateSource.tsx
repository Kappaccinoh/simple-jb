'use client';

export function CandidateSource() {
  const sources = [
    { name: 'Direct Applications', count: 125, percentage: 50 },
    { name: 'LinkedIn', count: 75, percentage: 30 },
    { name: 'Indeed', count: 35, percentage: 14 },
    { name: 'Referrals', count: 15, percentage: 6 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Candidate Sources
      </h2>
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name}>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">{source.name}</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {source.count} ({source.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 