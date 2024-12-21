import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ApplicantList } from '../ApplicantList'
import { Application } from '@/app/types/index'

describe('ApplicantList', () => {
  const mockApplicants: Application[] = [{
    id: 1,
    job: {
      id: 1,
      title: "Test Job",
      type: "full-time",
      company_name: "Test Company"
    },
    applicant: 1,
    status: "new",
    match_score: 90,
    applied_date: "2024-01-01"
  }]

  // Mock the API call for profiles
  jest.mock('@/app/lib/api', () => ({
    fetchUserProfile: jest.fn().mockResolvedValue({
      id: 1,
      user: 1,
      full_name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      current_role: "Developer",
      current_company: "Tech Co",
      experience_years: 5,
      skills: ["React", "TypeScript"],
      portfolio_url: "https://portfolio.com",
      github_url: "https://github.com",
      linkedin_url: "https://linkedin.com"
    })
  }))

  it('renders applicant list', async () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(await screen.findByText(/John Doe/)).toBeInTheDocument()
    expect(await screen.findByText(/Developer at Tech Co/)).toBeInTheDocument()
  })

  it('shows empty state when no applicants', async () => {
    render(<ApplicantList applicants={[]} />)
    expect(await screen.findByText(/No applicants found/)).toBeInTheDocument()
  })

  it('displays match score for high matches', async () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(await screen.findByText(/90%/)).toBeInTheDocument()
  })

  it('displays applicant skills', async () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(await screen.findByText('React')).toBeInTheDocument()
    expect(await screen.findByText('TypeScript')).toBeInTheDocument()
  })

  it('displays application status', async () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(await screen.findByText('New')).toBeInTheDocument()
  })

  it('displays contact information', async () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(await screen.findByText('john@example.com')).toBeInTheDocument()
    expect(await screen.findByText('123-456-7890')).toBeInTheDocument()
  })
})