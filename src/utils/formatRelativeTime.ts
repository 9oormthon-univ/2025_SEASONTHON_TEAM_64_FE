export function formatRelativeTime(input: string | Date): string {
  const now = new Date();
  const date = typeof input === 'string' ? new Date(input) : input;
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs)) return '';

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec || 1}초 전`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;

  const day = Math.floor(hour / 24);
  if (day < 7) return `${day}일 전`;

  const week = Math.floor(day / 7);
  if (day < 30) return `${week}주 전`;

  const month = Math.floor(day / 30);
  if (month < 12) return `${month}달 전`;

  const year = Math.floor(month / 12);
  return `${year}년 전`;
}
