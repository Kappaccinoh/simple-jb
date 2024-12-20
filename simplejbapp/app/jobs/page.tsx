import { Navbar } from "@/app/components/navigation/Navbar";
import Link from "next/link";

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago"
    },
    // Add more sample jobs...
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Active Job Listings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track your current job postings
            </p>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h2>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                >
                  View Details
                </Link>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Posted {job.posted}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 