const db = require("./listing.model");
const Listing = db;

exports.createListing = async (data) => {
  try {
    const listing = await Listing.create(data);
    return {
      status: true,
      code: 201,
      message: "Listing created successfully",
      result: listing,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to create listing",
      result: error.message,
    };
  }
};

exports.getAllListings = async () => {
  try {
    const listings = await Listing.findAll();
    return {
      status: true,
      code: 200,
      message: "Listings fetched successfully",
      result: listings,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to fetch listings",
      result: error.message,
    };
  }
};

exports.getListingById = async (id) => {
  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return {
        status: false,
        code: 404,
        message: "Listing not found",
        result: null,
      };
    }
    return {
      status: true,
      code: 200,
      message: "Listing retrieved successfully",
      result: listing,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to fetch listing",
      result: error.message,
    };
  }
};

exports.updateListing = async (id, data) => {
  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return {
        status: false,
        code: 404,
        message: "Listing not found",
        result: null,
      };
    }
    await listing.update(data);
    return {
      status: true,
      code: 200,
      message: "Listing updated successfully",
      result: listing,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to update listing",
      result: error.message,
    };
  }
};

exports.deleteListing = async (id) => {
  try {
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return {
        status: false,
        code: 404,
        message: "Listing not found",
        result: null,
      };
    }
    await listing.destroy();
    return {
      status: true,
      code: 200,
      message: "Listing deleted successfully",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      code: 500,
      message: "Failed to delete listing",
      result: error.message,
    };
  }
};
