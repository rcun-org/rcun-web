import { atom } from "jotai";
import { atomWithCache } from "jotai-cache";
import { getLocalCurrentUserToken } from "../../services/auth.service";
import { getUser } from "../../services/api.user_service";

export const userTokenAtom = atom(getLocalCurrentUserToken());

export const userDataAtom = atomWithCache(async (get) => {
  const userToken = get(userTokenAtom);

  if (userToken) {
    try {
      const userData = await getUser();
      return userData.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  }
  return null;
});

export const isLoadingTokenAtom = atom(false);
