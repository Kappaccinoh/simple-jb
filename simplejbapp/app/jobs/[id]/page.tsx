'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchJobDetails } from '@/app/lib/api';
import { Navbar } from "@/app/components/navigation/Navbar";

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
  };
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted_date: string;
  status: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await fetchJobDetails(params.id as string);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          
          <div className="mb-6">
            <p className="text-gray-600">{job.company.name} • {job.location}</p>
            <p className="text-gray-600">{job.type} • {job.salary}</p>
            <p className="text-gray-600">Posted: {new Date(job.posted_date).toLocaleDateString()}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 