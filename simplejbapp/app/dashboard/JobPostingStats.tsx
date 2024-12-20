'use client';

import React from 'react';

export function JobPostingStats() {
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+4%",
      changeType: "increase"
    },
    {
      title: "Total Applications",
      value: "248",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Views This Month",
      value: "1,429",
      change: "+8%",
      changeType: "increase"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.title}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {stat.title}
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className={`mt-1 text-sm ${
            stat.changeType === 'increase' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {stat.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
} 