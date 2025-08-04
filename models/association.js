const {
  User,
  UserProfile,
  Preferences,
  Users,
  UsersProfile,
} = require("./index");
const UserProperty = require("../usersProperty/property.model");

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

  Users.hasMany(UserProperty, {
    foreignKey: "userId",
    as: "userProperties", // choose alias meaningfully
  });
  UserProperty.belongsTo(Users, {
    foreignKey: "userId",
    as: "userEntity", // this alias should match your include
  });
}

module.exports = defineAssociations;
