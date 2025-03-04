# 🚌 Online Bus Ticket Booking System

## 📌 Project Overview

The **Online Bus Ticket Booking System** is a backend service built with **NestJS** and **TypeORM** that allows users to book bus tickets, manage schedules, process payments, and track reservations efficiently.

## 🚀 Features

- **User Authentication & Authorization** (Admin, Operator, User)
- **Bus Management** (Add, Update, Remove Buses)
- **Route & Schedule Management**
- **Ticket Booking & Seat Selection**
- **Secure Payment Processing**
- **Booking History & Status Updates**
- **Review & Ratings System**
- **Admin Dashboard for Managing Operations**

---

## 🏷️ Tech Stack

| Technology  | Description                                  |
| ----------- | -------------------------------------------- |
| **NestJS**  | Backend framework for building scalable APIs |
| **TypeORM** | ORM for database interactions                |
| **MySQL**   | Relational database for data storage         |
| **JWT**     | Authentication and security                  |
| **Docker**  | Containerized deployment                     |
| **Swagger** | API documentation                            |

---

## 💂️ Project Structure

```
📦 bus-ticket-booking
 ├ 💚 src
 ├ ├ 💚 auth
 ├ ├ 💚 users
 ├ ├ 💚 buses
 ├ ├ 💚 routes
 ├ ├ 💚 schedules
 ├ ├ 💚 bookings
 ├ ├ 💚 payments
 ├ ├ 💚 reviews
 ├ ├ 💚 main.ts
 ├ ├ 💚 app.module.ts
 ├ 💚 .env
 ├ 💚 README.md
 ├ 💚 package.json
 ├ 💚 tsconfig.json
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/bus-ticket-booking.git
cd bus-ticket-booking
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and configure it as follows:

```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=bus_booking
JWT_SECRET=your_secret_key
```

### **4️⃣ Run the Application**

```sh
npm run start
```

For development:

```sh
npm run start:dev
```

### **5️⃣ API Documentation**

Once the server is running, access **Swagger API Docs** at:

```
http://localhost:3000/api
```

---

## 📀 API Endpoints

### **Authentication**

| Method | Endpoint         | Description             | Access |
| ------ | ---------------- | ----------------------- | ------ |
| POST   | `/auth/register` | User Registration       | Public |
| POST   | `/auth/login`    | User Login              | Public |
| GET    | `/auth/profile`  | Get Logged-in User Info | User   |

### **Bus Management (Admin)**

| Method | Endpoint     | Description        | Access |
| ------ | ------------ | ------------------ | ------ |
| POST   | `/buses`     | Add a new bus      | Admin  |
| GET    | `/buses`     | List all buses     | Admin  |
| PUT    | `/buses/:id` | Update bus details | Admin  |
| DELETE | `/buses/:id` | Delete a bus       | Admin  |

### **Route & Schedule**

| Method | Endpoint     | Description       | Access |
| ------ | ------------ | ----------------- | ------ |
| GET    | `/routes`    | Get all routes    | Public |
| GET    | `/schedules` | Get all schedules | Public |
| POST   | `/schedules` | Add new schedule  | Admin  |

### **Booking & Payment**

| Method | Endpoint        | Description         | Access |
| ------ | --------------- | ------------------- | ------ |
| POST   | `/bookings`     | Book a ticket       | User   |
| GET    | `/bookings/:id` | Get booking details | User   |
| POST   | `/payments`     | Process payment     | User   |

### **Reviews & Ratings**

| Method | Endpoint       | Description         | Access |
| ------ | -------------- | ------------------- | ------ |
| POST   | `/reviews`     | Submit a bus review | User   |
| GET    | `/reviews/:id` | Get bus reviews     | Public |

---

## 💪 Running with Docker

```sh
docker-compose up --build
```

---

## ⚒️ Testing

Run unit tests:

```sh
npm run test
```

Run end-to-end tests:

```sh
npm run test:e2e
```

---

## 👨‍💻 Contributors

- **Your Name** – _Developer_
- **Your Email** – _your-email@example.com_

---

## 🐟 License

This project is licensed under the **MIT License**.

---
