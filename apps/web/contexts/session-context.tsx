"use client";

import { createContext, useContext } from "react";

import type { Session } from "@/lib/auth-client";

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({
  initialSession,
  children,
}: {
  initialSession: Session;
  children: React.ReactNode;
}) => {
  return <SessionContext.Provider value={initialSession}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return ctx;
};
