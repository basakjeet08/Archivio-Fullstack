# Archivio-Fullstack

**Archivio-Fullstack** is a comprehensive Library Management System designed to streamline the process of managing library resources. This full-stack application integrates a user-friendly frontend with a robust backend, offering features such as book cataloging, user management, and transaction tracking.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Demo


## Features

- **Book Cataloging:** Efficiently add, update, and remove books from the library's collection.
- **User Management:** Handle library member registrations, profiles, and permissions.
- **Transaction Tracking:** Monitor book borrowings, returns, and overdue items.
- **Role Based Access Control:** A role based access control is maintained with ADMIN > LIBRARIAN > MEMBER  as the hierarchy

## Technologies Used

- **Frontend:**
  - [Angular](https://angular.io/): A platform for building mobile and desktop web applications.
  - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5): Markup language for structuring web content.
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS): Style sheet language for designing web pages.
  - [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing.

- **Backend:**
  - [Spring Boot](https://spring.io/projects/spring-boot): A framework for building production-ready Java applications.
  - [PostgreSQL](https://www.postgresql.org/): An advanced open-source relational database system.

- **Deployment:**
  - [Vercel](https://vercel.com/): A platform for frontend frameworks and static sites.
  - [Render](https://render.com/): A unified cloud to build and run all your apps.

## Installation

To set up Archivio-Fullstack locally using docker compose file, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/basakjeet08/Archivio-Fullstack.git
   ```

2. **Build the Docker File:**

    ```bash
    docker-compose build
    ```

3. **Run the docker containers in detach mode:**

    ```bash
    docker-compose up -d
    ```

### What Happens After Running these Commands?

- This will start three containers: one for PostgreSQL, one for the Spring Boot application, and one for the Angular frontend application.

- The setup is configured for a local development environment, so all the necessary database URLs and Spring Boot connections are automatically handled, making it easy to get started without manual configuration.

### Post-Installation

- Once the containers are up and running, navigate to the frontend at `http://127.0.0.1:5000` to start using the application.

- For the backend, you can access it through `http://localhost:8080`.

- The application will be running locally, and the database will be connected automatically.

## Spring Boot API Documentation

Firstly you have to create a Admin User to gain access to the feature of the Management side. To do that simply hit this url `http://localhost:8080/register/admin` with the request body as 
  ```
  {
    "name" : "Anirban",
    "email" : "admin@gmail.com",
    "password" : "admin"
  }
  ```
Now you would be able to login using the Admin account and then create librarians and explore the app as both librarian or normal users.

## Role-Based Access and Permissions

**Archivio-Fullstack** follows a role-based access control (RBAC) system, ensuring each user has appropriate access based on their role. The hierarchy of roles is as follows:

### 1. **Admin**
   - **Permissions:**
     - The Admin has the highest level of access in the system.
     - Admin can manage the system settings, including adding and removing **Librarians**.
     - Admin can view statistics for both Librarians and Members.


### 2. **Librarian**
   - **Permissions:**
     - **Librarians** have a more limited set of permissions compared to Admins but still hold significant authority within the system.
     - Librarians can create, update, and delete books in the library catalog.
     - Librarians can view the details of all the books in the catalog and approve or reject book requests made by **Members**.
     - Librarians can approve or deny a **Member's** request to borrow a book, ensuring the availability and appropriateness of the requests.


### 3. **Member**
   - **Permissions:**
     - **Members** have the most limited access, allowing them to interact primarily with the book catalog and request books.
     - Members cannot modify book details, but they can **request** books for borrowing.
     - The requests made by **Members** are subject to approval or rejection by **Librarians**.


### Access Control Hierarchy:
- **Admin** has access to all management functions and can create or delete **Librarians**.
- **Librarians** can manage the books in the library, approve book requests, and manage requests.
- **Members** can only request books and view the book catalog.


## Author

- **Anirban Basak** - [GitHub](https://github.com/basakjeet08) | [LinkedIn](https://www.linkedin.com/in/anirban-basak-b96055249/)
  - Developer and creator of the **Archivio-Fullstack** project. Passionate about building efficient and scalable full-stack applications with a focus on user experience and system architecture.
