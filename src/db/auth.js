const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getLoggedInUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const verifyAccount = async (otpData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/verify-otp`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const resendVerificationOTP = async (mobileNo) => {
  try {
    const response = await fetch(`${BASE_URL}/users/resend-otp`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNo }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const forgotPassword = async (mobileNo) => {
  try {
    const response = await fetch(`${BASE_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobileNo }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};
