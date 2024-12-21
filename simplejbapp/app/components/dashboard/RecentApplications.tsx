'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApplications, fetchUserProfile, fetchJobDetails } from '@/app/lib/api';
import { Application, UserProfile, Job } from '@/app/types';

interface ApplicationWithDetails extends Application {
  profile?: UserProfile;
  jobDetails?: Job;
}

export function RecentApplications() {
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        setLoading(true);
        const data = await fetchApplications();
        console.log('Raw applications:', data);

        const applicationsWithDetails = await Promise.all(
          data.map(async (application) => {
            try {
              const [profile, jobDetails] = await Promise.all([
                fetchUserProfile(application.applicant),
                fetchJobDetails(application.job.toString())
              ]);
              return { 
                ...application, 
                profile,
                jobDetails
              };
            } catch (err) {
              console.error(`Failed to fetch details for application ${application.id}`, err);
              return application;
            }
          })
        );

        const recentApplications = applicationsWithDetails
          .sort((a, b) => 
            new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
          )
          .slice(0, 5);

        setApplications(recentApplications);
      } catch (err) {
        console.error('Failed to load applications:', err);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded dark:bg-gray-700" />
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
        <h2 className="text-lg font-semibold">Recent Applications</h2>
        <Link
          href="/applications"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div 
            key={application.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {application.profile?.full_name || `User ${application.applicant}`}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    application.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    application.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
                    application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {application.profile?.current_role || 'No role'} at {application.profile?.current_company || 'No company'} • {application.profile?.experience_years || 0} years exp.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Applied for {application.jobDetails?.title || 'Unknown Job'} • {application.jobDetails?.type || 'N/A'}
                </p>
              </div>
              <Link
                href={`/applications/${application.id}`}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 