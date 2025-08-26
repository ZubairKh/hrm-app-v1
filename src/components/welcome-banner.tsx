"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Sparkles } from "lucide-react";

export function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getRoleDescription = () => {
    switch (user.role) {
      case "manager":
        return "You have full access to team management and employee data.";
      case "employee":
        return "You can manage your profile and request time off.";
      case "coworker":
        return "You can view profiles and leave feedback for colleagues.";
      default:
        return "";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {getWelcomeMessage()}, {user.name}!
              </h2>
            </div>
            <p className="text-sm text-gray-600">{getRoleDescription()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
