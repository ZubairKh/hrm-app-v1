"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import {
  type Employee,
  type Feedback,
  type AbsenceRequest,
  mockEmployees,
  mockFeedback,
  mockAbsenceRequests,
} from "@/lib/mock-data";

interface DataContextType {
  employees: Employee[];
  feedback: Feedback[];
  absenceRequests: AbsenceRequest[];
  addFeedback: (feedback: Omit<Feedback, "id" | "createdAt">) => void;
  addAbsenceRequest: (
    request: Omit<AbsenceRequest, "id" | "createdAt" | "status">
  ) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  polishFeedback: (feedbackId: string, polishedContent: string) => void;
  updateAbsenceRequest: (id: string, updates: Partial<AbsenceRequest>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [absenceRequests, setAbsenceRequests] =
    useState<AbsenceRequest[]>(mockAbsenceRequests);

  const addFeedback = (newFeedback: Omit<Feedback, "id" | "createdAt">) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setFeedback((prev) => [feedback, ...prev]);
  };

  const addAbsenceRequest = (
    newRequest: Omit<AbsenceRequest, "id" | "createdAt" | "status">
  ) => {
    const request: AbsenceRequest = {
      ...newRequest,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setAbsenceRequests((prev) => [request, ...prev]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp))
    );
  };

  const polishFeedback = (feedbackId: string, polishedContent: string) => {
    setFeedback((prev) =>
      prev.map((fb) =>
        fb.id === feedbackId
          ? {
              ...fb,
              originalContent: fb.originalContent || fb.content,
              content: polishedContent,
              isPolished: true,
            }
          : fb
      )
    );
  };

  const updateAbsenceRequest = (
    id: string,
    updates: Partial<AbsenceRequest>
  ) => {
    setAbsenceRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
  };

  return (
    <DataContext.Provider
      value={{
        employees,
        feedback,
        absenceRequests,
        addFeedback,
        addAbsenceRequest,
        updateEmployee,
        polishFeedback,
        updateAbsenceRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
