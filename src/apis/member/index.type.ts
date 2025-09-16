interface MemberDetailResponse {
  memberId: number;
  nickname: string;
  email: string;
  profileImageUrl?: string;
  role: string;
  mode: string;
}

interface MemberDeviceTokenRequest {
  deviceToken: string;
}

export { MemberDetailResponse, MemberDeviceTokenRequest };
