import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

function generateToken(userId: number): string {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  )
  return token
}

export async function registerUser(req: Request, res: Response) {
  const { email, password, confirmPassword } = req.body

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    const token = generateToken(newUser.id)

    return res.status(201).json({
    message: 'User registered successfully.',
    token,
    user: {
        id: newUser.id,
        email: newUser.email,
    },
    })
  } catch (error) {
    console.error('[registerUser]', error)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
}
