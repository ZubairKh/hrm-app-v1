"use client";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { Shield, User, Users } from "lucide-react";

export function RoleBadge() {
  const { user } = useAuth();

  if (!user) return null;

  const roleConfig = {
    manager: {
      label: "Manager",
      variant: "default" as const,
      icon: Shield,
      description: "Full access to all employee data and team management",
    },
    employee: {
      label: "Employee",
      variant: "secondary" as const,
      icon: User,
      description: "Access to own profile and ability to request absence",
    },
    coworker: {
      label: "Co-worker",
      variant: "outline" as const,
      icon: Users,
      description: "View public profiles and leave feedback",
    },
  };

  const config = roleConfig[user.role];
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    </div>
  );
}
