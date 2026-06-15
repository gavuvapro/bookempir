import { db } from "./db"

type SecurityEvent = 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'PASSWORD_RESET_REQUESTED' | 'PASSWORD_RESET_COMPLETED' | 'ACCOUNT_LOCKED' | 'ROLE_CHANGED' | 'ADMIN_ACTION';

interface LogOptions {
  event: SecurityEvent;
  ipAddress?: string;
  userId?: string;
  details?: Record<string, any>;
}

/**
 * Logs a security event to the database and/or console.
 * Ensures sensitive data is stripped before saving.
 */
export async function logSecurityEvent(options: LogOptions) {
  try {
    // Basic sanitization of details (e.g., ensure no passwords or secrets are included)
    const sanitizedDetails = { ...options.details };
    if (sanitizedDetails.password) sanitizedDetails.password = '[REDACTED]';
    if (sanitizedDetails.token) sanitizedDetails.token = '[REDACTED]';

    const stringifiedDetails = Object.keys(sanitizedDetails).length > 0 ? JSON.stringify(sanitizedDetails) : null;

    // We can write to DB, but if DB connection fails, we fallback to console
    if (process.env.DATABASE_URL) {
      await db.securityLog.create({
        data: {
          event: options.event,
          ipAddress: options.ipAddress || 'unknown',
          userId: options.userId,
          details: stringifiedDetails,
        }
      });
    } else {
      console.log(`[SECURITY] ${options.event} | IP: ${options.ipAddress} | User: ${options.userId} | Details: ${stringifiedDetails}`);
    }
  } catch (error) {
    // We swallow errors so logging doesn't crash the main app, but we output to console
    console.error("Failed to write security log", error);
  }
}
