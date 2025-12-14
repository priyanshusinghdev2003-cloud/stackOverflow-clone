import { immer, Immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ID } from "appwrite";
import { account } from "@/models/client/config";

export const useAuthStore = create()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      async login({ email, password }) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password,
          );
          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);
          if (!user.prefs?.reputation)
            await account.updatePrefs({
              reputation: 0,
            });
          set({ session, jwt, user });
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error: error };
        }
      },

      async createAccount({ name, email, password }) {
        try {
          console.log({
            name,
            email,
            password,
          });
          const user = await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error: error };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error: error };
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    },
  ),
);
