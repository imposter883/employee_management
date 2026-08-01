# 🚀 Employee Management System

A scalable **Employee Management System** built with **NestJS**, **TypeORM**, and **PostgreSQL**. The system is designed to manage employees, departments, tasks, attendance, leave requests, and client interactions using **Role-Based Access Control (RBAC)** and **JWT Authentication**.

## ✨ Features

* 🔐 Secure user authentication with **JWT**
* 👥 Role-Based Access Control (RBAC)
* 👨‍💼 Employee Management
* 🧑‍💻 Manager Dashboard
* 📋 Task Management
* 📅 Attendance Tracking
* 📝 Leave Management
* 🤝 Client Management
* 🗄️ PostgreSQL Database Integration
* ⚡ RESTful API built with NestJS

## 👤 User Roles

The system supports four different user roles:

1. **Super Admin**

   * Full system access
   * Manage all users and roles
   * Monitor the entire system

2. **Manager**

   * Manage employees
   * Assign and monitor tasks
   * Approve or reject leave requests
   * Track attendance

3. **Employee**

   * View assigned tasks
   * Submit leave requests
   * View attendance records
   * Update personal profile

4. **Client**

   * View assigned projects
   * Track project progress
   * Communicate with the organization

## 🔒 Authentication

This project implements **JWT (JSON Web Token) Authentication** to provide secure login and protect API endpoints.

* User Login
* Password Encryption
* Protected Routes
* Role-Based Authorization

## 🛠️ Tech Stack

* **Backend:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Authentication:** JWT + Passport
* **Validation:** class-validator
* **API Testing:** Postman

## 📌 Project Status

🚧 **Currently Under Development**

Planned features include:

* Authentication & Authorization
* Employee Management
* Manager Module
* Task Management
* Attendance Management
* Leave Management
* Client Management
* Department Management
* Dashboard & Analytics

## 📄 License

This project is developed for learning and academic purposes.
