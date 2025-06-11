const buyService = require("./buy.service");

exports.createBuy = async (req, res) => {
  try {
    const data = req.body;
    const result = await buyService.createBuy(data);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to create buy request",
      result: error.message,
    });
  }
};

exports.getAllBuys = async (req, res) => {
  try {
    const result = await buyService.getAllBuys();
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch buy requests",
      result: error.message,
    });
  }
};

exports.getBuyById = async (req, res) => {
  try {
    const result = await buyService.getBuyById(req.params.id);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch buy request",
      result: error.message,
    });
  }
};

exports.updateBuy = async (req, res) => {
  try {
    const data = req.body;
    const result = await buyService.updateBuy(req.params.id, data);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to update buy request",
      result: error.message,
    });
  }
};

exports.deleteBuy = async (req, res) => {
  try {
    const result = await buyService.deleteBuy(req.params.id);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to delete buy request",
      result: error.message,
    });
  }
};
