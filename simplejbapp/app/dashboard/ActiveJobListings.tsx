'use client';

import React from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  location: string;
  applications: number;
  posted: string;
  status: 'active' | 'draft' | 'closed';
}

export function ActiveJobListings() {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote",
      applications: 24,
      posted: "2024-02-15",
      status: "active"
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "New York, NY",
      applications: 18,
      posted: "2024-02-14",
      status: "active"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      applications: 32,
      posted: "2024-02-13",
      status: "active"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Active Job Listings
          </h2>
          <Link 
            href="/jobs/new"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Post new job
          </Link>
        </div>
        
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.applications} applications
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {job.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted {job.posted}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex gap-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View
                  </Link>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <Link 
          href="/jobs"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          View all jobs →
        </Link>
      </div>
    </div>
  );
} 