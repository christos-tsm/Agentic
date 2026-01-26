## Agentic - Enterprise Agency Management System ##
Agentic is a CRM/ERP solution for digital agencies. It is built with the Laravel-Inertia-React (LIR) stack, utilizing TypeScript for end-to-end type safety.

## Tech Stack ##
Backend: Laravel 11

Frontend: React 18 / TypeScript

Stack: Inertia.js (Server-side Routing/SPA)

Styling: Tailwind CSS / Shadcn UI

Database: PostgreSQL / MySQL

## Architecture ##
The project follows a decoupled architecture to ensure maintainability and high performance:

<u>Repository Pattern:</u> All database interactions are abstracted into Repositories to isolate Eloquent queries.

<u>Service Layer:</u> All business logic is encapsulated in Services, ensuring "Thin Controllers".

<u>Form Requests:</u> Centralized validation and authorization logic.

<u>Performance:</u> Implementation of Eager Loading to eliminate N+1 query problems and Database Indexing on high-traffic columns.

<u>Type Safety:</u> Strict TypeScript interfaces reflecting the backend models.

Core Features
<u>CRM Module:</u> Full client lifecycle management and performance tracking.

<u>Project Tracking:</u> Status-based management (Backlog, In Progress, Completed).

<u>Financial Overview:</u> Real-time monitoring of budget allocations and pending payments.

<u>Data Tables:</u> Advanced server-side filtering, sorting, and pagination.

## Project Status ##
This system is under active development. New features and architectural refinements are implemented regularly to reflect enterprise-level standards.