"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useData } from "@/contexts/data-context";
import { Navigation } from "@/components/navigation";
import { FeedbackForm } from "@/components/feedback-form";
import { FeedbackList } from "@/components/feedback-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Plus, Users } from "lucide-react";

export default function FeedbackPage() {
  const { user } = useAuth();
  const { employees, feedback } = useData();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  if (!user) return null;

  const currentEmployee = employees.find((emp) => emp.id === user.employeeId);
  const otherEmployees = employees.filter((emp) => emp.id !== user.employeeId);
  const myFeedback = feedback.filter((fb) => fb.employeeId === user.employeeId);

  const selectedEmployee = selectedEmployeeId
    ? employees.find((emp) => emp.id === selectedEmployeeId)
    : currentEmployee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Feedback System
            </h1>
            <p className="text-muted-foreground">
              View and manage employee feedback
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {feedback.length} Total Feedback
          </Badge>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Feedback Received</TabsTrigger>
            <TabsTrigger value="give">Give Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Feedback</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Feedback you've received from managers and co-workers
                </p>
              </CardHeader>
              <CardContent>
                {myFeedback.length > 0 ? (
                  <div className="text-center py-4">
                    <Badge variant="outline" className="text-sm">
                      {myFeedback.length} feedback received
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No feedback received yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <FeedbackList feedback={feedback} employeeId={user.employeeId} />
          </TabsContent>

          <TabsContent value="give" className="space-y-6">
            {user.role !== "employee" && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Give Feedback</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Select an employee to leave feedback for
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{showForm ? "Cancel" : "New Feedback"}</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Select
                          value={selectedEmployeeId}
                          onValueChange={setSelectedEmployeeId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {otherEmployees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4" />
                                  <span>{employee.name}</span>
                                  <span className="text-muted-foreground">
                                    - {employee.position}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {showForm && selectedEmployee && selectedEmployeeId && (
                  <FeedbackForm
                    employeeId={selectedEmployeeId}
                    employeeName={selectedEmployee.name}
                    onSuccess={() => {
                      setShowForm(false);
                      setSelectedEmployeeId("");
                    }}
                  />
                )}

                {selectedEmployee && selectedEmployeeId && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Feedback for {selectedEmployee.name}
                    </h3>
                    <FeedbackList
                      feedback={feedback}
                      employeeId={selectedEmployeeId}
                    />
                  </div>
                )}
              </>
            )}

            {user.role === "employee" && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Employees cannot leave feedback for others.</p>
                  <p className="text-sm">
                    Only managers and co-workers can provide feedback.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
