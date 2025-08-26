"use client";

import { useAuth } from "@/contexts/auth-context";
import { useData } from "@/contexts/data-context";
import { Navigation } from "@/components/navigation";
import { EmployeeProfileCard } from "@/components/employee-profile-card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useAuth();
  const { employees } = useData();
  const router = useRouter();

  const employee = employees.find((emp) => emp.id === params.id);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto p-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>Employee not found.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const canView =
    user?.role === "manager" ||
    user?.employeeId === employee.id ||
    user?.role === "coworker";

  if (!canView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto p-6">
          <Alert>
            <AlertDescription>
              Access denied. You don't have permission to view this profile.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {employee.name}
            </h1>
            <p className="text-muted-foreground">Employee Profile</p>
          </div>
        </div>

        {user?.role === "coworker" && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              As a co-worker, you can view public information and leave feedback
              for this employee.
            </AlertDescription>
          </Alert>
        )}

        <EmployeeProfileCard employee={employee} />
      </div>
    </div>
  );
}
