interface MemberDetailResponse {
  memberId: number;
  nickname: string;
  email: string;
  profileImageUrl?: string;
  role: string;
  mode: string;
}

interface MemberDeviceTokenResponse {
  deviceToken: string;
}

export { MemberDetailResponse, MemberDeviceTokenResponse };
