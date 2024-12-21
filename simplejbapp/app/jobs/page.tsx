'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJobs } from '@/app/lib/api';
import { Navbar } from "@/app/components/navigation/Navbar";

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
  };
  location: string;
  type: string;
  salary: string;
  posted_date: string;
  status: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Job Listings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse our open positions
            </p>
          </div>
          <Link 
            href="/jobs/new"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Post New Job
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <Link 
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.company_name} • {job.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.type} • {job.salary}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Posted: {new Date(job.posted_date).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}

          {jobs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">
                No jobs available at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 