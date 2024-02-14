import { apiConnector } from "../apiconnector";
import { userEndpoints } from "../apis";

const { GET_ALL_IMAGES } = userEndpoints;
export async function getAllImages(setLoading:any) {
  let result = [];

  try {
    setLoading(true);
    const response = await apiConnector("GET", GET_ALL_IMAGES);
    // console.log("GET_ALL_IMAGES RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
    return result
  } catch (error: any) {
    // console.log("GET_ALL_IMAGES ERROR............", error);
    // toast.error(error?.response?.data?.message || "Check Your mail");
    return result;
  }
  finally{
    setLoading(false);
  }
}
