const notificationService = require("./notification.service");

exports.getAllNotifications = async (req, res) => {
  try {
    const result = await notificationService.getAllNotifications();
    res.status(200).json({
      status: true,
      code: 200,
      message: "Notifications fetched successfully",
      result,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch notifications",
      result: null,
    });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { agentEmail } = req.body;

    if (!agentEmail) {
      return res.status(400).json({
        status: false,
        code: 400,
        message: "Agent email is required",
        result: null,
      });
    }

    const updatedCount = await notificationService.markNotificationAsRead(
      agentEmail
    );

    res.status(200).json({
      status: true,
      code: 200,
      message: `${updatedCount} notifications marked as read`,
      result: { updatedCount },
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};
