import { render, screen } from '@testing-library/react'
import { ApplicantList } from '../ApplicantList'

describe('ApplicantList', () => {
  const mockApplicants = [
    {
      id: 1,
      job: {
        id: 1,
        title: "Test Job",
        type: "full-time"
      },
      applicant: {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        current_role: "Developer",
        current_company: "Tech Co"
      },
      status: "new",
      match_score: 90,
      applied_date: "2024-01-01"
    }
  ]

  it('renders applicant list', () => {
    render(<ApplicantList applicants={mockApplicants} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('shows no applicants message when empty', () => {
    render(<ApplicantList applicants={[]} />)
    expect(screen.getByText('No applications yet')).toBeInTheDocument()
  })
}) 