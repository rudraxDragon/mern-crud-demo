import e from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import routes from "./products.router.js"
dotenv.config()

const app = e()

app.use(cors())
app.use(e.json())
app.use('/api/products', routes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('db connected')
    app.listen(5000, () => {
      console.log('express server listening on port 5000')
    })
  })
  .catch(error => console.log('db failled to connect: ', error))
