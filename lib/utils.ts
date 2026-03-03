import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateUniqueIdArray = (length: number) =>
  Array.from({ length }, () => ({
    id: crypto.randomUUID(),
  }));
