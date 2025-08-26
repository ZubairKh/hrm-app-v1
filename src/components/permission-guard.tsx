"use client";

import type React from "react";
import { usePermissions } from "@/hooks/use-permissions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ShieldX, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: string;
  targetEmployeeId?: string;
  fallback?: React.ReactNode;
  showBackButton?: boolean;
}

export function PermissionGuard({
  children,
  permission,
  targetEmployeeId,
  fallback,
  showBackButton = true,
}: PermissionGuardProps) {
  const { checkPermission, getPermissionMsg, user } = usePermissions();
  const router = useRouter();

  if (!user) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <ShieldX className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Please log in to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  const hasPermission = checkPermission(permission as any, targetEmployeeId);

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="space-y-4">
        <Alert className="border-red-200 bg-red-50">
          <ShieldX className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Access denied. {getPermissionMsg(permission)}
          </AlertDescription>
        </Alert>
        {showBackButton && (
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
