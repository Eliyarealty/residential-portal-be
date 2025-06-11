const db = require("./buy.model");
const Buy = db;

exports.createBuy = async (data) => {
  try {
    const buy = await Buy.create(data);
    return {
      status: true,
      code: 201,
      message: "Buy request created successfully",
      result: buy,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to create buy request",
      result: error.message,
    };
  }
};

exports.getAllBuys = async () => {
  try {
    const buys = await Buy.findAll();
    return {
      status: true,
      code: 200,
      message: "Buy requests fetched successfully",
      result: buys,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to fetch buy requests",
      result: error.message,
    };
  }
};

exports.getBuyById = async (id) => {
  try {
    const buy = await Buy.findByPk(id);
    if (!buy) {
      return {
        status: false,
        code: 404,
        message: "Buy request not found",
        result: null,
      };
    }
    return {
      status: true,
      code: 200,
      message: "Buy request retrieved successfully",
      result: buy,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to fetch buy request",
      result: error.message,
    };
  }
};

exports.updateBuy = async (id, data) => {
  try {
    const buy = await Buy.findByPk(id);
    if (!buy) {
      return {
        status: false,
        code: 404,
        message: "Buy request not found",
        result: null,
      };
    }
    await buy.update(data);
    return {
      status: true,
      code: 200,
      message: "Buy request updated successfully",
      result: buy,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to update buy request",
      result: error.message,
    };
  }
};

exports.deleteBuy = async (id) => {
  try {
    const buy = await Buy.findByPk(id);
    if (!buy) {
      return {
        status: false,
        code: 404,
        message: "Buy request not found",
        result: null,
      };
    }
    await buy.destroy();
    return {
      status: true,
      code: 200,
      message: "Buy request deleted successfully",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to delete buy request",
      result: error.message,
    };
  }
};
