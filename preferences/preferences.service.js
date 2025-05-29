// services/preferences.service.js
const Preferences = require("./preferences.model");

exports.createPreference = async (data) => {
  try {
    const [preference, created] = await Preferences.findOrCreate({
      where: { userId: data.userId },
      defaults: data,
    });

    if (!created) {
      // Preference already exists, so update it
      await preference.update(data);
    }

    return preference;
  } catch (error) {
    throw error;
  }
};

exports.getAllPreferences = async () => {
  try {
    return await Preferences.findAll();
  } catch (error) {
    throw error;
  }
};

exports.getPreferenceById = async (id) => {
  try {
    return await Preferences.findByPk(id);
  } catch (error) {
    throw error;
  }
};

exports.updatePreference = async (id, data) => {
  try {
    const preference = await Preferences.findByPk(id);
    if (!preference) return null;

    await preference.update(data);
    return preference;
  } catch (error) {
    throw error;
  }
};

exports.deletePreference = async (id) => {
  try {
    const preference = await Preferences.findByPk(id);
    if (!preference) return null;

    await preference.destroy();
    return preference;
  } catch (error) {
    throw error;
  }
};
