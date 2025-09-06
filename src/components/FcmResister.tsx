import React from "react";
import { useFcmRegister } from "../hooks/useFcmAfterLogin";

function getMemberId(): number | null {
  const raw = sessionStorage.getItem("memberId") || localStorage.getItem("memberId");
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

const FcmRegistrar: React.FC = () => {
  const memberId = getMemberId();
  const { status, token, error } = useFcmRegister(memberId);

  // 화면에 보일 필요 없으면 hidden으로 둡니다.
  return (
    <div
      style={{ display: "none" }}
      data-fcm-status={status}
      data-fcm-token={token ?? ""}
      data-fcm-error={error ?? ""}
    />
  );
};

export default FcmRegistrar;
