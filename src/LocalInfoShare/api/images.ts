// src/LocalInfoShare/api/images.ts  (그대로 사용)
import { api } from "./Client";

export async function uploadImage(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const form = new FormData();
  form.append("file", file); // ← Swagger가 요구하는 키 이름

  const { data } = await api.post<string>("/api/v1/images/upload", form, {
    headers: { /* Content-Type 수동 설정하지 마세요 */ },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) onProgress(Math.round((evt.loaded * 100) / evt.total));
    },
  });

  return data; // 서버가 돌려주는 최종 이미지 URL
}
