import { Job, Application, UserProfile } from '@/app/types/index';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
  };
}

export async function fetchDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/stats/`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
}

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs/`);
  if (!response.ok) {
    const error = await response.json() as ApiResponse<never>;
    throw new Error(error.error?.message || 'Failed to fetch jobs');
  }
  return response.json() as Promise<Job[]>;
}

export async function fetchJobDetails(id: string): Promise<Job> {
  console.log('Making API request to:', `${API_BASE_URL}/jobs/${id}/`);
  const response = await fetch(`${API_BASE_URL}/jobs/${id}/`);
  if (!response.ok) {
    const error = await response.json() as ApiResponse<never>;
    console.error('API error:', error);
    throw new Error(error.error?.message || 'Failed to fetch job details');
  }
  const data = await response.json();
  console.log('API response:', data);
  return data;
}

export async function fetchApplications(jobId?: string): Promise<Application[]> {
  const url = jobId 
    ? `${API_BASE_URL}/jobs/${jobId}/applications/` 
    : `${API_BASE_URL}/applications/`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json() as ApiResponse<never>;
    throw new Error(error.error?.message || 'Failed to fetch applications');
  }
  return response.json() as Promise<Application[]>;
}

interface JobCreateData {
  title: string;
  company: number;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
}

export async function createJob(data: JobCreateData) {
    const response = await fetch(`${API_BASE_URL}/jobs/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to create job');
    }

    return response.json();
} 

export async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/profiles/${userId}/`);
  if (!response.ok) {
    const error = await response.json() as ApiResponse<never>;
    throw new Error(error.error?.message || 'Failed to fetch user profile');
  }
  return response.json() as Promise<UserProfile>;
} 