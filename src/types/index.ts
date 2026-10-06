/**
 * Common TypeScript interfaces and type definitions for Tuqo Tools.
 * Additional types for database models and API payloads can be organized here.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url?: string;
}
