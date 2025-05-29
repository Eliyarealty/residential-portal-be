const Notification = require("./notification.model");

exports.getAllNotifications = async () => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });
    return notifications;
  } catch (error) {
    throw error;
  }
};

exports.markNotificationAsRead = async (agentEmail) => {
  try {
    const [updatedCount] = await Notification.update(
      { read: true },
      {
        where: {
          receiverEmail: agentEmail,
          read: false,
        },
      }
    );
    return updatedCount;
  } catch (error) {
    throw error;
  }
};
