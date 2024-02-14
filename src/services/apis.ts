const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN

// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/send-otp",
  LOGIN_API: BASE_URL + "/auth/login",
  ON_BOARDING_API: BASE_URL + "/auth/signup",
  LOGOUT_API: BASE_URL + "/auth/logout",
};

export const userEndpoints = {
  GET_ALL_IMAGES: BASE_URL + "/user/get-user-images",
} 