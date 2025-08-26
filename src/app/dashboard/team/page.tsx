"use client";

import { useData } from "@/contexts/data-context";
import { Navigation } from "@/components/navigation";
import { PermissionGuard } from "@/components/permission-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamPage() {
  const { employees } = useData();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <PermissionGuard permission="canViewTeam">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Team Overview
              </h1>
              <p className="text-muted-foreground">
                Manage your team members and their profiles
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {employees.length} Employees
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card
                key={employee.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">
                        {employee.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground truncate">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {employee.department}
                  </Badge>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PermissionGuard>
      </div>
    </div>
  );
}
