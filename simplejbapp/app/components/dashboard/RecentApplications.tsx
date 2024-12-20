'use client';

import React from 'react';
import Link from 'next/link';

interface Application {
  id: number;
  name: string;
  position: string;
  applied: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  email: string;
}

export function RecentApplications() {
  const applications: Application[] = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Frontend Developer",
      applied: "2024-02-15",
      status: "new",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Backend Engineer",
      applied: "2024-02-14",
      status: "reviewed",
      email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Full Stack Developer",
      applied: "2024-02-13",
      status: "interviewed",
      email: "mike.j@example.com"
    }
  ];

  const getStatusColor = (status: Application['status']) => {
    const colors = {
      new: 'bg-green-100 text-green-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interviewed: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-emerald-100 text-emerald-800'
    };
    return colors[status];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Applications
          </h2>
        </div>
        
        <div className="space-y-4">
          {applications.map((application) => (
            <div 
              key={application.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {application.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {application.position}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {application.email}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Applied {application.applied}
                  </p>
                  <div className="mt-2 flex gap-2 justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      View
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <Link 
          href="/applications"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          View all applications →
        </Link>
      </div>
    </div>
  );
} 