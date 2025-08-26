# NEWWORK HR - Employee Profile System

A comprehensive HR application built for the NEWWORK take-home assignment. This single-page application provides role-based employee profile management with feedback systems and absence request functionality.

## 🚀 Features

### Core Functionality

- **Role-Based Access Control**: Three user roles with different permissions
  - **Manager**: Full access to all employee data, team management, and approval workflows
  - **Employee**: Access to own profile, feedback viewing, and absence requests
  - **Co-worker**: View public profiles and leave feedback for colleagues

### Employee Profile Management

- View and edit employee profiles with role-based permissions
- Sensitive data protection (salary, address, emergency contacts)
- Professional profile cards with comprehensive employee information
- Real-time profile updates with form validation

### Feedback System with AI Enhancement

- Leave feedback for colleagues with optional AI polishing
- Mock AI service that enhances feedback with professional language
- View feedback history with original/polished content comparison
- Role-based feedback permissions and visibility

### Absence Request Management

- Submit time-off requests with date validation
- Manager approval workflow for pending requests
- Status tracking (pending, approved, rejected)
- Statistics dashboard for request overview
- Multiple absence types (vacation, sick leave, personal, other)

## 🛠 Technology Stack

- **Frontend**: Next.js 14 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Mock authentication system
- **Data Storage**: Mock data with local state management
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4 with custom design tokens

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#2563eb) - Professional and trustworthy
- **Success**: Green (#16a34a) - Approvals and positive actions
- **Warning**: Yellow (#ca8a04) - Pending states and cautions
- **Error**: Red (#dc2626) - Rejections and errors
- **Neutral**: Gray scale for backgrounds and text

### Typography

- **Headings**: GeistSans with bold weights
- **Body**: GeistSans regular and medium
- **Monospace**: GeistMono for technical content

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash

   # If using GitHub integration

   git clone [repository-url]
   cd newwork-hr-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Accounts

The application includes three demo accounts to test different user roles:

| Role          | Email                     | Access Level                   |
| ------------- | ------------------------- | ------------------------------ |
| **Manager**   | michael.chen@newwork.com  | Full access to all features    |
| **Employee**  | sarah.johnson@newwork.com | Own profile + absence requests |
| **Co-worker** | alex.rivera@newwork.com   | Public profiles + feedback     |

## 📱 User Interface

### Navigation

- Clean, professional navigation bar with role-based menu items
- User avatar and role badge for easy identification
- Responsive design that works on desktop and mobile

### Dashboard Views

- **Profile Dashboard**: Employee information with edit capabilities
- **Team Overview**: Manager-only view of all team members
- **Feedback System**: Tabbed interface for giving and receiving feedback
- **Absence Requests**: Request management with approval workflows

### Key UI Features

- **Permission Guards**: Automatic access control with helpful error messages
- **Loading States**: Smooth loading indicators for all async operations
- **Form Validation**: Real-time validation with clear error messages
- **Responsive Design**: Mobile-first approach with desktop enhancements

## 🔐 Security & Permissions

### Role-Based Access Control

The application implements comprehensive permission checking:

\`\`\`typescript
// Example permission checks
canViewProfile(targetEmployeeId, userRole, userEmployeeId)
canEditProfile(targetEmployeeId, userRole, userEmployeeId)
canViewSensitiveData(targetEmployeeId, userRole, userEmployeeId)
canLeaveFeedback(targetEmployeeId, userRole, userEmployeeId)
canApproveAbsence(userRole)
\`\`\`

### Data Protection

- Sensitive employee data (salary, address, emergency contacts) only visible to managers and profile owners
- Feedback visibility controlled by role and authorship
- Absence requests private to employee and managers

## 🤖 AI Features

### Feedback Enhancement

The application includes a mock AI polishing service that:

- Enhances feedback language with more professional terminology
- Adds structure to short feedback entries
- Maintains original content for comparison
- Simulates real AI integration (ready for Groq/OpenAI integration)

## 📊 Data Structure

### Employee Profile

\`\`\`typescript
interface Employee {
id: string
name: string
email: string
position: string
department: string
manager: string
startDate: string
salary: number // Sensitive data
phone: string
address: string // Sensitive data
emergencyContact: { // Sensitive data
name: string
phone: string
relationship: string
}
}
\`\`\`

### Feedback System

\`\`\`typescript
interface Feedback {
id: string
employeeId: string
authorId: string
authorName: string
content: string
isPolished: boolean
originalContent?: string
createdAt: string
}
\`\`\`

### Absence Requests

\`\`\`typescript
interface AbsenceRequest {
id: string
employeeId: string
type: "vacation" | "sick" | "personal" | "other"
startDate: string
endDate: string
reason: string
status: "pending" | "approved" | "rejected"
createdAt: string
}
\`\`\`

## 🔧 Architecture

### Context Providers

- **AuthContext**: User authentication and session management
- **DataContext**: Application data and CRUD operations
- **PermissionContext**: Role-based access control logic

### Component Structure

\`\`\`
components/
├── ui/ # shadcn/ui base components
├── navigation.tsx # Main navigation bar
├── employee-profile-card.tsx
├── feedback-form.tsx
├── feedback-list.tsx
├── absence-request-form.tsx
├── absence-request-list.tsx
├── permission-guard.tsx
└── role-badge.tsx
\`\`\`

### Pages Structure

\`\`\`
app/
├── page.tsx # Root redirect
├── login/page.tsx # Authentication
├── dashboard/
│ ├── page.tsx # Main profile dashboard
│ ├── team/page.tsx # Manager team overview
│ ├── feedback/page.tsx
│ ├── absence/page.tsx
│ └── employee/[id]/page.tsx
\`\`\`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Click the "Publish" button in the v0 interface
2. Connect your GitHub repository
3. Deploy automatically with Vercel

### Manual Deployment

\`\`\`bash

# Build the application

npm run build

# Start production server

npm start
\`\`\`

## 🔮 Future Enhancements

### Potential Integrations

- **Real Database**: Supabase or Neon for persistent data
- **AI Services**: Groq or OpenAI for actual feedback polishing
- **Email Notifications**: For absence request approvals
- **Calendar Integration**: Google Calendar sync for approved time off
- **File Uploads**: Profile pictures and document attachments

### Additional Features

- **Performance Reviews**: Structured review cycles
- **Goal Tracking**: Employee objectives and KPIs
- **Time Tracking**: Work hours and productivity metrics
- **Reporting**: Analytics dashboard for HR insights

## 📝 Assignment Requirements

This application fulfills all requirements from the NEWWORK take-home assignment:

✅ **Manager/Employee Owner Permissions**: Can see and change all data  
✅ **Co-worker Permissions**: Can see non-sensitive data and leave feedback  
✅ **Employee Permissions**: Can request absence  
✅ **AI Feedback Polishing**: Optional AI enhancement of feedback text  
✅ **Professional UI**: Clean, modern interface suitable for enterprise use  
✅ **Role-Based Access**: Comprehensive permission system  
✅ **Single Page Application**: Built with Next.js App Router

## 🤝 Contributing

This is a take-home assignment project. For questions or clarifications, please contact the development team.

## 📄 License

This project is created for the NEWWORK take-home assignment evaluation.
