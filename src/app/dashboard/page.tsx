"use client";

import { useAuth } from "@/contexts/auth-context";
import { useData } from "@/contexts/data-context";
import { Navigation } from "@/components/navigation";
import { WelcomeBanner } from "@/components/welcome-banner";
import { EmployeeProfileCard } from "@/components/employee-profile-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  InfoIcon,
  TrendingUp,
  Calendar,
  MessageSquare,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { employees, feedback, absenceRequests } = useData();

  if (!user) return null;

  const currentEmployee = employees.find((emp) => emp.id === user.employeeId);

  if (!currentEmployee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto p-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>Employee profile not found.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const myFeedback = feedback.filter((fb) => fb.employeeId === user.employeeId);
  const myAbsenceRequests = absenceRequests.filter(
    (req) => req.employeeId === user.employeeId
  );
  const pendingRequests = myAbsenceRequests.filter(
    (req) => req.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <WelcomeBanner />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {myFeedback.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Feedback Received
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {myAbsenceRequests.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time Off Requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingRequests.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pending Requests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {user.role === "coworker" && (
          <Alert className="border-blue-200 bg-blue-50">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              As a co-worker, you can view public information and leave feedback
              for employees. Sensitive data like salary and personal details are
              protected.
            </AlertDescription>
          </Alert>
        )}

        <EmployeeProfileCard employee={currentEmployee} />

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myFeedback.length > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-1 rounded">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        New feedback received
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From {myFeedback[0]?.authorName || "colleague"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Recent
                  </Badge>
                </div>
              )}

              {myAbsenceRequests.length > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-1 rounded">
                      <Calendar className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Absence request submitted
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {myAbsenceRequests[0]?.type || "Time off"} request
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      myAbsenceRequests[0]?.status === "approved"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {myAbsenceRequests[0]?.status || "Pending"}
                  </Badge>
                </div>
              )}

              {user.role === "manager" && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-1 rounded">
                      <Users className="h-3 w-3 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Team management access
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Full access to {employees.length} employees
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Manager
                  </Badge>
                </div>
              )}

              {myFeedback.length === 0 && myAbsenceRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                  <p className="text-xs">
                    Your activity will appear here as you use the system
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
