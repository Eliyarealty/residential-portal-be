const userProfileService = require("./profile.service");

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "User ID is required",
        result: null,
      });
    }

    const data = req.body;
    const file = req.file;

    const response = await userProfileService.updateUserProfile(
      userId,
      data,
      file
    );

    return res.status(response.code).json({
      code: response.code,
      status: response.status,
      message: response.message,
      result: response.result,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: error.message || "Internal server error",
      result: null,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await userProfileService.getUserProfileById(userId);

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      result: profile,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
