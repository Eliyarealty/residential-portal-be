const propertyService = require("./property.service");

exports.createProperty = async (req, res) => {
  try {
    // Log req.user to debug
    console.log("req.user:", req.user.userId);
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "User not authenticated",
      });
    }

    const propertyImages =
      req.files?.propertyImages?.map((file) => file.path) || [];
    const profileImage = req.files?.profileImage?.[0]?.path || null;

    const data = {
      ...req.body,
      userId: req.user.userId, // Add userId from token
      propertyImages,
      profileImage,
    };

    // Log data to debug
    console.log("Property data:", data);

    const property = await propertyService.createProperty(data);
    res.status(201).json({
      code: 201,
      status: "success",
      message: "Property created successfully",
      result: property,
    });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to create property",
      result: null,
    });
  }
};
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Properties fetched successfully",
      result: properties,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to fetch properties",
      result: null,
    });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const filters = req.query;
    const properties = await propertyService.getProperties(filters);

    res.status(200).json({
      status: true,
      code: 200,
      message: "Properties fetched successfully",
      result: properties,
    });
  } catch (error) {
    console.error("Error in controller getProperties:", error);
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch properties",
      result: null,
    });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Property not found",
        result: null,
      });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Property fetched successfully",
      result: property,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to fetch property",
      result: null,
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await propertyService.updateProperty(
      req.params.id,
      req.body
    );
    if (!property) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Property not found",
        result: null,
      });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Property updated successfully",
      result: property,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to update property",
      result: null,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await propertyService.deleteProperty(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Property not found",
        result: null,
      });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Property deleted successfully",
      result: null,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to delete property",
      result: null,
    });
  }
};

exports.getLatestProperties = async (req, res) => {
  try {
    const properties = await propertyService.getLatestProperties();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Latest properties fetched successfully",
      result: properties,
    });
  } catch (error) {
    console.error("Error in getLatestProperties:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Failed to fetch latest properties",
      result: null,
    });
  }
};
