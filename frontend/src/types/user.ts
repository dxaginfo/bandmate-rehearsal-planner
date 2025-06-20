export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  timezone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAvailability {
  id: string;
  userId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  recurrenceType: 'weekly' | 'bi-weekly' | 'monthly';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpecialAvailability {
  id: string;
  userId: string;
  date: Date;
  isAvailable: boolean;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}