import { NextApiRequest, NextApiResponse } from 'next'

export async function revalidate(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_TOKEN_FOR_SSG) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate(`/`)

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
