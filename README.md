# TransitX

A modern transit ticket booking platform built with React and Vite. TransitX provides a seamless experience for users to browse, book, and manage transportation tickets with role-based access for users, vendors, and administrators.

## Features

### Core Features
- **Ticket Booking System**: Browse and book transportation tickets
- **User Authentication**: Secure login/register with Firebase Auth
- **Role-Based Access**: Different dashboards for Users, Vendors, and Admins
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data with React Query

### User Features
- Browse available tickets and routes
- View ticket details and pricing
- Book tickets securely
- Manage personal bookings
- User dashboard with booking history

### Vendor Features
- Vendor dashboard for ticket management
- Add and manage routes
- Track sales and bookings

### Admin Features
- Administrative dashboard
- User and vendor management
- System oversight and analytics

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components

### State Management & Data
- **React Query (TanStack)** - Server state management
- **React Context** - Global state management
- **React Hook Form** - Form handling

### Authentication & Backend
- **Firebase** - Authentication and backend services
- **Axios** - HTTP client for API requests

### UI/UX Libraries
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alerts
- **Swiper** - Touch slider
- **React Responsive Carousel** - Image carousels

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd transitx
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Logo/           # Logo components
│   └── Modals/         # Modal components
├── Context/            # React Context providers
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx
├── firebase/           # Firebase configuration
├── Hooks/              # Custom React hooks
│   ├── useAuth.jsx
│   ├── useAxiosSecure.jsx
│   └── useRole.jsx
├── Layouts/            # Layout components
├── Pages/              # Page components
│   ├── All Tickets/    # Ticket browsing pages
│   ├── Auth/           # Authentication pages
│   ├── Dashboard/      # Role-based dashboards
│   ├── Home/           # Homepage components
│   ├── Private/        # Protected routes
│   └── Shared/         # Shared components
├── Routes/             # Routing configuration
├── Utils/              # Utility functions
├── assets/             # Static assets
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## Key Features Implementation

### Authentication System
- Firebase Authentication integration
- Protected routes with role-based access
- Custom hooks for auth state management

### Responsive Design
- Mobile-first approach with Tailwind CSS
- DaisyUI components for consistent UI
- Responsive navigation and layouts

### State Management
- React Query for server state
- Context API for global client state
- Custom hooks for data fetching

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@transitx.com or join our Slack channel.
