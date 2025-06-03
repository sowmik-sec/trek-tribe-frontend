import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authkey";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  if (userInfo.data.accessToken) {
    setToLocalStorage(authKey, userInfo.data.accessToken);
    setAccessToken(userInfo.data.accessToken, { redirect: "/" });
  }
  return userInfo;
};
