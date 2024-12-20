const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/stats/`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
}

export async function fetchJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs/`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
}

export async function fetchJobDetails(id: string) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch job details');
    return response.json();
}

export async function fetchApplications(jobId?: string) {
    const url = jobId 
        ? `${API_BASE_URL}/jobs/${jobId}/applications/` 
        : `${API_BASE_URL}/applications/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
}

export async function createJob(data: any) {
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