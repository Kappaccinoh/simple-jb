'use client';

import { useEffect, useState } from 'react';
import { Navbar } from "@/app/components/navigation/Navbar";
import { Badge } from "@/app/components/ui/Badge";
import Link from "next/link";
import { fetchApplications } from '@/app/lib/api';

interface Application {
  id: number;
  job: {
    id: number;
    title: string;
    type: string;
    company_name: string;
  };
  applicant: {
    first_name: string;
    last_name: string;
    email: string;
    current_role: string;
    current_company: string;
  };
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  match_score: number;
  applied_date: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err) {
        setError('Failed to load applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Applicant Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and respond to candidates who have applied to your positions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
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
                            Applied {new Date(application.applied_date).toLocaleDateString()}
                          </span>
                          {application.match_score >= 90 && (
                            <Badge variant="success">
                              Match Score {application.match_score}%
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                              {application.applicant.first_name} {application.applicant.last_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {application.applicant.email}
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
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No applications found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 