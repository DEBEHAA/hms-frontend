const BASE_URL = import.meta.env.VITE_BASE_URL;

export const bookAppointment = async (appointmentdata) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentdata),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return { error: error.message };
  }
};

export const checkExistingAppointment = async (doctorId, patientId) => {
  try {
    if (!doctorId || !patientId)
      return { error: "Doctor and Patient ID required" };

    const response = await fetch(
      `${BASE_URL}/appointments?doctor=${doctorId}&patient=${patientId}`,
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

export const getAllAppointments = async (queryString = "") => {
  try {
    const response = await fetch(`${BASE_URL}/appointments${queryString}`, {
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
