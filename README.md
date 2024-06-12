# User List CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application for managing a user list. The application includes authentication functionality (login and registration) and uses a fake API for backend operations. This project was developed as part of my task as a Junior Angular Developer.

## Features

- User Authentication: Login and Register functionality.
- User Management: Add, Edit, Delete, and View Users.
- Four forms:
  - Login Form
  - Register Form
  - Add User Form
  - Edit User Form
- Reactive Forms used for Login, Register.
- Template-driven Form used for Edit User form ,Add User forms.
- User Interface styled with Bootstrap.

## Fake API Limitation

The fake API used in this project has a limitation where the DELETE, PUT, and POST methods do not reflect immediately in the GET requests for the user list. To address this, local state management is used to handle the changes locally. The state of the application will be consistent with the actions performed by the user, even if the fake API responses do not update accordingly.

## Technologies Used

- Angular
- Bootstrap
- Reactive Forms
- Template-driven Forms

## Installation

1. Clone the repository:

   bash
   git clone <repository-url>
   cd <repository-directory>
   npm install
   npm install
   The application will be accessible at http://localhost:4200.

   ## Usage

1. _Login_:

   - Navigate to the Login page.
   - Enter your credentials to log in.
   - _Note_: Use the following credentials for login:
     - Email: eve.holt@reqres.in
     - Password: pistol

1. _Register_:

   - Navigate to the Register page.
   - Fill in the required fields to create a new account.
   - _Note_: Use the following credentials for registration:
     - Email: eve.holt@reqres.in
     - Password: pistol

1. _User Management_:
   - View the list of users on the User List page.
   - Add a new user using the Add User form.
   - Edit an existing user using the Edit User form.
   - Delete a user from the list.

## Known Issues

As mentioned, the fake API does not update the user list upon DELETE, PUT, and POST requests. To handle this, the application manages the state locally to reflect the changes immediately. This approach is used to ensure a smooth user experience during the CRUD operations.

## Comments

- The Login and Register forms are implemented using Reactive Forms to ensure robust form handling and validation.
- The Add User form is implemented using Template-driven Form for consistency and ease of management.
- The Edit User form is implemented using a Template-driven Form to demonstrate flexibility in form handling techniques.
- Bootstrap is used to create a responsive and visually appealing user interface.

## Conclusion

This project demonstrates a basic CRUD application with user authentication and form handling in Angular. It showcases the use of Reactive Forms, Template-driven Forms, Bootstrap for UI, and FontAwesome for icons. Despite the limitations of the fake API, the application effectively manages state locally to ensure accurate reflection of user actions.

---

Thank you for reviewing my project. Please feel free to reach out with any questions or feedback.
