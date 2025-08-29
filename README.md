# 🦸‍♂️ Superheroes CRUD App

A full-stack web application for managing a superheroes database.  
It supports **CRUD operations**, **pagination**, **detailed view**, and adding/removing images.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React + Context API (hooks)
- **Styling**: TailwindCSS
- **Other**: dotenv, cors

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/mar1v/superheroes_app.git
cd superheroes_app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a **`.env`** file in the backend folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.

### 3. Run Backend

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

### 4. Seed the Database

```bash
node seed.js
```

This will populate the database with initial superheroes:

- Superman
- Batman
- Wonder Woman
- Spider-Man
- Iron Man

---

### 5. Frontend Setup

```bash
cd frontend
npm install
```

### 6. Run Frontend

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## ✨ Features

- **Create / Edit / Delete superheroes**
- **Add / Remove superhero images**
- **List superheroes with pagination (5 per page)**
- **View superhero details with full info and image gallery**
- **Responsive UI with TailwindCSS**

---

## 🔮 Assumptions

- Authentication/authorization is **not required**.
- Images are stored as **URL links**.
- Pagination is handled on the frontend (5 items per page).
