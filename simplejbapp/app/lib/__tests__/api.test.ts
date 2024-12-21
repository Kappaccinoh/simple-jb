import { fetchJobs, fetchJobDetails, fetchApplications } from '../api'

describe('API', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches jobs successfully', async () => {
    const mockJobs = [{ id: 1, title: 'Test Job' }]
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockJobs,
    })

    const result = await fetchJobs()
    expect(result).toEqual(mockJobs)
  })

  it('handles fetch error', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Failed to fetch jobs' })
    })

    await expect(fetchJobs()).rejects.toThrow('Failed to fetch jobs')
  })

  it('fetches job details successfully', async () => {
    const mockJob = { id: 1, title: 'Test Job' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockJob,
    })

    const result = await fetchJobDetails('1')
    expect(result).toEqual(mockJob)
  })

  it('fetches applications successfully', async () => {
    const mockApplications = [{ id: 1, status: 'new' }]
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApplications,
    })

    const result = await fetchApplications()
    expect(result).toEqual(mockApplications)
  })
}) 