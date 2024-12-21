'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from "@/app/components/ui/Badge";
import { fetchJobs } from '@/app/lib/api';
import { Job } from '@/app/types';

export function ActiveJobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const data = await fetchJobs();
        const activeJobs = data.filter((job) => job.status === 'active');
        setJobs(activeJobs);
      } catch (err) {
        setError('Failed to load jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Active Job Listings</h2>
        <Link
          href="/jobs"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <Link 
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <Badge variant={job.status === 'active' ? 'success' : 'error'}>
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {job.company_name} • {job.location}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Posted {new Date(job.posted_date).toLocaleDateString()}
                </span>
                {job.applicants && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {job.applicants.total} applicants • {job.applicants.new} new
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}

        {jobs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No active job listings
          </p>
        )}
      </div>
    </div>
  );
} 