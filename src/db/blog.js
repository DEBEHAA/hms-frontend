const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createNewBlog = async (blogData) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const getAllBlogs = async (queryString = "") => {
  try {
    const response = await fetch(`${BASE_URL}/blogs${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const getBlogsPaginated = async (params) => {
  try {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value) query.append(key, value);
    }

    const response = await fetch(`${BASE_URL}/blogs?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    const totalPages = Math.ceil(result.data?.totalDocs / params.limit) || 1;

    return {
      blogs: result.data?.blogs,
      totalPages,
      totalBlogs: result.data?.totalDocs,
      result: result.results,
    };
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const getAllTags = async () => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const getBlogReaction = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}/reactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const likeBlog = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};

export const dislikeBlog = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${blogId}/dislike`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }
};
