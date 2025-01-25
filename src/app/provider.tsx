"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type providerProps = {
  children: React.ReactNode;
};

export default function Provider({ children }: providerProps) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
