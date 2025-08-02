const {
  User,
  UserProfile,
  Preferences,
  Users,
  UsersProfile,
} = require("./index");

function defineAssociations() {
  // User ↔ UserProfile
  User.hasOne(UserProfile, {
    foreignKey: "userId",
    as: "profile",
  });
  UserProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // User ↔ Preferences
  User.hasOne(Preferences, {
    foreignKey: "userId",
    as: "preferences",
  });
  Preferences.belongsTo(User, {
    foreignKey: "userId",
    as: "userPreferences", // ✅ unique alias
  });

  // Users ↔ UsersProfile
  Users.hasOne(UsersProfile, {
    foreignKey: "userId",
    as: "profile",
  });
  UsersProfile.belongsTo(Users, {
    foreignKey: "userId",
    as: "usersEntity", // ✅ unique alias
  });
}

module.exports = defineAssociations;
