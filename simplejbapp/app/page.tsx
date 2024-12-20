import { JobPostingStats } from "@/app/components/dashboard/JobPostingStats";
import { RecentApplications } from "@/app/components/dashboard/RecentApplications";
import { ActiveJobListings } from "@/app/components/dashboard/ActiveJobListings";
import { Navbar } from "@/app/components/navigation/Navbar";
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Employer Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Overview of your recruitment activities and recent applications
            </p>
          </div>
          <Link
            href="/jobs/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post New Job
          </Link>
        </div>

        <JobPostingStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ActiveJobListings />
          <RecentApplications />
        </div>
      </div>
    </div>
  );
} 