const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/sequelize");

const app = express();
const PORT = process.env.PORT;

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      // "https://residential-portal-production.up.railway.app",
      "https://residential-portal-be-production.up.railway.app",
      // "http://localhost:3000",
      // "http://localhost:8000",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Import models to initialize associations
require("./models");

// ✅ Import routes
const userRoutes = require("./user/user.route");
const listingRoutes = require("./listing/listing.routes");
const profileRoutes = require("./userProfile/profile.routes");
const preferencesRoutes = require("./preferences/preferences.routes");
const propertyRoutes = require("./property/property.routes");
const emailRoutes = require("./email/email.routes");
const notificationRoutes = require("./notifications/notification.routes");
const blogRoutes = require("./blog/blog.routes");

// ✅ Use routes
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/listing", listingRoutes);
app.use("/api/v2/profile", profileRoutes);
app.use("/api/v2/preferences", preferencesRoutes);
app.use("/api/v2/property", propertyRoutes);
app.use("/api/v2/email", emailRoutes);
app.use("/api/v2/notification", notificationRoutes);
app.use("/api/v2/blog", blogRoutes);

// ✅ Default route for test
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running on Railway 🚀");
});

// ✅ Catch-all route for unmatched paths
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "❌ Route not found",
    url: req.originalUrl,
  });
});

// ✅ Global unhandled error catch
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// ✅ Connect to database and start server
console.log("🔄 Connecting to the database...");

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully.");
    return sequelize.sync(); // Use { alter: true } during dev if needed
  })
  .then(() => {
    console.log("✅ All models synchronized.");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect or sync to the database:", err);
  });
