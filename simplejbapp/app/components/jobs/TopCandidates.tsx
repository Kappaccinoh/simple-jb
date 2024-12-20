'use client';

import { Badge } from "@/app/components/ui/Badge";
import Link from 'next/link';

interface TopCandidateProps {
  applicant: Applicant;
  aiRecommendation: string;
}

function TopCandidate({ applicant, aiRecommendation }: TopCandidateProps) {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              {applicant.name}
            </h3>
            <Badge variant="success">
              Match Score {applicant.matchScore}%
            </Badge>
            <Badge variant="info">AI Recommended</Badge>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {applicant.currentRole} at {applicant.company} • {applicant.experience} years exp.
            </p>
          </div>

          <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <p className="italic">"{aiRecommendation}"</p>
          </div>

          <div className="mt-3 flex gap-3">
            {applicant.portfolio && (
              <Link 
                href={applicant.portfolio}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                target="_blank"
              >
                View Portfolio ↗
              </Link>
            )}
            {applicant.github && (
              <Link 
                href={applicant.github}
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
  applicants: Applicant[];
}

export function TopCandidates({ applicants }: TopCandidatesProps) {
  // Get only the top candidate based on match score
  const topCandidate = [...applicants]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 1)[0]; // Get just the first one

  // More detailed AI recommendation for single candidate
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