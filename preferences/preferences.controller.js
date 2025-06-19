// controllers/preferences.controller.js
const preferenceService = require("./preferences.service");

exports.createPreference = async (req, res) => {
  try {
    const preference = await preferenceService.createPreference(req.body);

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preference created or updated successfully",
      result: preference,
    });
  } catch (error) {
    console.error("Error creating or updating preference:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.getAllPreferences = async (req, res) => {
  try {
    const preferences = await preferenceService.getAllPreferences();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preferences fetched successfully",
      result: preferences,
    });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.getPreferenceByUserId = async (req, res) => {
  try {
    const preference = await preferenceService.getPreferenceByUserId(
      req.params.userId
    );
    if (!preference) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Preference not found for user",
        result: null,
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preference fetched successfully",
      result: preference,
    });
  } catch (error) {
    console.error("Error fetching preference by userId:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.getPreferenceById = async (req, res) => {
  try {
    const preference = await preferenceService.getPreferenceById(req.params.id);
    if (!preference) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Preference not found",
        result: null,
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preference fetched successfully",
      result: preference,
    });
  } catch (error) {
    console.error("Error fetching preference:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.updatePreference = async (req, res) => {
  try {
    const updated = await preferenceService.updatePreference(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Preference not found",
        result: null,
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preference updated successfully",
      result: updated,
    });
  } catch (error) {
    console.error("Error updating preference:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.deletePreference = async (req, res) => {
  try {
    const deleted = await preferenceService.deletePreference(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Preference not found",
        result: null,
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Preference deleted successfully",
      result: deleted,
    });
  } catch (error) {
    console.error("Error deleting preference:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};
