const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updatePatient = async (patientData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/update-me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return { error: error.message };
  }
};
