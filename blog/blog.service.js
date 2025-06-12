const Blog = require("./blog.model");
const { Op } = require("sequelize");

exports.createBlog = async (data, imageUrl) => {
  try {
    const blog = await Blog.create({
      ...data,
      imagePath: imageUrl,
    });

    return {
      status: true,
      code: 201,
      message: "Blog created successfully",
      result: blog,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Blog creation failed",
      result: error.message,
    };
  }
};

exports.getAllBlogs = async () => {
  try {
    const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    return {
      status: true,
      code: 200,
      message: "Blogs retrieved successfully",
      result: blogs,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Failed to retrieve blogs",
      result: error.message,
    };
  }
};

exports.getLatestBlogs = async () => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    return blogs;
  } catch (error) {
    console.error("Error in getLatestBlogs service:", error);
    throw error;
  }
};

exports.getBlogById = async (id) => {
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return {
        status: false,
        code: 404,
        message: "Blog not found",
        result: null,
      };
    }
    return {
      status: true,
      code: 200,
      message: "Blog retrieved successfully",
      result: blog,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Failed to retrieve blog",
      result: error.message,
    };
  }
};

exports.searchAndFilterBlogs = async (query) => {
  try {
    const { title, category, keyword } = query;

    const whereClause = {};

    if (title) {
      whereClause.title = { [Op.like]: `%${title}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { subtitle: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } },
      ];
    }

    const blogs = await Blog.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return {
      status: true,
      code: 200,
      message: "Blogs filtered successfully",
      result: blogs,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Failed to filter blogs",
      result: error.message,
    };
  }
};

exports.updateBlog = async (id, data, imageUrl) => {
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return {
        status: false,
        code: 404,
        message: "Blog not found",
        result: null,
      };
    }

    await blog.update({
      ...data,
      imagePath: imageUrl || blog.imagePath,
    });

    return {
      status: true,
      code: 200,
      message: "Blog updated successfully",
      result: blog,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Blog update failed",
      result: error.message,
    };
  }
};

exports.deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return {
        status: false,
        code: 404,
        message: "Blog not found",
        result: null,
      };
    }

    await blog.destroy();

    return {
      status: true,
      code: 200,
      message: "Blog deleted successfully",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      code: 400,
      message: "Failed to delete blog",
      result: error.message,
    };
  }
};
