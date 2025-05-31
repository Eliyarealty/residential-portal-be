const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/sequelize");

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  cors({
    origin: ["https://residential-portal.vercel.app/", "http://localhost:3000"],
    credentials: true, // optional, if you're using cookies
  })
);
app.use(express.json());

// Import all models to initialize them and setup associations
require("./models"); // <-- This runs models/index.js, which sets up associations

// Import routes
const userRoutes = require("./user/user.route");
const listingRoutes = require("./listing/listing.routes");
const profileRoutes = require("./userProfile/profile.routes");
const preferencesRoutes = require("./preferences/preferences.routes");
const propertyRoutes = require("./property/property.routes");
const emailRoutes = require("./email/email.routes");
const notificationRoutes = require("./notifications/notification.routes");
const blogRoutes = require("./blog/blog.routes");

// Use routes
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/listing", listingRoutes);
app.use("/api/v2/profile", profileRoutes);
app.use("/api/v2/preferences", preferencesRoutes);
app.use("/api/v2/property", propertyRoutes);
app.use("/api/v2/email", emailRoutes);
app.use("/api/v2/notification", notificationRoutes);
app.use("/api/v2/blog", blogRoutes);

// Test DB connection and sync
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully.");
    return sequelize.sync(); // Use alter: true during development
  })
  .then(() => {
    console.log("✅ All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect or sync to the database:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
