const { Op } = require("sequelize");
const Property = require("./property.model");
const User = require("../user/user.model");
const { literal } = require("sequelize");

exports.createProperty = async (data) => {
  return await Property.create(data);
};

exports.getAllProperties = async () => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["isAgent"],
          required: false,
        },
      ],
    });
    return properties;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};

exports.getProperties = async (filters) => {
  const { search, purpose, propertyType, bedrooms, bathrooms } = filters;

  const where = {};

  // Search filter
  if (search) {
    where[Op.or] = [
      { city: { [Op.like]: `%${search}%` } },
      { location: { [Op.like]: `%${search}%` } },
      { adTitle: { [Op.like]: `%${search}%` } },
    ];
  }

  // Purpose filter (for buy, match sell/sale)
  if (purpose && purpose.toLowerCase() !== "any") {
    if (purpose.toLowerCase() === "rent") {
      where.purpose = "rent";
    } else if (purpose.toLowerCase() === "buy") {
      where.purpose = { [Op.in]: ["sell", "sale"] };
    }
  }

  // Property Type filter
  if (propertyType && propertyType.toLowerCase() !== "any") {
    if (propertyType.toLowerCase() === "commercials") {
      where.propertyType = "Commercials";
    } else if (propertyType.toLowerCase() === "new projects") {
      where.propertyType = "New Projects";
    } else {
      where.propertyType = propertyType;
    }
  }

  // Bedrooms
  if (bedrooms) {
    where.bedrooms = bedrooms;
  }

  // Bathrooms
  if (bathrooms) {
    where.bathrooms = bathrooms;
  }

  // Fetch from DB
  const properties = await Property.findAll({
    where,
    include: [
      {
        model: User,
        attributes: ["isAgent"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return properties;
};

exports.getPropertyById = async (id) => {
  return await Property.findByPk(id);
};

exports.updateProperty = async (id, data) => {
  const property = await Property.findByPk(id);
  if (!property) return null;
  await property.update(data);
  return property;
};

exports.deleteProperty = async (id) => {
  const property = await Property.findByPk(id);
  if (!property) return false;
  await property.destroy();
  return true;
};

exports.getLatestProperties = async () => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["isAgent"],
        },
      ],
      order: [
        [
          literal("GREATEST(`Property`.`createdAt`, `Property`.`updatedAt`)"),
          "DESC",
        ],
      ],
      limit: 3,
    });

    return properties;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    throw error;
  }
};

exports.getPropertyMetrics = async () => {
  // Total number of properties
  const totalProperties = await Property.count();

  // Number of properties for sale (including "sell" as equivalent to "sale")
  const saleProperties = await Property.count({
    where: {
      purpose: {
        [Op.in]: ["sale", "sell"],
      },
    },
  });

  // Number of properties for rent
  const rentProperties = await Property.count({
    where: {
      purpose: "rent",
    },
  });

  const metrics = {
    totalProperties,
    saleProperties,
    rentProperties,
  };

  return metrics;
};
