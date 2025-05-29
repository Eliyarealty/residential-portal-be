const listingService = require("./listing.service");

exports.createListing = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.path;

    const result = await listingService.createListing(data);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to create listing",
      result: error.message,
    });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const result = await listingService.getAllListings();
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch listings",
      result: error.message,
    });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const result = await listingService.getListingById(req.params.id);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch listing",
      result: error.message,
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.path;

    const result = await listingService.updateListing(req.params.id, data);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to update listing",
      result: error.message,
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const result = await listingService.deleteListing(req.params.id);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to delete listing",
      result: error.message,
    });
  }
};
