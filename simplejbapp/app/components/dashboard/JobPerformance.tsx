'use client';

export function JobPerformance() {
  const metrics = [
    {
      jobTitle: "Senior Frontend Developer",
      views: 1245,
      applications: 48,
      conversionRate: "3.8%",
      avgTimeToApply: "2.5 days"
    },
    {
      jobTitle: "Backend Engineer",
      views: 890,
      applications: 32,
      conversionRate: "3.6%",
      avgTimeToApply: "3.1 days"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Job Performance
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Conv. Rate</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avg. Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {metrics.map((job) => (
              <tr key={job.jobTitle}>
                <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{job.jobTitle}</td>
                <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{job.views}</td>
                <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{job.applications}</td>
                <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{job.conversionRate}</td>
                <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{job.avgTimeToApply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 