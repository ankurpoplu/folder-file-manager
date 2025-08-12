# Folder & File Manager App

## Features

- Create nested folders/files
- Rename/delete items
- Collapsible tree structure
- Preview file contents

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB

## Setup

### Backend

```bash
cd backend
npm install
node server.js

### Frontend

```bash
cd frontend
npm install
npm start

📦 Folder Schema

{
  name: String,
  type: "folder" | "file",
  content: String, // only for files
  parent: ObjectId | null
}
