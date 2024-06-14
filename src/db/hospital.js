const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllHospitals = async (queryString) => {
  try {
    const response = await fetch(`${BASE_URL}/hospitals${queryString}`);

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to get hospitals",
    };
  }
};

export const getAdminHospitals = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hospitals/admin`, {
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to get hospitals",
    };
  }
};

export const updateHospital = async (hospitalData) => {
  try {
    const response = await fetch(`${BASE_URL}/hospitals`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hospitalData),
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to update hospital profile",
    };
  }
};
