const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createDoctor = async (doctorData) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return { error: error.message };
  }
};

export const getAllDoctors = async (queryString = "") => {
  try {
    const response = await fetch(`${BASE_URL}/doctors${queryString}`, {
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

export const getDoctorsPaginated = async (params) => {
  try {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value) query.append(key, value);
    }

    const response = await fetch(`${BASE_URL}/doctors?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    const totalPages = Math.ceil(result.data.totalDocs / params.limit) || 1;

    return {
      doctors: result.data?.doctors,
      totalPages,
      totalDoctors: result.data.totalDocs,
      result: result.results,
    };
  } catch (error) {
    console.log(error);

    return { error: error.message };
  }
};

export const getHospitalDoctors = async (queryString = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}/doctors/my-doctors${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return { error: error.message };
  }
};

export const getDoctorById = async (doctorId) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
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

export const updateDoctor = async ({ doctorId, doctorData }) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return { error: error.message };
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return { error: error.message };
  }
};

export const getAllSpecialities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/specialities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return { error: error.message };
  }
};
