# ShineSlot

## Overview

Welcome to the ShineSlot. Our Car Wash Booking System is a user-friendly web application designed to simplify the car wash booking process. It provides an intuitive interface for users to browse services, book appointments, and manage their bookings. The system also includes an admin dashboard for managing services, slots, and users.

### Want to visit? here are the [Live Link](https://shine-slot-client.vercel.app) and some credentials

### Demo Video
 
[![Watch Demo](./src//assets/Screenshot%202024-08-30%20142030.png)](https://drive.google.com/file/d/1GxbQl2b5xDFbauQ9Fwe0igiQtl0QhX43/view?usp=sharing)

### Credentials for several Roles

- **User :**
  - **Email :** <h.r.sihab155@gmail.com>
  - **Password :** sihab1234

- **Admin :**
  - **Email :** <web@programming-hero.com>
  - **Password :** ph-password

## Features

### Public Pages

- **Home Page**
  - **Navigation menu**
  - **Hero/branding section**
  - **Call-to-action button**
  - **Featured services**
  - **Interactive review section**
  - **Footer**

- **User Authentication**
  - **Sign up and login functionality**
  - **Token-based authentication**

- **Services Page**
  - **List of all car wash services**
  - **Search, filter, and sort functionality**

- **Service Details Page**
  - **Detailed service information**
  - **Available time slot display**
  - **Booking functionality**

- **Booking Page**
  - **Service and time slot summary**
  - **User information form**
  - **Payment integration with AAMARPAY**

### Admin Pages

- **Admin Dashboard**
  - **Overview of recent bookings**
  - **Service management (CRUD operations)**
  - **Slot management**
  - **User management**

### User Pages

- **User Dashboard**
  - **Account information management**
  - **Booking history (past and upcoming)**
  - **Service slot countdown**

## Technology

- **Frontend:** ReactJs, JavaScript, Redux, TypeScript, Prettier, Tailwind, Ant Design
- **Backend:** NodeJs, ExpressJs
- **Database:** MongoDb
- **Authentication:**  JWT (JSON Web Tokens)
- **Payment Gateway:** AAMARPAY

## Environment Variables

- **VITE_IMAGE_HOSTING_KEY:** This is used on registration page for uploading image , taken from imagebb (obtain from Firebase console: [imgbb api](https://api.imgbb.com/))

<!-- ### **To run run locally you also need to clone the [server repository](https://github.com/habib-153/A3_V1_CarWashingSystem.git).** -->

## Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/habib-153/ShineSlot_Client.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ShineSlot_Client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env.local` file:**

   - Create a `.env.local` file in the root directory of your project.
   - Copy the required environment variables from the provided `.env.example` file.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **View the app:**

   - Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.

That's it! You've successfully set up and run the app locally.

Server Repo: [Server Repo](https://github.com/habib-153/A3_V1_CarWashingSystem.git)
