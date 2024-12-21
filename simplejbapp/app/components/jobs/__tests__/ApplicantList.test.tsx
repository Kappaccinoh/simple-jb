import { render, screen } from '@testing-library/react'
import { ApplicantList } from '../ApplicantList'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Application } from '@/app/types'

describe('ApplicantList', () => {
  const mockApplicants = [{
    id: 1,
    job: {
      id: 1,
      title: "Test Job",
      type: "full-time",
      company_name: "Test Company"
    },
    applicant: {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      current_role: "Developer",
      current_company: "Tech Co",
      experience_years: 5,
      skills: ["React", "TypeScript"],
      portfolio_url: "https://portfolio.com",
      github_url: "https://github.com",
      linkedin_url: "https://linkedin.com",
      phone: "123-456-7890"
    },
    status: "new",
    match_score: 90,
    applied_date: "2024-01-01"
  }]

  it('renders applicant list', () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/Developer at Tech Co/)).toBeInTheDocument()
  })

  it.skip('shows empty state when no applicants', () => {
    render(<ApplicantList applicants={[]} />)
    expect(screen.getByText(/0 applicants/)).toBeInTheDocument()
  })

  it('displays match score for high matches', () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(screen.getByText(/90%/)).toBeInTheDocument()
  })

  it('displays applicant skills', () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
}) 