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
