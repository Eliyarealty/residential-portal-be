const Team = require("./team.model");

exports.createTeamMember = async ({
  name,
  email,
  contactNumber,
  position,
  imageUrl,
}) => {
  return await Team.create({ name, email, contactNumber, position, imageUrl });
};

exports.getAllTeamMembers = async () => {
  return await Team.findAll();
};
