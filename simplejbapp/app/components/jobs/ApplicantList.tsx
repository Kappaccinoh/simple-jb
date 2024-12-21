'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from "@/app/components/ui/Badge";
import { TopCandidates } from './TopCandidates';

interface Applicant {
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
    current_role: string;
    current_company: string;
    experience_years: number;
    skills: string[];
    portfolio_url?: string;
    github_url?: string;
    linkedin_url?: string;
    phone: string;
  };
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  match_score: number;
  applied_date: string;
}

export function ApplicantList({ applicants }: { applicants: Applicant[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter and sort applicants
  const filteredApplicants = applicants
    .filter(applicant => {
      const matchesSearch = searchTerm === '' || 
        applicant.applicant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.applicant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === '' || applicant.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'matchScore') return b.match_score - a.match_score;
      if (sortBy === 'experience') return b.applicant.experience_years - a.applicant.experience_years;
      if (sortBy === 'appliedDate') return new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime();
      return 0;
    });

  // Calculate pagination
  const totalApplicants = filteredApplicants.length;
  const totalPages = Math.ceil(totalApplicants / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <TopCandidates applicants={applicants} />

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        All Applicants
      </h2>

      <div className="flex flex-col gap-4">
        {/* Controls Row */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Sort by</option>
            <option value="matchScore">Match Score</option>
            <option value="experience">Experience</option>
            <option value="appliedDate">Application Date</option>
          </select>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>

        {/* Pagination Info and Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(endIndex, totalApplicants)}</span> of{" "}
            <span className="font-medium">{totalApplicants}</span> applicants
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Applicant Cards */}
      <div className="space-y-4">
        {currentApplicants.map((application) => (
          <div 
            key={application.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {application.applicant.first_name} {application.applicant.last_name}
                  </h3>
                  {application.match_score >= 90 && (
                    <Badge variant="success">
                      Top Match {application.match_score}%
                    </Badge>
                  )}
                  <Badge variant={
                    application.status === 'new' ? 'info' :
                    application.status === 'reviewed' ? 'warning' :
                    application.status === 'interviewed' ? 'default' :
                    application.status === 'accepted' ? 'success' : 'error'
                  }>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {application.applicant.current_role} at {application.applicant.current_company} • {application.applicant.experience_years} years exp.
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {application.applicant.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm">
                  <Link 
                    href={`mailto:${application.applicant.email}`}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {application.applicant.email}
                  </Link>
                  <span className="text-gray-600 dark:text-gray-400">
                    {application.applicant.phone}
                  </span>
                </div>

                <div className="mt-2 flex gap-3">
                  {application.applicant.portfolio_url && (
                    <Link 
                      href={application.applicant.portfolio_url}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      target="_blank"
                    >
                      Portfolio ↗
                    </Link>
                  )}
                  {application.applicant.github_url && (
                    <Link 
                      href={application.applicant.github_url}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      target="_blank"
                    >
                      GitHub ↗
                    </Link>
                  )}
                  {application.applicant.linkedin_url && (
                    <Link 
                      href={application.applicant.linkedin_url}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      target="_blank"
                    >
                      LinkedIn ↗
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                  View Details
                </button>
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 