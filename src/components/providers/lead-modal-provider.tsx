"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LeadPrefill = {
  service?: string;
  packageName?: string;
  addOns?: string[];
  message?: string;
  source?: string;
};

type LeadModalContextValue = {
  open: boolean;
  prefill: LeadPrefill;
  openModal: (prefill?: LeadPrefill) => void;
  closeModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<LeadPrefill>({});

  const openModal = useCallback((next?: LeadPrefill) => {
    setPrefill(next ?? {});
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, prefill, openModal, closeModal }),
    [open, prefill, openModal, closeModal]
  );

  return (
    <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}
