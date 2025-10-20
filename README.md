# MERN CRUD Demo

A full-stack product management application demonstrating CRUD operations using the MERN stack (MongoDB, Express, React, Node.js) with a RESTful API.

## 🚀 Features

- ✅ **Create** products with name, quantity, and price
- 📖 **Read** all products in a table view
- ✏️ **Update** existing products by ID
- 🗑️ **Delete** products by ID
- 🎨 Clean and responsive UI
- 🔄 Real-time data synchronization with MongoDB

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## 📦 Project Structure

```
.
├── backend/
│   ├── server.js              # Express server setup
│   ├── product.model.js       # Mongoose schema
│   ├── product.controller.js  # CRUD controllers
│   └── products.router.js     # API routes
├── src/
│   ├── App.jsx               # Main React component
│   ├── main.jsx              # React entry point
│   └── style.css             # Styles
└── package.json
```

## 🏃 Running Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `backend/` folder:
```env
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root (optional for local dev):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product by ID |
| DELETE | `/api/products/:id` | Delete product by ID |

## 📝 API Request Examples

**Create Product:**
```json
POST /api/products
{
  "name": "Laptop",
  "qty": 10,
  "price": 999.99
}
```

**Update Product:**
```json
PUT /api/products/:id
{
  "name": "Laptop Pro",
  "qty": 5,
  "price": 1299.99
}
```

## 🚀 Deployment

This app is deployed on Render:
- **Frontend**: [Your frontend URL]
- **Backend API**: [Your backend URL]

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Your Name
- GitHub: [@rudraxDragon](https://github.com/rudraxDragon)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

⭐ Star this repo if you found it helpful!
