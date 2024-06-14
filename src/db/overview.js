const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getOverview = async (role) => {
  try {
    const response = await fetch(`${BASE_URL}/overview/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return { error: error.message };
  }
};
