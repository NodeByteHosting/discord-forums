import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const secret = req.headers.authorization?.split(' ')[1]
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate('/')
    res.json({ revalidated: true })
  } catch (err: unknown) {

    if (err instanceof Error) {
      res.status(500).json({
        status: "INTERNAL_ERROR",
        message: `Revalidation failed: ${err.message}`,
        code: 500
      })
    }

    res.status(500).json({ error: 'Error revalidating' })
  }
}