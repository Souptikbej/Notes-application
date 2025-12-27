# 📝 Notes Application (MERN Stack)

A full‑stack **Notes Application** built using the **MERN stack**. This project allows users to create, view, update, and delete notes with a clean, responsive, and animated user interface. It demonstrates real‑world CRUD operations, RESTful API design, and modern frontend practices suitable for **portfolio and academic submission**.

---

## 🚀 Live Demo
🔗 https://notes-application-rifc.onrender.com

---

## 📌 Key Features

- Create, read, update, and delete notes (CRUD)
- RESTful API with clean route separation
- Responsive UI (mobile, tablet, desktop)
- Modern UI with Tailwind CSS
- Page transitions and micro‑interactions using Framer Motion
- Graceful handling of empty states and errors
- Clean project structure (frontend & backend separated)
- Suitable for portfolio and college evaluation

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Tools & Deployment
- Git & GitHub
- Render (deployment)
- VS Code

---

## 📁 Project Structure

```
Notes-application/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── README.md
└── package.json
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/notes | Fetch all notes |
| GET | /api/notes/:id | Fetch single note |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Souptikbej/Notes-application.git
cd Notes-application
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## 🎨 UI & UX Highlights

- Animated page transitions
- Gradient text with shimmer effects
- Loading and empty state handling
- Clean card‑based note layout
- Mobile‑first responsive design

---

## 🎓 What I Learned

- Building a full‑stack MERN application
- Designing REST APIs with Express
- State management and routing in React
- Frontend‑backend integration using Axios
- Handling errors and edge cases gracefully
- Using animations to enhance user experience
- Structuring production‑ready projects

---

## 📈 Future Enhancements

- User authentication (JWT)
- Search and filter notes
- Tag‑based note organization
- Dark / Light theme toggle
- Pagination and performance optimization

---

## 👨‍💻 Author

**Souptik Bej**  
B.Tech (AIML) Student  
Backend & MERN Stack Developer

🔗 GitHub: https://github.com/Souptikbej

---

## ⭐ Acknowledgements

This project was built as part of a **college project / portfolio** to demonstrate full‑stack development skills using modern web technologies.

If you find this project helpful, feel free to ⭐ the repository.