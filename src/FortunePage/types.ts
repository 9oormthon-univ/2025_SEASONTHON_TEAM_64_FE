export interface FortuneCookie {
  id: number;
  message: string;
  category: string;
  createdAt: Date;
}

export interface FortuneMessage {
  id: number;
  content: string;
  sender: string;
  recipient?: string;
  createdAt: Date;
}

export interface FortuneCookieData {
  id: number;
  message: string;
  category: string;
}
