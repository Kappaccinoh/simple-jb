'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from "@/app/components/ui/Badge";

interface Job {
  id: number;
  title: string;
  location: string;
  applications: number;
  posted: string;
  status: 'active' | 'draft' | 'closed';
  type: string;
}

export function ActiveJobListings() {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote",
      applications: 24,
      posted: "2024-02-15",
      status: "active",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "New York, NY",
      applications: 18,
      posted: "2024-02-14",
      status: "active",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      applications: 32,
      posted: "2024-02-13",
      status: "active",
      type: "Contract"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Active Job Listings
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {job.title}
                </h3>
                <div className="mt-1 flex items-center gap-3">
                  <Badge variant="default">{job.type}</Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.location}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.applications} applications
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 