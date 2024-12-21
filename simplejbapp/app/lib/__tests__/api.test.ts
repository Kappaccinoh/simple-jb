import { fetchJobs, fetchJobDetails } from '../api'

describe('API', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
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
    })

    await expect(fetchJobs()).rejects.toThrow('Failed to fetch jobs')
  })
}) 