const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
});
// const defineAssociations = require("./models/association");
const sequelize = require("./config/sequelize");

const app = express();
const PORT = process.env.PORT || 5000; // fallback to 5000 if undefined

// ✅ CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : ["https://residential-portal-production.up.railway.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Import models to initialize associations
require("./models");
const defineAssociations = require("./models/associations");
defineAssociations();

// ✅ Import routes
const adminRoutes = require("./user/user.route");
const listingRoutes = require("./listing/listing.routes");
const profileRoutes = require("./userProfile/profile.routes");
const preferencesRoutes = require("./preferences/preferences.routes");
const propertyRoutes = require("./property/property.routes");
const emailRoutes = require("./email/email.routes");
const notificationRoutes = require("./notifications/notification.routes");
const blogRoutes = require("./blog/blog.routes");
const buyRoutes = require("./buy/buy.route");
const teamRoutes = require("./team/team.route");
const authRoutes = require("./auth/auth.route");
const sellRoute = require("./sell/sell.routes");
const emailSentRoutes = require("./emailSent/email.routes");
const userRoutes = require("./users/users.route");
const usersProfileRoutes = require("./usersProfile/profile.routes");
const usersPropertyRoutes = require("./usersProperty/property.routes");

// ✅ Use routes
app.use("/api/v2/user", adminRoutes);
app.use("/api/v2/listing", listingRoutes);
app.use("/api/v2/profile", profileRoutes);
app.use("/api/v2/preferences", preferencesRoutes);
app.use("/api/v2/property", propertyRoutes);
app.use("/api/v2/email", emailRoutes);
app.use("/api/v2/notification", notificationRoutes);
app.use("/api/v2/blog", blogRoutes);
app.use("/api/v2/buy", buyRoutes);
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/team", teamRoutes);
app.use("/api/v2/sell", sellRoute);
app.use("/api/v2/emailSent", emailSentRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/usersProfile", usersProfileRoutes);
app.use("/api/v2/usersProperty", usersPropertyRoutes);

// defineAssociations();

// Default route for test
app.get("/", (req, res) => {
  res.status(200).send("Backend is running on Railway Server🚀");
});

// Catch-all route for unmatched paths
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
    url: req.originalUrl,
  });
});

// Global unhandled error catch
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

//Connect to database and start server
console.log("Connecting to the database...");

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize
      .sync() // Use `alter: true` for development, `force: true` for production
      .then(() => console.log("Tables synced."))
      .catch((err) => console.error("Sync failed:", err));
  })
  .then(() => {
    console.log("All models synchronized.");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect or sync to the database:", err);
  });
