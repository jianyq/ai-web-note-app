
# AI Web Note App

This repository contains the source code for the AI Web Note App, a note-taking application enhanced with AI features. The project is divided into two main parts:

- **Backend**: Built with Node.js, Express, and SQLite.
- **Frontend**: Built with React.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org/)

## Getting Started

Follow the steps below to set up and run the application.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/yourusername/ai-web-note-app.git
cd ai-web-note-app
```

### 2. Set Up the Backend

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   In the `server` folder, create a file named `.env` and add the following:

   ```env
   PORT=8001
   ```

4. **Start the backend server:**

   ```bash
   npm run dev
   ```

   The backend server should now be running at [http://localhost:5000](http://localhost:5000).

### 3. Set Up the Frontend

1. **Open a new terminal window/tab and navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**

   ```bash
   npm start
   ```

   The frontend app should open automatically in your browser at [http://localhost:3000](http://localhost:3000).

### 4. Using the Application

- **Creating Notes:** Use the form at the top of the page to create a new note.
- **Editing Notes:** Click the "Edit" button next to a note to load it into the form. Make changes and submit to update.
- **Deleting Notes:** Click the "Delete" button next to a note to remove it.
- **Data Refresh:** The note list refreshes automatically after each operation.

### 5. Running Tests (Optional)

If tests are configured, you can run them as follows:

- **Backend Tests:**

  ```bash
  npm run test
  ```

- **Frontend Tests:**

  ```bash
  npm run test
  ```

## Troubleshooting

- **Node.js & npm:** Ensure they are installed and updated.
- **Server Running:** The backend server must be running before you start the frontend.
- **CORS Issues:** If you encounter CORS issues, verify that CORS is enabled in the backend (it is set up by default in the provided code).

## Additional Information

- The backend uses SQLite, and the database file (`database.sqlite`) is created automatically in the `server` directory.
- The React frontend uses a proxy (configured in `client/package.json`) to forward API requests to the backend.
- For more details on the project structure or to contribute, please refer to additional documentation in the repo.

---

Happy coding!
