/**
 * Input types for the Loops email component.
 */

export interface SendEmailInput {
  /** Recipient email address */
  email: string;
  /** The transactional email ID from your Loops dashboard */
  transactionalId: string;
  /** Data variables to inject into the email template */
  dataVariables?: Record<string, string>;
  /** Whether to add the recipient to your Loops audience */
  addToAudience?: boolean;
}

export interface SendEmailResult {
  success: boolean;
  /** Loops API response message */
  message?: string;
}

export interface LoopsApiErrorResponse {
  success: false;
  message: string;
}
