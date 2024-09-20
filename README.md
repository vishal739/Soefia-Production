# Soefia

Classroom AI Assistant

# API Documentation

This document outlines the API endpoints for the following modules in your application:
- **Authentication**
- **Lesson**
- **Admin**
- **Student**
- **Teacher**
- **School**

---

## **Authentication Routes**

**Base Route**: `/api/auth`

| Method | Endpoint             | Description                                                                 | Request Body                                         | Response                         |
|--------|----------------------|-----------------------------------------------------------------------------|------------------------------------------------------|----------------------------------|
| GET    | `/home`              | Displays a basic message to verify the auth route is active.                 | None                                                 | `On auth`                       |
| POST   | `/signup`            | Allows users to sign up.                                                     | `name`, `email`, `password`                          | Success or error message        |
| POST   | `/login`             | Allows users to log in.                                                      | `email`, `password`                                  | User data or error message      |
| GET    | `/login/success`     | Checks if a user is logged in successfully.                                  | None                                                 | User data or login status       |
| GET    | `/google`            | Initiates Google OAuth2 login.                                               | None                                                 | Redirect to Google OAuth2       |
| GET    | `/google/callback`   | Handles the callback from Google OAuth2.                                      | None                                                 | Redirect to appropriate user role dashboard based on the logged-in user (`/admin`, `/teacher`, `/student`). |
| GET    | `/logout`            | Logs the user out of the session.                                             | None                                                 | Logout confirmation             |

---

## **Admin Routes**

**Base Route**: `/api/admin`

| Method | Endpoint             | Description                                    | Request Body                                         | Response                         |
|--------|----------------------|------------------------------------------------|------------------------------------------------------|----------------------------------|
| POST   | `/`                  | Adds a new admin.                              | `name`, `email`, `role`, `password`                  | Success message, new admin data |
| GET    | `/:id`               | Fetches admin by their ID.                     | None                                                 | Admin data                      |
| PATCH  | `/`                  | Updates an admin's details.                    | `adminId`, fields to update                          | Updated admin data              |
| DELETE | `/`                  | Deletes an admin by their ID.                  | `adminId`                                            | Success or error message        |

---

## **Lesson Routes**

**Base Route**: `/api/lesson`

| Method | Endpoint             | Description                                    | Request Body                                         | Response                         |
|--------|----------------------|------------------------------------------------|------------------------------------------------------|----------------------------------|
| POST   | `/`                  | Creates a new lesson.                          | `title`, `description`, `date`, `teacherId`, `classId`| Success message, lesson data    |
| PATCH  | `/`                  | Updates lesson details.                        | `lessonId`, fields to update                         | Updated lesson data             |
| DELETE | `/`                  | Deletes a lesson.                              | `lessonId`                                           | Success or error message        |
| GET    | `/upcoming`          | Fetches all upcoming lessons.                  | None                                                 | Array of upcoming lessons       |
| GET    | `/completed`         | Fetches all completed lessons.                 | None                                                 | Array of completed lessons      |

---

## **Student Routes**

**Base Route**: `/api/student`

| Method | Endpoint             | Description                                    | Request Body                                         | Response                         |
|--------|----------------------|------------------------------------------------|------------------------------------------------------|----------------------------------|
| POST   | `/`                  | Adds a new student.                            | `userId`, `name`, `email`, `classId`, `academicFactors`, `school` | Success message, student data   |
| GET    | `/:id`               | Fetches a student by their ID.                 | None                                                 | Student data                    |
| GET    | `/:id/class`         | Fetches students in a specific class.          | None                                                 | Array of students               |
| PATCH  | `/`                  | Updates student details.                       | `studentId`, fields to update                        | Updated student data            |
| DELETE | `/`                  | Deletes a student.                             | `studentId`                                          | Success or error message        |

---

## **Teacher Routes**

**Base Route**: `/api/teacher`

| Method | Endpoint             | Description                                    | Request Body                                         | Response                         |
|--------|----------------------|------------------------------------------------|------------------------------------------------------|----------------------------------|
| POST   | `/`                  | Adds a new teacher.                            | `name`, `email`, `subject`, `schoolId`               | Success message, teacher data   |
| GET    | `/:id`               | Fetches a teacher by their ID.                 | None                                                 | Teacher data                    |
| PATCH  | `/`                  | Updates teacher details.                       | `teacherId`, fields to update                        | Updated teacher data            |
| DELETE | `/`                  | Deletes a teacher.                             | `teacherId`                                          | Success or error message        |

---

## **School Routes**

**Base Route**: `/api/school`

| Method | Endpoint             | Description                                    | Request Body                                         | Response                         |
|--------|----------------------|------------------------------------------------|------------------------------------------------------|----------------------------------|
| POST   | `/`                  | Adds a new school.                             | `name`, `address`, `contact`, `principalId`          | Success message, school data    |
| GET    | `/:id`               | Fetches a school by its ID.                    | None                                                 | School data                     |
| PATCH  | `/`                  | Updates school details.                        | `schoolId`, fields to update                         | Updated school data             |
| DELETE | `/`                  | Deletes a school.                              | `schoolId`                                           | Success or error message        |

---

### **Authentication Notes**:
- The Google OAuth2 login process is initiated at `/api/auth/google` and the callback is handled at `/api/auth/google/callback`.
- Depending on the role of the user (`admin`, `teacher`, `student`), the user is redirected to the appropriate dashboard after logging in through Google.

### **Error Handling**:
All routes return appropriate error messages if required data is missing or if any operation fails. The status codes are aligned with standard REST practices (e.g., `404 Not Found`, `400 Bad Request`, `500 Internal Server Error`).

---

This API documentation provides a summary of the routes, their methods, and expected inputs/outputs. You can expand upon it as needed for each endpoint, especially adding more detailed validation and response examples.
