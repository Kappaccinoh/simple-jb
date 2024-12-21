export interface Application {
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

export interface Job {
  id: number;
  title: string;
  company: {
    id: number;
    name: string;
  };
  company_name?: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  posted_date: string;
  views: number;
  applications: Application[];
  created_at: string;
  updated_at: string;
  applicants?: {
    total: number;
    new: number;
    reviewed: number;
  };
}

export function transformJobApplication(application: Omit<Application, 'job'> & { 
  job: Omit<Application['job'], 'company_name'> & { 
    company_name?: string 
  } 
}): Application {
  return {
    ...application,
    job: {
      ...application.job,
      company_name: application.job.company_name || 'Unknown Company'
    }
  };
}