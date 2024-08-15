# Rcorp Leads Filter

Developed with React and Node.js (Express)

## Installation

### 1. GitClone the repository
```bash
git clone https://github.com/Gasvn7/rcorp-leads.git
cd rcopr-leads
```

### 2. Import the Database
Navigate to the `backend/db` directory.
Import the `rcorpLeads.sql` file into your MySQL database.

### 3. Frontend(React)
```bash
cd frontend
npm install # or yarn install
```

### 4. Backend(Node.js with Express)
```bash
cd backend
npm install # or yarn install
```

## Running the Application

### 1. Start the Backend Server
In the backend directory, run:
```bash
npm start
```
The server will start in `http://localhost:5000/`

### 2. Start the Frontend Development Server
In the frontend directory, run:
```bash
npm start # or yarn start
```
The application will start in `http://localhost:3000/`

## Usage

- Navigate to `http://localhost:3000/` in your browser.
- Use the filters to narrow down the list of the leads.
- View and submit the data filtered in the table to download it as a CSV file.