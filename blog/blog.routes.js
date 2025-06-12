const express = require("express");
const router = express.Router();
const blogController = require("./blog.controller");
const upload = require("../utils/cloudinary"); // your multer config

router.get("/latest", blogController.getLatestBlogs);
router.post("/", upload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/search-filter", blogController.searchAndFilterBlogs);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
