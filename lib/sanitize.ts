import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML strings to prevent XSS attacks.
 * Only allows safe HTML tags and attributes.
 * 
 * @param dirty - The untrusted HTML string
 * @returns The sanitized safe HTML string
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    // Prevent links from opening in a way that allows them to access the window.opener object
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['style', 'onerror', 'onload', 'onmouseover'],
  });
}

/**
 * Strips all HTML tags, returning only plain text.
 * Useful for inputs that should never contain any formatting.
 */
export function stripHtml(dirty: string): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}
