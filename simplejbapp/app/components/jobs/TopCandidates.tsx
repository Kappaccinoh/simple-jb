'use client';

import { Badge } from "@/app/components/ui/Badge";
import Link from 'next/link';
import { Application } from '@/app/types';

interface TopCandidateProps {
  applicant: Application;
  aiRecommendation: string;
}

function TopCandidate({ applicant, aiRecommendation }: TopCandidateProps) {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              {applicant.applicant.first_name} {applicant.applicant.last_name}
            </h3>
            <Badge variant="success">
              Match Score {applicant.match_score}%
            </Badge>
            <Badge variant="info">AI Recommended</Badge>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {applicant.applicant.current_role} at {applicant.applicant.current_company} • {applicant.applicant.experience_years} years exp.
            </p>
          </div>

          <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <p className="italic">&quot;{aiRecommendation}&quot;</p>
          </div>

          <div className="mt-3 flex gap-3">
            {applicant.applicant.portfolio_url && (
              <Link 
                href={applicant.applicant.portfolio_url}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                target="_blank"
              >
                View Portfolio ↗
              </Link>
            )}
            {applicant.applicant.github_url && (
              <Link 
                href={applicant.applicant.github_url}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                target="_blank"
              >
                GitHub Profile ↗
              </Link>
            )}
          </div>
        </div>

        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
          Review Application
        </button>
      </div>
    </div>
  );
}

interface TopCandidatesProps {
  applicants: Application[];
}

export function TopCandidates({ applicants }: TopCandidatesProps) {
  const topCandidate = [...applicants]
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 1)[0];

  const aiRecommendation = 
    "Outstanding match for this role. Strong technical background with proven experience in modern frontend frameworks. Portfolio demonstrates excellent UI/UX sensibilities and clean code practices. GitHub activity shows consistent contributions to similar technologies. Previous work experience at Tech Corp aligns perfectly with our tech stack and team size. Highly recommended for immediate interview.";

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Best Candidate Match
        </h3>
        <Badge variant="success">AI Recommended</Badge>
      </div>
      
      {topCandidate && (
        <TopCandidate 
          applicant={topCandidate}
          aiRecommendation={aiRecommendation}
        />
      )}
    </div>
  );
} 