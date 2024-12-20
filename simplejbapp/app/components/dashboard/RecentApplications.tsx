'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApplications } from '@/app/lib/api';

interface Application {
  id: number;
  job: {
    id: number;
    title: string;
    type: string;
  };
  applicant: {
    first_name: string;
    last_name: string;
    email: string;
  };
  status: string;
  applied_date: string;
  match_score: number;
  current_role: string;
  current_company: string;
  experience: number;
}

export function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await fetchApplications();
        // Sort by date and take the most recent 5
        const recentApplications = data
          .sort((a: Application, b: Application) => 
            new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
          )
          .slice(0, 5);
        setApplications(recentApplications);
      } catch (err) {
        setError('Failed to load applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      reviewed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      interviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <p className="text-red-500">Error: {error}</p>
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
            className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium dark:text-white">
                    {application.applicant.first_name}
                  </h3>
                  {application.match_score >= 90 && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
                      Top Match {application.match_score}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {application.current_role} at {application.current_company} • {application.experience} years exp.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Applied for {application.job.title} • {application.job.type}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(application.applied_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No recent applications
          </p>
        )}
      </div>
    </div>
  );
} 