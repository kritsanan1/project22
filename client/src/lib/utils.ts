
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

export function formatNumber(number: number, locale?: string): string {
  return new Intl.NumberFormat(locale).format(number);
}

export function formatCurrency(
  amount: number, 
  currency: string = 'USD', 
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatRelativeTime(
  date: Date, 
  locale?: string
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (Math.abs(diffInDays) > 0) {
    return rtf.format(diffInDays, 'day');
  } else if (Math.abs(diffInHours) > 0) {
    return rtf.format(diffInHours, 'hour');
  } else if (Math.abs(diffInMinutes) > 0) {
    return rtf.format(diffInMinutes, 'minute');
  } else {
    return rtf.format(diffInSeconds, 'second');
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
