interface NotificationResponse {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type { NotificationResponse };
