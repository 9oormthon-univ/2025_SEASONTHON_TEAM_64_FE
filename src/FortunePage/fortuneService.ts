import { FortuneCookie, FortuneMessage } from './types';

// 더미 데이터 저장소 (실제로는 백엔드 API를 사용)
let fortuneMessages: FortuneMessage[] = [];
let nextId = 1;

export const fortuneService = {
  // 포춘쿠키 메시지 전송 (Create)
  sendFortuneMessage: async (content: string, sender: string, recipient?: string): Promise<FortuneMessage> => {
    const newMessage: FortuneMessage = {
      id: nextId++,
      content,
      sender,
      recipient,
      createdAt: new Date()
    };
    
    // 실제로는 백엔드 API 호출
    // const response = await fetch('/api/fortune-messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newMessage)
    // });
    // return response.json();
    
    fortuneMessages.push(newMessage);
    return newMessage;
  },

  // 포춘쿠키 메시지 목록 조회 (Read)
  getFortuneMessages: async (): Promise<FortuneMessage[]> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch('/api/fortune-messages');
    // return response.json();
    
    return fortuneMessages;
  },

  // 특정 포춘쿠키 메시지 조회 (Read)
  getFortuneMessage: async (id: number): Promise<FortuneMessage | null> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch(`/api/fortune-messages/${id}`);
    // return response.json();
    
    return fortuneMessages.find(msg => msg.id === id) || null;
  },

  // 포춘쿠키 메시지 수정 (Update)
  updateFortuneMessage: async (id: number, content: string): Promise<FortuneMessage | null> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch(`/api/fortune-messages/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content })
    // });
    // return response.json();
    
    const messageIndex = fortuneMessages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) return null;
    
    fortuneMessages[messageIndex] = {
      ...fortuneMessages[messageIndex],
      content,
      createdAt: new Date()
    };
    
    return fortuneMessages[messageIndex];
  },

  // 포춘쿠키 메시지 삭제 (Delete)
  deleteFortuneMessage: async (id: number): Promise<boolean> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch(`/api/fortune-messages/${id}`, {
    //   method: 'DELETE'
    // });
    // return response.ok;
    
    const initialLength = fortuneMessages.length;
    fortuneMessages = fortuneMessages.filter(msg => msg.id !== id);
    return fortuneMessages.length < initialLength;
  },

  // 사용자별 포춘쿠키 메시지 조회
  getFortuneMessagesByUser: async (sender: string): Promise<FortuneMessage[]> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch(`/api/fortune-messages?sender=${sender}`);
    // return response.json();
    
    return fortuneMessages.filter(msg => msg.sender === sender);
  },

  // 받은 포춘쿠키 메시지 조회
  getReceivedFortuneMessages: async (recipient: string): Promise<FortuneMessage[]> => {
    // 실제로는 백엔드 API 호출
    // const response = await fetch(`/api/fortune-messages?recipient=${recipient}`);
    // return response.json();
    
    return fortuneMessages.filter(msg => msg.recipient === recipient);
  }
};
