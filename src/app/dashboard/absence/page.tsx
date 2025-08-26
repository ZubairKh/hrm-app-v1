"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useData } from "@/contexts/data-context";
import { usePermissions } from "@/hooks/use-permissions";
import { Navigation } from "@/components/navigation";
import { AbsenceRequestForm } from "@/components/absence-request-form";
import { AbsenceRequestList } from "@/components/absence-request-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Users, Clock } from "lucide-react";

export default function AbsencePage() {
  const { user } = useAuth();
  const { absenceRequests } = useData();
  const { canApproveAbsence } = usePermissions();
  const [showForm, setShowForm] = useState(false);

  if (!user) return null;

  const canApprove = canApproveAbsence();
  const myRequests = absenceRequests.filter(
    (req) => req.employeeId === user.employeeId
  );
  const allRequests = absenceRequests;
  const pendingRequests = absenceRequests.filter(
    (req) => req.status === "pending"
  );

  const getRequestStats = (requests: typeof absenceRequests) => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      approved: requests.filter((r) => r.status === "approved").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    };
  };

  const myStats = getRequestStats(myRequests);
  const allStats = getRequestStats(allRequests);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              Absence Requests
            </h1>
            <p className="text-muted-foreground">
              Manage time off requests and approvals
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{showForm ? "Cancel" : "New Request"}</span>
          </Button>
        </div>

        {showForm && (
          <AbsenceRequestForm onSuccess={() => setShowForm(false)} />
        )}

        <Tabs defaultValue="my-requests" className="space-y-6">
          <TabsList
            className={`grid w-full ${
              canApprove ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            {canApprove && (
              <TabsTrigger value="manage">Manage Requests</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="my-requests" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {myStats.total}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Requests
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {myStats.pending}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {myStats.approved}
                  </div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {myStats.rejected}
                  </div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Your Absence Requests
              </h3>
              <AbsenceRequestList requests={myRequests} />
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Visual calendar showing your approved time off
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Calendar view coming soon</p>
                  <p className="text-sm">
                    This will show your approved absence requests in a calendar
                    format
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {canApprove && (
            <TabsContent value="manage" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {allStats.total}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All Requests
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {allStats.pending}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pending Review
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {allStats.approved}
                    </div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {allStats.rejected}
                    </div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                  </CardContent>
                </Card>
              </div>

              {pendingRequests.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-yellow-800 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Pending Approvals
                    </CardTitle>
                    <p className="text-sm text-yellow-700">
                      {pendingRequests.length} request
                      {pendingRequests.length !== 1 ? "s" : ""} waiting for your
                      review
                    </p>
                  </CardHeader>
                </Card>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  All Team Requests
                </h3>
                <AbsenceRequestList
                  requests={allRequests}
                  showEmployeeName={true}
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
