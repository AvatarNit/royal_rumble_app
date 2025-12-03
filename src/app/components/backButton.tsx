"use client";

import { useRouter } from "next/navigation";

type backButtonProps = {
  href: string;
};

export default function BackButton({ href }: backButtonProps) {
  const router = useRouter();

  return (
    <button className="back-button" onClick={() => router.push(href)}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );
}
