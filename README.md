# Route Connect

**A modern, responsive social media application built with React, TypeScript, and Vite.**

Route Connect is a frontend social networking application developed as part of the **Route Academy MERN Stack Diploma**.

The project focuses on building a functional social media experience while applying modern React development practices, including component-based architecture, authentication, server-state management, API integration, and responsive UI design.

### 🌐 Live Demo

**[Explore Route Connect](https://route-connect-two.vercel.app/)**

## ✨ Features

### Authentication
- User registration and sign-in
- Session restoration on page refresh
- Protected routes for authenticated users
- Logout with session and cached-data cleanup
- Form validation and user-friendly error handling

### Posts
- Browse the social feed
- Infinite scrolling with automatic pagination
- Create posts with text and/or images
- Edit and delete owned posts
- View individual posts and their details
- Loading skeletons, loading indicators, and error states

### Comments & Replies
- Add comments to posts
- View and interact with comment threads
- Reply to comments
- Edit and delete owned comments
- Paginated comment loading

### User Experience
- Responsive layouts for desktop and mobile
- Dark-themed interface
- Loading and empty states
- Error handling with retry options
- Client-side navigation and direct-link support

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and maintainability |
| Vite | Development server and production build |
| React Router | Client-side routing and protected pages |
| TanStack Query | Server-state management, caching, and mutations |
| Axios | HTTP requests and API integration |
| React Hook Form | Form state management |
| Zod | Schema-based form validation |
| HeroUI | UI components and interactive elements |
| Tailwind CSS | Utility-first styling |
| React Intersection Observer | Infinite scrolling |
| Vercel | Deployment and hosting |

## 🏗️ Architecture & Engineering Decisions

Route Connect follows a component-based frontend architecture with a separation of responsibilities.

**Authentication & Authorization**

Authentication state is managed through React Context. Protected routes restrict access to authenticated users, while session initialization restores authentication state after a page refresh.

**Server-State Management**

TanStack Query manages asynchronous server data, caching, mutations, and query invalidation. This keeps API data handling separate from local UI state.

**API Integration**

API requests are organized through dedicated service functions using Axios, helping separate network communication from presentation logic.

**Infinite Scrolling**

The feed combines TanStack Query's infinite queries with the Intersection Observer API to request additional pages as users scroll.

**Reusable Components**

Posts, comments, forms, and shared UI elements are separated into components to improve readability, maintainability, and reuse.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   `git clone https://github.com/KarimAkmal88/Route-Connect.git`

2. Navigate to the project directory:

   `cd Route-Connect`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open the local URL displayed in your terminal.

### Production Build

To generate an optimized production build:

`npm run build`

To run ESLint:

`npm run lint`

## 🔌 API

Route Connect integrates with the **Route Academy Posts API** to manage authentication, posts, comments, and related social interactions.

API documentation: https://route-posts.routemisr.com/

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes, providing a consistent experience across desktop and mobile devices.

## 📚 Learning Outcomes

This project provided hands-on experience with:

- React component design and responsibility separation
- TypeScript integration in React applications
- Authentication flows and protected routing
- REST API integration
- Server state versus client state
- Asynchronous operations and error handling
- Query caching and invalidation
- Infinite scrolling and pagination
- Form handling and validation
- Responsive UI implementation
- Production builds and deployment

## 🔮 Future Improvements

Potential enhancements include:

- User profile management
- Post reactions and likes
- Content sharing
- Further performance optimization and code splitting
- Accessibility improvements

These are potential enhancements and are not part of the current implemented feature set.

## 👨‍💻 Author

**Karim Akmal**

Computer Engineer | MERN Stack Developer in Training

GitHub: [@KarimAkmal88](https://github.com/KarimAkmal88)

---

Developed as part of the **Route Academy MERN Stack Diploma**.