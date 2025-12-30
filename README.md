<div align="center">
  <br />
  <img src="doctors-appointment-platform-main/public/dashboard.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js_15-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="Next.js"/>
    <img src="https://img.shields.io/badge/-React_19-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS"/>
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="Prisma"/>
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=6C47FF" alt="Clerk"/>
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="PostgreSQL"/>
  </div>

  <h3 align="center">MediConnect - Doctor Appointment Platform</h3>

  <div align="center">
    Book appointments, consult via video, and manage your healthcare journey — all in one secure platform.
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

MediConnect is a full-stack telemedicine platform that bridges the gap between patients and healthcare providers. Built with Next.js 15 and React 19, it offers a seamless experience for booking medical consultations, conducting video appointments, and managing healthcare workflows.

The platform supports three user roles — Patients, Doctors, and Admins — each with dedicated dashboards and functionality. Patients can browse verified doctors across 16+ medical specialties, book appointments using a credit-based system, and join video consultations. Doctors can set their availability, manage appointments, add clinical notes, and request payouts. Admins oversee doctor verification and payout processing.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js 15](https://nextjs.org/)** — React framework with App Router, Server Actions, and Turbopack for blazing-fast development.

- **[React 19](https://react.dev/)** — Latest React with improved performance and new features.

- **[Clerk](https://clerk.com/)** — Complete authentication solution with subscription billing, user management, and role-based access control.

- **[Prisma](https://www.prisma.io/)** — Type-safe ORM for PostgreSQL database operations with migrations support.

- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS framework for rapid UI development.

- **[shadcn/ui](https://ui.shadcn.com/)** — Beautiful, accessible component library built on Radix UI primitives.

- **[Vonage Video API](https://www.vonage.com/communications-apis/video/)** — Real-time video calling infrastructure for telemedicine consultations.


## <a name="features">🔋 Features</a>

👉 **Authentication & Authorization**: Secure sign-up/sign-in with Clerk, supporting role-based access for Patients, Doctors, and Admins.

👉 **Doctor Discovery**: Browse verified doctors across 16+ specialties including Cardiology, Neurology, Pediatrics, Dermatology, and more.

👉 **Smart Appointment Booking**: View real-time availability slots for the next 4 days, with automatic conflict detection and 30-minute time slots.

👉 **Video Consultations**: Integrated Vonage Video API for secure, real-time video calls between patients and doctors with camera/mic controls.

👉 **Credit-Based System**: Subscription plans (Free, Standard, Premium) with monthly credit allocation. Each appointment costs 2 credits.

👉 **Doctor Dashboard**: Manage availability, view upcoming appointments, add clinical notes, and mark appointments as completed.

👉 **Patient Dashboard**: Track appointments, view doctor notes, join video calls, and manage consultation history.

👉 **Admin Panel**: Verify doctor credentials, manage doctor statuses (suspend/reinstate), and process payout requests.

👉 **Payout System**: Doctors can request payouts for earned credits via PayPal, with platform fee handling and admin approval workflow.

👉 **Appointment Management**: Cancel appointments with automatic credit refunds, add notes, and track appointment status (Scheduled, Completed, Cancelled).


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally.

**Prerequisites**

Make sure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/doctors-appointment-platform.git
cd doctors-appointment-platform/doctors-appointment-platform-main
```

**Installation**

```bash
npm install
```

**Set Up Environment Variables**

Create a `.env` file in the `doctors-appointment-platform-main` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mediconnect"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vonage Video API
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_vonage_app_id
VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

**Database Setup**

```bash
npx prisma generate
npx prisma db push
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
