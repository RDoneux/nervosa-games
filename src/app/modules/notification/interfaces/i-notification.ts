export interface INotification {
  title: string;
  type: NotificationType;
  timer?: number;
  id?: string;
}

export const NotificationType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
