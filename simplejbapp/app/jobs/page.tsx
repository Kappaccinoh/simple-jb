import { Navbar } from "@/app/components/navigation/Navbar";
import { Badge } from "@/app/components/ui/Badge";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed';
  posted: string;
  applicants: {
    total: number;
    new: number;
    reviewed: number;
  };
}

// Mock data - would come from API in real app
const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Your Company",
    location: "Remote",
    type: "Full-time",
    status: 'active',
    posted: "2024-02-15",
    applicants: {
      total: 24,
      new: 12,
      reviewed: 8
    }
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Your Company",
    location: "Hybrid",
    type: "Full-time",
    status: 'active',
    posted: "2024-02-14",
    applicants: {
      total: 15,
      new: 5,
      reviewed: 10
    }
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Your Company",
    location: "Remote",
    type: "Contract",
    status: 'draft',
    posted: "2024-02-13",
    applicants: {
      total: 0,
      new: 0,
      reviewed: 0
    }
  }
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Job Listings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your job postings and track applications
            </p>
          </div>
          <Link
            href="/jobs/new"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Job
          </Link>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {job.title}
                      </Link>
                      <Badge variant={
                        job.status === 'active' ? 'success' :
                        job.status === 'draft' ? 'warning' : 'error'
                      }>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>Posted on {job.posted}</span>
                    </div>

                    {/* Application Stats */}
                    <div className="mt-4 flex items-center gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Total Applications: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{job.applicants.total}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">New: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{job.applicants.new}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Reviewed: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{job.applicants.reviewed}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors dark:bg-gray-700 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-600">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 