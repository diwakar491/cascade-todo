# Todo Application

A full-stack Todo application built with **Spring Boot** (backend) and **Angular** (frontend), featuring JWT authentication, role-based access control (RBAC), and real-time server health monitoring.

## Features

- **User Authentication**: Secure JWT-based login/registration
- **Role-Based Access Control**: Admin users can manage all todos, regular users manage their own
- **Real-time Server Monitoring**: Auto-logout when server disconnects
- **Swagger UI**: Interactive API documentation
- **Responsive UI**: Modern Angular Material design

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Spring Boot 3.2, Java 17, Spring Security, JWT |
| Database | HSQLDB (file-based) |
| Frontend | Angular 14, TypeScript, RxJS |
| Documentation | Swagger/OpenAPI 3 |

## Prerequisites

- **Java 17+** ([Download](https://adoptium.net/))
- **Node.js 14+** ([Download](https://nodejs.org/))
- **Maven 3.8+** ([Download](https://maven.apache.org/download.cgi))
- **Git** ([Download](https://git-scm.com/))

## Quick Start

### 1. Clone the Repository

```bash
# Clone to a custom directory name (recommended)
git clone https://github.com/YOUR_USERNAME/cascade-todo.git todo-app
cd todo-app

# Or clone with default repository name
git clone https://github.com/YOUR_USERNAME/cascade-todo.git
cd cascade-todo
```

### 2. Start the Backend

```bash
cd backend

# Run with Maven
mvn spring-boot:run

# Or compile and run
mvn clean compile
java -cp "target/classes;target/dependency/*" com.example.todo.TodoApplication
```

Backend will start at: **http://localhost:8080**

### 3. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

Frontend will start at: **http://localhost:4200**

### 4. Access the Application

- **Web App**: http://localhost:4200
- **Swagger UI**: http://localhost:8080/swagger-ui/index.html
- **API Docs**: http://localhost:8080/v3/api-docs

## Default Users

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| `admin` | `***REDACTED***` | ROLE_ADMIN | Full access to all todos and user management |
| `john_doe` | `***REDACTED***` | ROLE_USER | Regular user access |
| `jane_smith` | `***REDACTED***` | ROLE_USER | Regular user access |

> **Note:** All default users share the same password. Check `DataInitializer.java` or application logs on first startup for details.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login (returns JWT) |
| POST | `/api/auth/register` | User registration |

### Todo Management (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos for current user |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |

### Admin Endpoints (ROLE_ADMIN required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/{userId}/todos` | Get todos for any user |
| PUT | `/api/admin/todos/{todoId}` | Update any todo |
| DELETE | `/api/admin/todos/{todoId}` | Delete any todo |

## Project Structure

```
windsurf-project/
├── backend/                    # Spring Boot application
│   ├── src/main/java/
│   │   └── com/example/todo/
│   │       ├── config/       # DataInitializer, OpenApiConfig
│   │       ├── controller/   # REST controllers
│   │       ├── entity/       # JPA entities (User, Todo)
│   │       ├── repository/   # Spring Data repositories
│   │       ├── security/     # JWT, Security config
│   │       └── TodoApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql          # Initial data (optional)
│   └── pom.xml
├── frontend/                   # Angular application
│   ├── src/app/
│   │   ├── components/       # UI components
│   │   ├── interceptors/   # AuthInterceptor
│   │   ├── services/         # AuthService, TodoService
│   │   └── models/           # TypeScript interfaces
│   ├── package.json
│   └── angular.json
└── README.md
```

## Development Guide

### Backend Development

```bash
cd backend

# Run with auto-reload (Spring Boot DevTools)
mvn spring-boot:run

# Run tests
mvn test

# Build JAR
mvn clean package
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server with hot reload
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test
```

## Configuration

### Backend (`application.properties`)

```properties
# Server port
server.port=8080

# JWT Configuration
jwt.secret=mySecretKey12345678901234567890123456789012
jwt.expiration=86400000

# Database (HSQLDB)
spring.datasource.url=jdbc:hsqldb:file:./data/tododb
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Troubleshooting

### Backend won't start (Port 8080 in use)
```bash
# Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Database lock issues
```bash
# Stop Java processes and clear database
taskkill /F /IM java.exe
rmdir /s /q backend/data
```

### Frontend dependency issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Security Notes

- **JWT tokens** are stored in browser localStorage
- **Auto-logout** occurs when server disconnects (health check every 5s)
- **Passwords** are BCrypt-encoded in database
- **CORS** enabled for localhost:4200

## License

MIT License - feel free to use and modify!

## Support

For issues or questions, please open a GitHub issue.
