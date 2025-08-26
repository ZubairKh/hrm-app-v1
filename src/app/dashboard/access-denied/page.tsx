"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePermissions } from "@/hooks/use-permissions";
import { RoleBadge } from "@/components/role-badge";
import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccessDeniedPage() {
  const { user } = usePermissions();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card className="border-red-200">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-900">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-gray-600">
              You don't have permission to access the requested resource. Your
              current role limits access to certain features.
            </p>

            <div className="flex justify-center">
              <RoleBadge />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 mb-2">
                Your Current Permissions:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {user?.role === "manager" && (
                  <>
                    <li>• View and edit all employee profiles</li>
                    <li>• Access team overview and management</li>
                    <li>• View and approve absence requests</li>
                    <li>• Leave feedback for employees</li>
                  </>
                )}
                {user?.role === "employee" && (
                  <>
                    <li>• View and edit your own profile</li>
                    <li>• View public information of co-workers</li>
                    <li>• Request time off and absence</li>
                    <li>• View feedback received</li>
                  </>
                )}
                {user?.role === "coworker" && (
                  <>
                    <li>• View public employee profiles</li>
                    <li>• Leave feedback for other employees</li>
                    <li>• Request time off and absence</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => router.push("/dashboard")}>
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
