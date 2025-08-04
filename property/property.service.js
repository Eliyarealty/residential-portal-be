const { Op, literal } = require("sequelize");
const Property = require("./property.model");
const UserProperty = require("../usersProperty/property.model");
const User = require("../user/user.model");
const Users = require("../users/users.model");

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
      { city: { [Op.like]: `%${search}%` } }, // Use Op.like for MySQL
      { location: { [Op.like]: `%${search}%` } },
      { adTitle: { [Op.like]: `%${search}%` } },
    ];
  }

  // Purpose filter
  if (purpose && purpose.toLowerCase() !== "any") {
    if (purpose.toLowerCase() === "rent") {
      where.purpose = "rent";
    } else if (purpose.toLowerCase() === "buy") {
      where.purpose = { [Op.in]: ["sell", "sale"] };
    }
  }

  // Property Type filter
  if (propertyType && propertyType.toLowerCase() !== "any") {
    const normalizedType = propertyType.toLowerCase();
    if (normalizedType === "commercials") {
      where.propertyType = "Commercials";
    } else if (normalizedType === "new projects") {
      where.propertyType = "New Projects";
    } else {
      where.propertyType = { [Op.like]: propertyType }; // Use Op.like for MySQL
    }
  }

  // Bedrooms
  if (bedrooms && !isNaN(parseInt(bedrooms))) {
    where.bedrooms = parseInt(bedrooms); // Ensure numeric value
  }

  // Bathrooms
  if (bathrooms && !isNaN(parseInt(bathrooms))) {
    where.bathrooms = parseInt(bathrooms); // Ensure numeric value
  }

  // Fetch from both models
  const [properties, userProperties] = await Promise.all([
    Property.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["isAgent"],
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
    UserProperty.findAll({
      where,
      include: [
        {
          model: User,
          as: "userEntity",
          attributes: ["isAgent"],
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
  ]);

  // Combine and return as single list
  return [...properties, ...userProperties];
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
    // Fetch 3 latest from Property model
    const propertiesA = await Property.findAll({
      include: [{ model: User, attributes: ["isAgent"] }],
      order: [
        [
          literal("GREATEST(`Property`.`createdAt`, `Property`.`updatedAt`)"),
          "DESC",
        ],
      ],
      limit: 3,
    });

    // Fetch 3 latest from userProperty model
    const propertiesB = await UserProperty.findAll({
      include: [{ model: Users }],
      order: [
        [
          literal(
            "GREATEST(`userProperty`.`createdAt`, `userProperty`.`updatedAt`)"
          ),
          "DESC",
        ],
      ],
      limit: 3,
    });

    // Combine and sort all by updatedAt/createdAt
    const combined = [...propertiesA, ...propertiesB].sort((a, b) => {
      const aTime = new Date(
        Math.max(new Date(a.createdAt), new Date(a.updatedAt))
      );
      const bTime = new Date(
        Math.max(new Date(b.createdAt), new Date(b.updatedAt))
      );
      return bTime - aTime; // Descending
    });

    // Return top 3
    return combined.slice(0, 3);
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
