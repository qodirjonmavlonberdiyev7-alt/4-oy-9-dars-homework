const {Router} = require("express")
const { getAllFoods, getOneFood, addFood, updateFood, deleteFood } = require("../controller/fast-food.controller")

const foodRouter = Router()

foodRouter.get("/get_all_foods", getAllFoods)
foodRouter.get("/get_one_food/:id", getOneFood)
foodRouter.post("/add_food", addFood)
foodRouter.post("/update_food/:id", updateFood)
foodRouter.post("/delete_food/:id", deleteFood)

module.exports = foodRouter