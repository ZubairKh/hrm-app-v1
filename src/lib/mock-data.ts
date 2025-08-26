// Mock data structure for the HR Employee Profile application

export interface Employee {
    id: string
    name: string
    email: string
    position: string
    department: string
    manager: string
    startDate: string
    salary: number
    phone: string
    address: string
    emergencyContact: {
        name: string
        phone: string
        relationship: string
    }
    avatar?: string
}

export interface Feedback {
    id: string
    employeeId: string
    authorId: string
    authorName: string
    content: string
    isPolished: boolean
    originalContent?: string
    createdAt: string
}

export interface AbsenceRequest {
    id: string
    employeeId: string
    type: "vacation" | "sick" | "personal" | "other"
    startDate: string
    endDate: string
    reason: string
    status: "pending" | "approved" | "rejected"
    createdAt: string
}

export type UserRole = "manager" | "employee" | "coworker"

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    employeeId: string
}

// Mock employees data
export const mockEmployees: Employee[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@newwork.com",
        position: "Senior Software Engineer",
        department: "Engineering",
        manager: "Michael Chen",
        startDate: "2022-03-15",
        salary: 95000,
        phone: "+1 (555) 123-4567",
        address: "123 Tech Street, San Francisco, CA 94105",
        emergencyContact: {
            name: "John Johnson",
            phone: "+1 (555) 987-6543",
            relationship: "Spouse",
        },
    },
    {
        id: "2",
        name: "Michael Chen",
        email: "michael.chen@newwork.com",
        position: "Engineering Manager",
        department: "Engineering",
        manager: "Lisa Rodriguez",
        startDate: "2021-01-10",
        salary: 120000,
        phone: "+1 (555) 234-5678",
        address: "456 Innovation Ave, San Francisco, CA 94107",
        emergencyContact: {
            name: "Amy Chen",
            phone: "+1 (555) 876-5432",
            relationship: "Spouse",
        },
    },
    {
        id: "3",
        name: "Alex Rivera",
        email: "alex.rivera@newwork.com",
        position: "Product Designer",
        department: "Design",
        manager: "Sarah Kim",
        startDate: "2023-06-01",
        salary: 85000,
        phone: "+1 (555) 345-6789",
        address: "789 Creative Blvd, San Francisco, CA 94110",
        emergencyContact: {
            name: "Maria Rivera",
            phone: "+1 (555) 765-4321",
            relationship: "Mother",
        },
    },
    // add a record for name Zubair Ahmed
    {
        id: "4",
        name: "Zubair Ahmed",
        email: "zubair.ahmed@newwork.com",
        position: "Lead Engineer",
        department: "Analytics",
        manager: "Michael Chen",
        startDate: "2023-01-15",
        salary: 70000,
        phone: "+1 (555) 456-7890",
        address: "321 Data St, San Francisco, CA 94111",
        emergencyContact: {
            name: "Ali Ahmed",
            phone: "+1 (555) 654-3210",
            relationship: "Brother",
        },
    }
]

// Mock users for authentication
export const mockUsers: User[] = [
    {
        id: "1",
        name: "Michael Chen",
        email: "michael.chen@newwork.com",
        role: "manager",
        employeeId: "2",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.johnson@newwork.com",
        role: "employee",
        employeeId: "1",
    },
    {
        id: "3",
        name: "Alex Rivera",
        email: "alex.rivera@newwork.com",
        role: "coworker",
        employeeId: "3",
    },

]

// Mock feedback data
export const mockFeedback: Feedback[] = [
    {
        id: "1",
        employeeId: "1",
        authorId: "2",
        authorName: "Michael Chen",
        content:
            "Sarah consistently delivers high-quality code and mentors junior developers effectively. Her technical leadership on the API redesign project was exceptional.",
        isPolished: false,
        createdAt: "2024-01-15T10:30:00Z",
    },
    {
        id: "2",
        employeeId: "1",
        authorId: "3",
        authorName: "Alex Rivera",
        content:
            "Working with Sarah on the user dashboard was great. She always explains technical concepts clearly and is very collaborative.",
        isPolished: false,
        createdAt: "2024-01-10T14:20:00Z",
    },
]

// Mock absence requests
export const mockAbsenceRequests: AbsenceRequest[] = [
    {
        id: "1",
        employeeId: "1",
        type: "vacation",
        startDate: "2024-02-15",
        endDate: "2024-02-19",
        reason: "Family vacation to Hawaii",
        status: "approved",
        createdAt: "2024-01-20T09:00:00Z",
    },
    {
        id: "2",
        employeeId: "3",
        type: "sick",
        startDate: "2024-01-25",
        endDate: "2024-01-25",
        reason: "Flu symptoms",
        status: "approved",
        createdAt: "2024-01-25T08:30:00Z",
    },
]
