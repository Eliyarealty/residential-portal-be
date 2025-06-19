const UserProfile = require("./profile.model");
const User = require("../user/user.model");

exports.updateUserProfile = async (userId, data, file) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      landlineNumber,
      whatsappNumber,
      city,
      address,
      updateInListings,
    } = data;

    if (!name || !email) {
      return {
        code: 400,
        status: "error",
        message: "Name and email are required",
        result: null,
      };
    }

    // Update the User model (basic user table)
    await User.update(
      {
        fullname: name,
        email: email,
        phone: mobileNumber || null,
      },
      { where: { id: userId } }
    );

    let userProfile = await UserProfile.findOne({ where: { userId } });

    if (!userProfile) {
      // Create new profile if not exists
      userProfile = await UserProfile.create({
        userId,
        name,
        email,
        mobileNumber,
        landlineNumber,
        whatsappNumber,
        city,
        address,
        updateInListings:
          updateInListings === "true" || updateInListings === true,
        profilePicture: file ? file.path : null,
      });
    } else {
      // Merge new data with existing data
      await userProfile.update({
        name: name || userProfile.name,
        email: email || userProfile.email,
        mobileNumber: mobileNumber || userProfile.mobileNumber,
        landlineNumber: landlineNumber || userProfile.landlineNumber,
        whatsappNumber: whatsappNumber || userProfile.whatsappNumber,
        city: city || userProfile.city,
        address: address || userProfile.address,
        updateInListings:
          updateInListings === undefined
            ? userProfile.updateInListings
            : updateInListings === "true" || updateInListings === true,
        profilePicture: file ? file.path : userProfile.profilePicture,
      });
    }

    return {
      code: 200,
      status: "success",
      message: "User and profile updated successfully",
      result: userProfile,
    };
  } catch (error) {
    return {
      code: 500,
      status: "error",
      message: error.message || "Internal server error",
      result: null,
    };
  }
};

exports.getUserProfileById = async (userId) => {
  try {
    const profile = await UserProfile.findOne({
      where: { userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullname", "email", "phone"],
        },
      ],
    });

    return profile;
  } catch (error) {
    throw error;
  }
};
