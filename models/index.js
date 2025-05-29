const User = require("../user/user.model");
const UserProfile = require("../userProfile/profile.model");
const Preferences = require("../preferences/preferences.model");

// Associations
User.hasOne(UserProfile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasOne(Preferences, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Preferences.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  UserProfile,
  Preferences,
};
