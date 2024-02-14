import jwt from "jsonwebtoken";

//auth
export async function verifyAuth(token: string) {
  // const finalToken = token.replace(/"/g, '')

  //verify the token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("decoding is running", decode);
    return decode;
  } catch (err:any) {
    //verification - issue
    console.log("ERROR WHILE EXTRACTING TOKEN....", err.message);
    return {error:true, message:err.message};
  }
}
