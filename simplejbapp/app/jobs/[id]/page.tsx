'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchJobDetails } from '@/app/lib/api';
import { Navbar } from "@/app/components/navigation/Navbar";
import { ApplicantList } from "@/app/components/jobs/ApplicantList";
import { Job } from '@/app/types/index';
import { Badge } from '@/app/components/ui/Badge';

export default function JobPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true);
        console.log('Fetching job details for ID:', params.id);
        const data = await fetchJobDetails(params.id as string);
        console.log('Received job data:', data);
        setJob(data);
        console.log('Job state set');
      } catch (err) {
        console.error('Error loading job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadJob();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-200">
              {error || 'Job not found'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4">
          {/* Left Column - Job Details */}
          <div className="w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{job.company_name}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="default">{job.type}</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{job.salary}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Job Description
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Requirements
                  </h2>
                  <ul className="text-sm list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Benefits
                  </h2>
                  <ul className="text-sm list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Applicants */}
          <div className="w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4">
                {job.applications && job.applications.length > 0 ? (
                  <div className="space-y-4">
                    {/* Pass the applications to the ApplicantList component */}
                    <ApplicantList applicants={job.applications} />
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No applications yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 