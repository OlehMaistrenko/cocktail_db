import { SignJWT, jwtVerify } from "jose";

export const signJWT = async (
  payload: {
    userId: string;
    email: string;
  },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.userId)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};
export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as unknown as T;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};
