import { atom, selector } from "recoil";
import { asyncGetUsers } from "../mockApi/asyncGetUsers";

export const internalState = atom<string[]>({
  key: "users",
  default: selector({
    key: "users/default",
    get: async () => {
      const getUsers = await asyncGetUsers();
      return getUsers;
    },
  }),
});
