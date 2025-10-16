import e from "express";
import * as controller from "./product.controller.js"
const router = e.Router()

router.get('/', controller.getProduct)
router.post('/', controller.createProduct)
router.get('/:id', controller.getProductByID)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

export default router

