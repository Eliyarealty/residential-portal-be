// services/sellService.js
const SellRequest = require("./sell.model");

exports.createSellRequest = async (data) => {
  return await SellRequest.create(data);
};
