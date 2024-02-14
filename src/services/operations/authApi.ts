import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";

const { LOGIN_API, SENDOTP_API, ON_BOARDING_API, LOGOUT_API } = authEndpoints;

export async function sendOtp(
  email: string,
  setLoading: any,
  router: any,
  resend = false
) {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector("POST", SENDOTP_API, {
      email,
    });
    console.log("SENDOTP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP Sent");

    if (!resend) {
      router.push("/verify-email");
    }
  } catch (error: any) {
    console.log("SENDOTP API ERROR............", error);
    toast.error(error?.response?.data?.message || "Check Your mail");
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
}

export async function login(
  email: string,
  otp: string,
  setLoading: any,
  setToken: any,
  setUser: any,
  setIsUserLoggedIn: any,
  router: any
) {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      otp,
    });

    // console.log("LOGIN API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setToken(response.data.token);
    localStorage.setItem("token", JSON.stringify(response.data.token));

    if (response?.data?.user?.verified === false) {
      router.push("/signup");
      toast.success("Complete your profile");
    } else {
      router.push(`/`);
      setUser(response.data.user);
      setIsUserLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful");
    }
  } catch (error: any) {
    // console.log("LOGIN API ERROR............", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
}

export async function singup(
  formData: any,
  setLoading: any,
  setUser: any,
  setIsUserLoggedIn: any,
  router: any
) {
  const toastId = toast.loading("Loading...");
  const redirect = localStorage.getItem("redirect");
  setLoading(true);
  try {
    const response = await apiConnector("POST", ON_BOARDING_API, {
      name: formData.name,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      phoneNumberExt: formData.phoneNumberExt,
    });

    // console.log("FILLING DATA RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    localStorage.setItem("user", JSON.stringify(response.data.user)); // set user in localstorage
    setUser(response.data.user);
    setIsUserLoggedIn(true);
    if (redirect) {
      router.push(`${redirect}`);
      localStorage.removeItem("redirect");
    } else {
      router.push(`/`);
    }

    toast.success("Login Successful");
  } catch (error: any) {
    console.log("FILLING DATA ERROR............", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
}

export async function logout() {
  try {
    const response = await apiConnector("GET", LOGOUT_API);

    console.log("LOGUT API RESPONSE............", response);
    localStorage.removeItem("token");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    localStorage.removeItem("user");
    toast.success("Logout Successful");

    toast.success("Logout Successful");
  } catch (error: any) {
    console.log("LOGUT API ERROR............", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
}
