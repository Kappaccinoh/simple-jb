'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJobs } from '@/app/lib/api';

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
  };
  location: string;
  type: string;
  status: string;
  posted_date: string;
  applicants?: {
    total: number;
    new: number;
    reviewed: number;
  };
}

export function ActiveJobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchJobs();
        // Filter only active jobs
        const activeJobs = data.filter((job: Job) => job.status === 'active');
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
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Active Job Listings</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Active Job Listings</h2>
        <p className="text-red-500">Error: {error}</p>
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

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium dark:text-white">
                  <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {job.company.name} • {job.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted {new Date(job.posted_date).toLocaleDateString()}
                </p>
              </div>
              {job.applicants && (
                <div className="text-right">
                  <p className="text-sm font-medium dark:text-white">{job.applicants.total} applicants</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {job.applicants.new} new
                  </p>
                </div>
              )}
            </div>
          </div>
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