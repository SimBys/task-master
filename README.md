# Task Master

Task Master is a powerful todo list web application built using React with Material-UI (MUI).

### Features
- **Material-UI** for styling
- **react-router-dom** for routing
- **Local storage** for storing the todo list
- **GitHub API** for fetching the README.md file from the repository
- **Navigation bar** with **animation**
- **Sign up** and **log in** forms
- **Responsive design**

### Pages
- **Home (`/`):** Landing page - preview of the app, sign up, log in buttons
- **Dashboard (`/`):** Shown after logging in, contains the todo list
- **About (`/About`):** Displays the README.md file fetched from the GitHub repository
- **Log in (`/login`):** Log in form
- **Sign up (`/sign-up`):** Sign up form

### The todo list
- **Add task:** Add a new task to the list
- **Delete task:** Delete a task from the list
- **Un/complete task:** Mark a task as un/completed
- **Un/favorite task:** Mark a task as (not) favorite

## Development setup

Clone the repo and run `npm install` or `yarn install`.
Run `npm start` or `yarn start` to start the local development server, by default at localhost:3000

**Preview:**
![Todo preview image](public/Todo.png)