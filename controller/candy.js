const Candy = require("../model/candy");

exports.getCandy = async (req, res) => {
  try {
    const candies = await Candy.findAll();
    res.status(200).json(candies);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postCandy = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;
  try {
    const response = await Candy.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.putCandy = async (req, res) => {
  const amount = req.params.amount;
  const id = req.params.id;
  const candy = await Candy.findByPk(id);
  if (candy.quantity <= 0) {
    return res.status(500).json({ err: "Stock not available" });
  }
  candy.quantity = candy.quantity - amount;
  candy.save();
  res.status(200).json(candy);
};
