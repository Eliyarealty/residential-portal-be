// const User = require("../user/user.model");
// const UserProfile = require("../userProfile/profile.model");
// const Users = require("../users/users.model");
// const UsersProfile = require("../usersProfile/profile.model");
// const Preferences = require("../preferences/preferences.model");

// // Associations
// User.hasOne(UserProfile, {
//   foreignKey: "userId",
//   as: "userProfile",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// UserProfile.belongsTo(User, {
//   foreignKey: "userId",
//   as: "user",
// });

// User.hasOne(Preferences, {
//   foreignKey: {
//     name: "userId",
//     allowNull: false,
//   },
//   onDelete: "CASCADE",
// });
// Preferences.belongsTo(User, {
//   foreignKey: "userId",
// });

// Users.hasOne(UsersProfile, {
//   foreignKey: "userId",
//   as: "profile",
// });

// UsersProfile.belongsTo(Users, {
//   foreignKey: "userId",
//   as: "user",
// });

// module.exports = {
//   User,
//   UserProfile,
//   Preferences,
// };

const User = require("../user/user.model");
const UserProfile = require("../userProfile/profile.model");
const Users = require("../users/users.model");
const UsersProfile = require("../usersProfile/profile.model");
const Preferences = require("../preferences/preferences.model");

module.exports = {
  User,
  UserProfile,
  Users,
  UsersProfile,
  Preferences,
};
