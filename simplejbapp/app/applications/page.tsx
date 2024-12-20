import { Navbar } from "@/app/components/navigation/Navbar";

interface Application {
  id: number;
  name: string;
  position: string;
  applied: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  email: string;
}

export default function ApplicationsPage() {
  const applications: Application[] = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Frontend Developer",
      applied: "2024-02-15",
      status: "new",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Backend Engineer",
      applied: "2024-02-14",
      status: "reviewed",
      email: "jane.smith@example.com"
    },
    // Add more sample applications...
  ];

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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {application.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
                          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {application.position}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {application.email}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Applied on {application.applied}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        View Details
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 