import jwt from "jsonwebtoken";
export function tokenGenration(user: any) {
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  // Save token to user document in database
  user.token = token;
  // Set cookie for token and return success response
  const options = {
    expires: new Date(Date.now() +24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return { token, options };
}
