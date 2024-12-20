'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from "@/app/components/ui/Badge";

interface Application {
  id: number;
  name: string;
  email: string;
  applied: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  job: {
    id: number;
    title: string;
    type: string;
  };
}

export function RecentApplications() {
  const applications: Application[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      applied: "2024-02-15",
      status: "new",
      job: {
        id: 1,
        title: "Senior Frontend Developer",
        type: "Full-time"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      applied: "2024-02-14",
      status: "reviewed",
      job: {
        id: 2,
        title: "Backend Engineer",
        type: "Full-time"
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      applied: "2024-02-13",
      status: "interviewed",
      job: {
        id: 3,
        title: "Full Stack Developer",
        type: "Contract"
      }
    }
  ];

  const getStatusBadge = (status: Application['status']) => {
    const variants = {
      new: 'info',
      reviewed: 'warning',
      interviewed: 'info',
      rejected: 'error',
      accepted: 'success'
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Applications
        </h2>
        
        <div className="space-y-6">
          {applications.map((application) => (
            <div 
              key={application.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col">
                    <Link 
                      href={`/jobs/${application.job.id}`}
                      className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                    >
                      {application.job.title}
                    </Link>
                    
                    <div className="mt-2 flex items-center gap-3">
                      <Badge variant="default">{application.job.type}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Applied {application.applied}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {application.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {application.email}
                        </div>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button className="text-sm px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                    View Details
                  </button>
                  <button className="text-sm px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <Link 
          href="/applications"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          View all applications →
        </Link>
      </div>
    </div>
  );
} 