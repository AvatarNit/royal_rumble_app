"use client";

import { SessionProvider } from "next-auth/react";
import LoginButtonSession from "./loginButtonSession";

export default function LoginButton() {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <LoginButtonSession />
    </SessionProvider>
  );
}
