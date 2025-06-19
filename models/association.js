// const User = require("../user/user.model");
// const UserProfile = require("../userProfile/profile.model");
// const Preferences = require("../preferences/preferences.model");

// function defineAssociations() {
//   // User to UserProfile (1:1)
//   User.hasOne(UserProfile, {
//     foreignKey: "userId",
//     as: "profile",
//   });
//   UserProfile.belongsTo(User, {
//     foreignKey: "userId",
//     as: "user",
//   });

//   // User to Preferences (1:1)
//   User.hasOne(Preferences, {
//     foreignKey: "userId",
//     as: "preferences", // Ensure unique alias
//   });
//   Preferences.belongsTo(User, {
//     foreignKey: "userId",
//     as: "user",
//   });
// }

// module.exports = defineAssociations;
