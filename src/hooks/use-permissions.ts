"use client"

import { useAuth } from "@/contexts/auth-context"
import { permissions, getPermissionMessage } from "@/lib/permissions"

export function usePermissions() {
    const { user } = useAuth()

    const checkPermission = (permissionKey: keyof typeof permissions, targetEmployeeId?: string, ...args: any[]) => {
        if (!user) return false

        const permissionFn = permissions[permissionKey]
        if (typeof permissionFn === "function") {
            if (targetEmployeeId) {
                return permissionFn(targetEmployeeId, user.role, user.employeeId, ...args as any[])
            } else {
                return permissionFn(user.role, ...args as any[])
            }
        }
        return false
    }

    const getPermissionMsg = (action: string) => {
        if (!user) return "Please log in to continue."
        return getPermissionMessage(action, user.role)
    }

    return {
        user,
        checkPermission,
        getPermissionMsg,
        // Convenience methods for common checks
        canViewProfile: (targetEmployeeId: string) => checkPermission("canViewProfile", targetEmployeeId),
        canEditProfile: (targetEmployeeId: string) => checkPermission("canEditProfile", targetEmployeeId),
        canViewSensitiveData: (targetEmployeeId: string) => checkPermission("canViewSensitiveData", targetEmployeeId),
        canViewTeam: () => checkPermission("canViewTeam"),
        canLeaveFeedback: (targetEmployeeId: string) => checkPermission("canLeaveFeedback", targetEmployeeId),
        canViewFeedback: (targetEmployeeId: string) => checkPermission("canViewFeedback", targetEmployeeId),
        canRequestAbsence: () => checkPermission("canRequestAbsence"),
        canViewAbsenceRequests: (targetEmployeeId: string) => checkPermission("canViewAbsenceRequests", targetEmployeeId),
        canApproveAbsence: () => checkPermission("canApproveAbsence"),
    }
}
