import { Navbar } from "@/app/components/navigation/Navbar";
import { Badge } from "@/app/components/ui/Badge";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Metadata } from 'next';
import { ApplicantList } from "@/app/components/jobs/ApplicantList";

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: number;
  currentRole: string;
  company: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  appliedDate: string;
  matchScore: number;
  skills: string[];
  portfolio?: string;
  github?: string;
  linkedin?: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applications: {
    total: number;
    new: number;
    reviewed: number;
  };
  status: 'active' | 'draft' | 'closed';
  applicants: Applicant[];
}

type Props = {
  params: { id: string }
};

const APPLICANTS_PER_PAGE = 5;

const dummyApplicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    experience: 6,
    currentRole: "Frontend Lead",
    company: "Tech Corp",
    status: "interviewed",
    appliedDate: "2024-02-15",
    matchScore: 92,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    portfolio: "https://johndoe.dev",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    experience: 8,
    currentRole: "Senior Software Engineer",
    company: "Big Tech Inc",
    status: "accepted",
    appliedDate: "2024-02-14",
    matchScore: 88,
    skills: ["React", "Node.js", "AWS", "MongoDB"],
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+1 (555) 345-6789",
    experience: 4,
    currentRole: "Frontend Developer",
    company: "Startup Co",
    status: "rejected",
    appliedDate: "2024-02-13",
    matchScore: 75,
    skills: ["React", "Vue.js", "JavaScript", "CSS"],
    portfolio: "https://mikej.dev",
    linkedin: "https://linkedin.com/in/mikej"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 456-7890",
    experience: 5,
    currentRole: "UI Engineer",
    company: "Design Studio",
    status: "new",
    appliedDate: "2024-02-15",
    matchScore: 85,
    skills: ["React", "Figma", "UI/UX", "SASS"],
    portfolio: "https://sarahw.design"
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex.chen@example.com",
    phone: "+1 (555) 567-8901",
    experience: 7,
    currentRole: "Full Stack Developer",
    company: "Global Tech",
    status: "reviewed",
    appliedDate: "2024-02-14",
    matchScore: 91,
    skills: ["React", "Python", "Django", "PostgreSQL"],
    github: "https://github.com/alexc"
  },
  {
    id: 6,
    name: "Emily Brown",
    email: "emily.b@example.com",
    phone: "+1 (555) 678-9012",
    experience: 3,
    currentRole: "Frontend Developer",
    company: "Creative Agency",
    status: "interviewed",
    appliedDate: "2024-02-13",
    matchScore: 89,
    skills: ["React", "JavaScript", "CSS", "UI Design"],
    portfolio: "https://emilyb.design",
    linkedin: "https://linkedin.com/in/emilyb"
  },
  {
    id: 7,
    name: "David Kim",
    email: "david.k@example.com",
    phone: "+1 (555) 789-0123",
    experience: 6,
    currentRole: "Senior Frontend Engineer",
    company: "Tech Startup",
    status: "rejected",
    appliedDate: "2024-02-12",
    matchScore: 82,
    skills: ["React", "Angular", "TypeScript", "Redux"],
    github: "https://github.com/davidk",
    linkedin: "https://linkedin.com/in/davidk"
  }
];

async function getJob(id: string): Promise<Job | null> {
  // Simulate API call with artificial delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const job: Job = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Your Company",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2024-02-15",
    description: "We are looking for a Senior Frontend Developer to join our team and help build the next generation of our web applications. You will be responsible for implementing visual elements and their behaviors with user interactions.",
    requirements: [
      "5+ years of experience with modern JavaScript frameworks (React, Vue, Angular)",
      "Strong understanding of web fundamentals (HTML, CSS, JavaScript)",
      "Experience with responsive design and cross-browser compatibility",
      "Familiarity with RESTful APIs and modern frontend build tools",
      "Strong problem-solving abilities and attention to detail"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working hours and remote work options",
      "Professional development budget",
      "Regular team events and gatherings"
    ],
    applications: {
      total: 24,
      new: 12,
      reviewed: 8
    },
    status: 'active',
    applicants: dummyApplicants
  };

  return job.id === parseInt(id) ? job : null;
}

// This helps Next.js understand the dynamic route parameters
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.id);
  
  if (!job) {
    return {
      title: 'Job Not Found'
    };
  }

  return {
    title: `${job.title} - Job Details`,
    description: job.description
  };
}

export default async function JobPage({ params }: Props) {
  const job = await getJob(params.id);
  
  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                <div className="mt-1 flex items-center gap-3">
                  <Badge variant="default">{job.type}</Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.location}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.salary}
                  </span>
                </div>
              </div>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                Edit Job
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Applications</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">24</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">8</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">3</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">New Today</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Performance</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">1.2k</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">15</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Days Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">8</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Similar Jobs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Left Column - Job Details */}
          <div className="w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 space-y-4">
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
                <ApplicantList applicants={job.applicants} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 