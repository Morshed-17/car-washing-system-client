<div align="center">
  <h1>Car Washing System - Client</h1>
</div>

---

## Live Link

[car-wash-client](https://car-washing-system-client-phi.vercel.app)

## Introduction

The **Car Washing System - Client** is a front-end application designed for managing car washing services. It leverages modern web technologies to provide a seamless user experience.

## Project Description

This project serves as the client-side application for a car washing management system. It includes functionalities such as booking slots, managing user preferences, and providing a smooth interface for service interactions.

## Features

- Custom Authentication
- Dashboard for both admin and users.
- Dark mode integration.
- Debounced Search filters for low server load.
- Dynamic form handling with validation.
- User-friendly booking interface.
- Rating and feedback system.
- Responsive design for desktop and mobile devices.
- Real-time updates for service availability.
- _Aamarpay_ Gateway Setup.

## Technology Stack

- **Frontend Framework**: React, Redux
- **UI Libraries**: ShadcnUi, TailwindCSS, Framer Motion
- **State Management**: Redux Toolkit, Redux Persist
- **Api Calling**: RTK Query.
- **Form Handling**: React Hook Form with zod resolvers.
- **Other Tools**: TypeScript, ESLint, Vite

## Installation Guideline

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or later)
- npm or yarn
- A text editor or IDE (e.g., VS Code)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/car-washing-system-client.git
   cd car-washing-system-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following contents:

   ```bash
   VITE_CLOUDINARY_CLOUD_NAME=dnoc8radz
   VITE_CLOUDINARY_UPLOAD_PRESET=car-wash-image-upload
   VITE_SERVER_URL=https://car-washing-system-bice.vercel.app
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Configuration

1. The `.env` file is used for managing sensitive configuration details. Example:

   ```bash
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_SERVER_URL=your_server_url
   ```

2. Replace placeholder values with your actual configurations.

## Usage

- Access the application through your local development server.
- Use the intuitive interface to manage bookings, provide feedback, and explore features.
- Customize the `.env` file to connect with your backend API and storage services.
