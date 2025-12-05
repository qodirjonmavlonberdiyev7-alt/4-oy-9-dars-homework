const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

const getAllFoods = async (req, res) => {
  try {
    const foods = read_file("fast-food.json");
    res.status(200).render("index", { foods });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const food = read_file("fast-food.json");

    food.push({
      id: v4(),
      name,
      price,
      description,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    });

    write_file("fast-food.json", food);
    res.status(302).redirect("http://localhost:4001/get_all_foods");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = read_file("fast-food.json");

    const foundedFood = foods.find((food) => food.id === id);

    if (!foundedFood) {
      return res.status(302).redirect("http://localhost:4001/get_all_foods");
    }

    res.status(200).render("details", { foundedFood });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const foods = read_file("fast-food.json");

    const foundedFood = foods.find((food) => food.id === id);

    if (!foundedFood) {
      return res.status(302).redirect("http://localhost:4001/get_all_foods");
    }

    foods.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.description = description ? description : item.description;
        item.price = price ? price : item.price;
      }
    });

    write_file("fast-food.json", foods);
    res.status(302).redirect("http://localhost:4001/get_all_foods");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = read_file("fast-food.json");

    const foundedFood = foods.find((food) => food.id === id);

    if (!foundedFood) {
      return res.status(302).redirect("http://localhost:4001/get_all_foods");
    }

    foods.forEach((item, idx) => {
      if (item.id === id) {
        foods.splice(idx, 1);
      }
    });

    write_file("fast-food.json", foods);
    res.status(302).redirect("http://localhost:4001/get_all_foods");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
    
    }
  }


module.exports = {
  getAllFoods,
  getOneFood,
  addFood,
  updateFood,
  deleteFood,
};
