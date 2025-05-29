const Email = require("./email.model");
const Notification = require("../notifications/notification.model");
const User = require("../user/user.model");

exports.createEmail = async (data) => {
  try {
    // Validate input data
    if (!data.senderEmail || !data.senderName || !data.receiverEmail) {
      console.error("Validation Error: Missing required fields", {
        senderEmail: data.senderEmail,
        senderName: data.senderName,
        receiverEmail: data.receiverEmail,
      });
      return {
        status: "error",
        code: 400,
        message:
          "Missing required fields: senderEmail, senderName, or receiverEmail",
      };
    }

    // Create the email
    const newEmail = await Email.create(data);
    console.log("Email created successfully:", newEmail.toJSON());

    // Find the receiver by email
    const receiver = await User.findOne({
      where: { email: data.receiverEmail },
      attributes: ["id", "fullname", "email", "isAgent"], // Select relevant fields
    });

    if (!receiver) {
      console.warn("Receiver not found for email:", data.receiverEmail);
      return {
        status: "success",
        code: 201,
        message: "Email created successfully, but receiver not found in users",
        result: newEmail,
      };
    }

    console.log("Receiver found:", {
      id: receiver.id,
      fullname: receiver.fullname,
      email: receiver.email,
      isAgent: receiver.isAgent,
    });

    // Check if the receiver is an agent
    if (receiver.isAgent) {
      try {
        const notificationMessage = `You sent an email to Agent ${receiver.fullname} regarding your inquiry.`;
        const notification = await Notification.create({
          senderEmail: data.senderEmail,
          senderName: data.senderName,
          receiverEmail: data.receiverEmail,
          notificationMessage,
        });
        console.log(
          "Notification created successfully:",
          notification.toJSON()
        );
      } catch (notificationError) {
        console.error(
          "Notification Creation Error:",
          notificationError.message
        );
        // Continue with email creation success, but log notification failure
        return {
          status: "success",
          code: 201,
          message:
            "Email created successfully, but failed to create notification",
          result: newEmail,
        };
      }
    } else {
      console.log("Receiver is not an agent, skipping notification creation.");
    }

    return {
      status: "success",
      code: 201,
      message: "Email created successfully",
      result: newEmail,
    };
  } catch (error) {
    console.error("Create Email Error:", {
      message: error.message,
      stack: error.stack,
      data,
    });
    return {
      status: "error",
      code: 500,
      message: "Failed to create email",
      error: error.message,
    };
  }
};
exports.getAllEmails = async () => {
  try {
    const emails = await Email.findAll();
    return {
      status: "success",
      code: 200,
      message: "Emails fetched successfully",
      result: emails,
    };
  } catch (error) {
    console.error("Get All Emails Error:", error.message);
    throw new Error("Failed to fetch emails");
  }
};

exports.getEmailById = async (id) => {
  try {
    const email = await Email.findByPk(id);
    if (!email) {
      const error = new Error("Email not found");
      error.status = 404;
      throw error;
    }
    return {
      status: "success",
      code: 200,
      message: "Email fetched successfully",
      result: email,
    };
  } catch (error) {
    console.error("Get Email By ID Error:", error.message);
    throw error;
  }
};

exports.updateEmail = async (id, data) => {
  try {
    const email = await Email.findByPk(id);
    if (!email) {
      const error = new Error("Email not found");
      error.status = 404;
      throw error;
    }

    await email.update(data);

    return {
      status: "success",
      code: 200,
      message: "Email updated successfully",
      result: email,
    };
  } catch (error) {
    console.error("Update Email Error:", error.message);
    throw error;
  }
};

exports.deleteEmail = async (id) => {
  try {
    const email = await Email.findByPk(id);
    if (!email) {
      const error = new Error("Email not found");
      error.status = 404;
      throw error;
    }

    await email.destroy();

    return {
      status: "success",
      code: 200,
      message: "Email deleted successfully",
      result: email,
    };
  } catch (error) {
    console.error("Delete Email Error:", error.message);
    throw error;
  }
};
