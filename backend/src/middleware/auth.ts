import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        timezone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

export const isBandMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bandId = req.params.bandId || req.body.bandId;
    const userId = req.user.id;

    if (!bandId) {
      return res.status(400).json({ message: 'Band ID is required' });
    }

    // Check if the user is a member of the band
    const bandMember = await prisma.bandMember.findFirst({
      where: {
        bandId,
        userId,
      },
    });

    if (!bandMember) {
      return res.status(403).json({ message: 'Not authorized, you are not a member of this band' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const isBandAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bandId = req.params.bandId || req.body.bandId;
    const userId = req.user.id;

    if (!bandId) {
      return res.status(400).json({ message: 'Band ID is required' });
    }

    // Check if the user is an admin or leader of the band
    const bandMember = await prisma.bandMember.findFirst({
      where: {
        bandId,
        userId,
        role: { in: ['admin', 'leader'] },
      },
    });

    if (!bandMember) {
      return res.status(403).json({ message: 'Not authorized, you must be an admin or leader of this band' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};