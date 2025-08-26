import type { UserRole } from "./mock-data"

export interface Permission {
    canViewProfile: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canEditProfile: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canViewSensitiveData: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canViewTeam: (userRole: UserRole) => boolean
    canLeaveFeedback: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canViewFeedback: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canRequestAbsence: (userRole: UserRole) => boolean
    canViewAbsenceRequests: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => boolean
    canApproveAbsence: (userRole: UserRole) => boolean
}

export const permissions: Permission = {
    // Profile viewing permissions
    canViewProfile: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Managers can view all profiles
        if (userRole === "manager") return true
        // Employees can view their own profile
        if (userRole === "employee" && userEmployeeId === targetEmployeeId) return true
        // Co-workers can view profiles (but with limited data)
        if (userRole === "coworker") return true
        return false
    },

    // Profile editing permissions
    canEditProfile: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Managers can edit all profiles
        if (userRole === "manager") return true
        // Employees can edit their own profile
        if (userRole === "employee" && userEmployeeId === targetEmployeeId) return true
        return false
    },

    // Sensitive data viewing permissions (salary, address, emergency contact)
    canViewSensitiveData: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Managers can view all sensitive data
        if (userRole === "manager") return true
        // Employees can view their own sensitive data
        if (userRole === "employee" && userEmployeeId === targetEmployeeId) return true
        return false
    },

    // Team overview permissions
    canViewTeam: (userRole: UserRole) => {
        return userRole === "manager"
    },

    // Feedback permissions
    canLeaveFeedback: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Can't leave feedback for yourself
        if (userEmployeeId === targetEmployeeId) return false
        // Managers and co-workers can leave feedback for others
        return userRole === "manager" || userRole === "coworker"
    },

    canViewFeedback: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Managers can view all feedback
        if (userRole === "manager") return true
        // Employees can view their own feedback
        if (userRole === "employee" && userEmployeeId === targetEmployeeId) return true
        // Co-workers can view feedback they've left
        return userRole === "coworker"
    },

    // Absence request permissions
    canRequestAbsence: (userRole: UserRole) => {
        // All users can request absence for themselves
        return true
    },

    canViewAbsenceRequests: (targetEmployeeId: string, userRole: UserRole, userEmployeeId: string) => {
        // Managers can view all absence requests
        if (userRole === "manager") return true
        // Employees can view their own absence requests
        if (userRole === "employee" && userEmployeeId === targetEmployeeId) return true
        return false
    },

    canApproveAbsence: (userRole: UserRole) => {
        return userRole === "manager"
    },
}

// Helper function to get user-friendly permission messages
export const getPermissionMessage = (action: string, userRole: UserRole): string => {
    const messages: Record<string, Record<UserRole, string>> = {
        viewProfile: {
            manager: "As a manager, you can view all employee profiles.",
            employee: "You can view your own profile and public information of co-workers.",
            coworker: "You can view public information of all employees.",
        },
        editProfile: {
            manager: "As a manager, you can edit all employee profiles.",
            employee: "You can edit your own profile information.",
            coworker: "You cannot edit employee profiles. Contact a manager for changes.",
        },
        viewTeam: {
            manager: "As a manager, you have access to team overview.",
            employee: "Team overview is only available to managers.",
            coworker: "Team overview is only available to managers.",
        },
        leaveFeedback: {
            manager: "As a manager, you can leave feedback for all employees.",
            employee: "You cannot leave feedback for yourself.",
            coworker: "You can leave feedback for other employees.",
        },
    }

    return messages[action]?.[userRole] || "Permission information not available."
}
