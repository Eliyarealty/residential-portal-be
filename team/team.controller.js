const teamService = require("./team.service");

exports.createTeamMember = async (req, res) => {
  try {
    const { name, email, contactNumber, position } = req.body;

    // Check if the image file is present
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const teamMember = await teamService.createTeamMember({
      name,
      email,
      contactNumber,
      position,
      imageUrl: req.file.path, // CloudinaryStorage provides the URL in req.file.path
    });

    res.status(201).json({ message: "Team member added", data: teamMember });
  } catch (err) {
    console.error("Create team member error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const members = await teamService.getAllTeamMembers();
    res.status(200).json({ data: members });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving team members", error: err.message });
  }
};
