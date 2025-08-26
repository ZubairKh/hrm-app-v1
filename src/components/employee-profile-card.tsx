"use client";

import { useState } from "react";
import type { Employee } from "@/lib/mock-data";
import { usePermissions } from "@/hooks/use-permissions";
import { useData } from "@/contexts/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EmployeeProfileCardProps {
  employee: Employee;
}

export function EmployeeProfileCard({ employee }: EmployeeProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const { canEditProfile, canViewSensitiveData } = usePermissions();
  const { updateEmployee } = useData();

  const canEdit = canEditProfile(employee.id);
  const canViewSensitive = canViewSensitiveData(employee.id);

  const handleSave = () => {
    updateEmployee(employee.id, editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{employee.name}</CardTitle>
              <p className="text-muted-foreground">{employee.position}</p>
              <Badge variant="secondary" className="mt-1">
                {employee.department}
              </Badge>
            </div>
          </div>

          {canEdit && (
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              {isEditing ? (
                <Input
                  value={editedEmployee.email}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      email: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-sm">{employee.email}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Phone</Label>
              {isEditing ? (
                <Input
                  value={editedEmployee.phone}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      phone: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-sm">{employee.phone}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Work Information */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Work Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Position</Label>
              {isEditing ? (
                <Input
                  value={editedEmployee.position}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      position: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-sm">{employee.position}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Department
              </Label>
              {isEditing ? (
                <Input
                  value={editedEmployee.department}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      department: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-sm">{employee.department}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Manager</Label>
              {isEditing ? (
                <Input
                  value={editedEmployee.manager}
                  onChange={(e) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      manager: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-sm">{employee.manager}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Start Date
              </Label>
              <p className="text-sm flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(employee.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {canViewSensitive && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Sensitive Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Salary
                  </Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedEmployee.salary}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          salary: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm">
                      ${employee.salary.toLocaleString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.address}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          address: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm flex items-start">
                      <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      {employee.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Emergency Contact */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.emergencyContact.name}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          emergencyContact: {
                            ...editedEmployee.emergencyContact,
                            name: e.target.value,
                          },
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm">{employee.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.emergencyContact.phone}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          emergencyContact: {
                            ...editedEmployee.emergencyContact,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm">{employee.emergencyContact.phone}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Relationship
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.emergencyContact.relationship}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          emergencyContact: {
                            ...editedEmployee.emergencyContact,
                            relationship: e.target.value,
                          },
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm">
                      {employee.emergencyContact.relationship}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
