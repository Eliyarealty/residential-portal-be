const blogService = require("./blog.service");

exports.createBlog = async (req, res) => {
  try {
    const imageUrl = req.file?.path || null;
    const { title, subtitle, category, content, author } = req.body;

    // Optional: you can do a quick validation check here as well
    if (!title || !subtitle || !category || !content || !author) {
      return res.status(400).json({
        status: false,
        code: 400,
        message: "Missing required fields",
        result: null,
      });
    }

    const response = await blogService.createBlog(
      { title, subtitle, category, content, author },
      imageUrl
    );

    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const response = await blogService.getAllBlogs();
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};

exports.getLatestBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getLatestBlogs();
    console.log("Fetched blogs:", blogs); // <-- Add this line

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Blog not found",
        result: null,
      });
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "Latest blogs fetched successfully",
      result: blogs,
    });
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    res.status(500).json({
      status: false,
      code: 500,
      message: "Failed to fetch latest blogs",
      result: null,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const response = await blogService.getBlogById(req.params.id);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};

exports.searchAndFilterBlogs = async (req, res) => {
  try {
    const response = await blogService.searchAndFilterBlogs(req.query);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const imageUrl = req.file?.path || null;
    const response = await blogService.updateBlog(
      req.params.id,
      req.body,
      imageUrl
    );
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const response = await blogService.deleteBlog(req.params.id);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      result: error.message,
    });
  }
};
