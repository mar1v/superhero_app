# 🦸‍♂️ Superheroes CRUD App

A full-stack web application for managing a superheroes database.  
It supports **CRUD operations**, **pagination**, **detailed view**, and adding/removing images.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Zod (validation), Jest (testing)
- **Frontend**: React + TypeScript, Vite
- **Styling**: TailwindCSS
- **Other**: dotenv, cors, axios

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/mar1v/superheroes_app.git
cd superhero_app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a **`.env`** file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. Run Backend

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

### 4. Seed Database (optional)

```bash
npm run seed
```

Populates database with initial superheroes.

### 5. Run Tests

```bash
npm test          # Run tests once
npm run test:watch  # Run tests in watch mode
```

Tests located in `__tests__/` folder with Jest.

### 6. Frontend Setup

```bash
cd ../frontend
npm install
```

### 7. Run Frontend

```bash
npm run dev
```

Frontend at `http://localhost:5173`.

---

## ✨ Features

- **Create / Edit / Delete superheroes** with Zod validation
- **Add / Remove superhero images** (URL-based)
- **Pagination** with auto-fallback to previous page on delete
- **Superhero details** view with full gallery
- **Responsive UI** with TailwindCSS

---

## 🏗️ Project Structure

```
superhero_app/
├── backend/
│   ├── __tests__/       # Jest tests
│   ├── controllers/     # Request handlers (functions)
│   ├── middleware/      # Error handling, validation (Zod)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic (functions)
│   ├── config.ts       # Configuration
│   └── server.ts       # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/        # API calls
    │   ├── components/ # React components
    │   ├── config.ts   # Configuration
    │   ├── pages/      # Page components
    │   └── App.tsx     # Root component
    └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint                         | Description         |
| ------ | -------------------------------- | ------------------- |
| GET    | `/api/superheroes`               | Get all (paginated) |
| GET    | `/api/superheroes/:id`           | Get one             |
| POST   | `/api/superheroes`               | Create              |
| PUT    | `/api/superheroes/:id`           | Update              |
| DELETE | `/api/superheroes/:id`           | Delete              |
| GET    | `/api/superheroes/search?q=name` | Search              |

---

## 💡 Key Architecture Decisions

- **No Context API**: Frontend uses `useState` for simpler state management
- **Functional Approach**: No classes - only functions in backend
- **Zod Validation**: Type-safe schema validation
- **AppError Class**: Consistent error handling with status codes
- **localStorage**: Preserves pagination state on navigation

---

## 🔮 Assumptions

- Authentication is **not required**
- Images stored as **URL links**
- Pagination: **5 items per page**
- All timestamps managed by MongoDB
