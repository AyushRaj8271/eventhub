# Eventify: Event Management System

## Project Overview

**Eventify** is an event management system designed to help users manage and organize various events. The system uses a mock database (`db.json`) for storing event-related data and provides a simple REST API to interact with the events. This project allows for CRUD (Create, Read, Update, Delete) operations on event details and related entities like attendees, locations, etc.

---

## Steps to Run the Project

Follow the instructions below to set up and run the **Eventify** Event Management System locally.

---

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (includes npm): [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager): It comes with Node.js.

---

### Installation and Setup

#### 1. **Clone the repository** (if you're using a Git repository):

```bash
git clone <repository-url>
cd eventify
```

#### 2. **Install dependencies**:

```bash
npm install
npm install -g json-server
```

#### 3. **Start the server**:

```bash
npm start
json-server --watch db.json --port 3001
```

#### 4. **Login**:

You can use the following credentials to login:

Username : emilys
Password : emilyspass
