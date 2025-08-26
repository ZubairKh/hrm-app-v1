"use client";

import type { AbsenceRequest } from "@/lib/mock-data";
import { usePermissions } from "@/hooks/use-permissions";
import { useData } from "@/contexts/data-context";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, Clock } from "lucide-react";

interface AbsenceRequestListProps {
  requests: AbsenceRequest[];
  showEmployeeName?: boolean;
}

export function AbsenceRequestList({
  requests,
  showEmployeeName = false,
}: AbsenceRequestListProps) {
  const { user, canApproveAbsence } = usePermissions();
  const { employees } = useData();

  const canApprove = canApproveAbsence();

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No absence requests found.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: AbsenceRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-300 bg-yellow-50"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-300 bg-green-50"
          >
            <Check className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="text-red-600 border-red-300 bg-red-50"
          >
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: AbsenceRequest["type"]) => {
    const typeConfig = {
      vacation: { label: "Vacation", className: "bg-blue-100 text-blue-800" },
      sick: { label: "Sick Leave", className: "bg-red-100 text-red-800" },
      personal: {
        label: "Personal",
        className: "bg-purple-100 text-purple-800",
      },
      other: { label: "Other", className: "bg-gray-100 text-gray-800" },
    };

    const config = typeConfig[type];
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee?.name || "Unknown Employee";
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-sm transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                {showEmployeeName && (
                  <p className="font-medium text-sm">
                    {getEmployeeName(request.employeeId)}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  {getTypeBadge(request.type)}
                  {getStatusBadge(request.status)}
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>
                  {calculateDays(request.startDate, request.endDate)} day
                  {calculateDays(request.startDate, request.endDate) !== 1
                    ? "s"
                    : ""}
                </p>
                <p className="text-xs">
                  Requested {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(request.startDate).toLocaleDateString()}</span>
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(request.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            {request.reason && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{request.reason}</p>
              </div>
            )}

            {canApprove && request.status === "pending" && (
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Check className="h-3 w-3 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
