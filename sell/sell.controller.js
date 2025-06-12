const sellService = require("./sell.service");

exports.submitSellRequest = async (req, res) => {
  try {
    const { name, phone, email, propertyAddress } = req.body;

    if (!name || !phone || !email || !propertyAddress) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const newRequest = await sellService.createSellRequest({
      name,
      phone,
      email,
      propertyAddress,
    });

    res.status(201).json({
      status: true,
      message: "Sell request submitted",
      data: newRequest,
    });
  } catch (error) {
    console.error("Sell Request Error:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
