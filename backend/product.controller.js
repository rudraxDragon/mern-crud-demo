import mongoose from "mongoose";
import Product from "./product.model.js"


export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log('error in creation : ', error)
    res.status(500).json({ message: error.message })
  }
}

export const getProduct = async (req, res) => {
  try {
    const data = await Product.find({})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductByID = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Product.findById(id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const update = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!update) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json(update)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const _delete = await Product.findByIdAndDelete(id)
    res.status(200).json(_delete)
    if (!_delete) {
      return res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
