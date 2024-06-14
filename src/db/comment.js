const BASE_URL = import.meta.env.VITE_BASE_URL;

export const commentOnBlog = async (commentData) => {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsByBlog = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${blogId}`, {
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
