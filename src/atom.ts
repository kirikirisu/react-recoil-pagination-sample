import { atom, selector } from "recoil";

export async function asyncGetUsers(offset = 0): Promise<string[]> {
  const limit = 3;
  const users = [
    "1.george",
    "2.jerry",
    "3.kramer",
    "4.elaine",
    "5.newman",
    "6.puddy",
    "7.peterman",
    "8.slippery pete",
    "9.banya",
    "10.peterman",
    "11.slippery pete",
    "12.banya",
    "13.peterman",
    "14.slippery pete",
    "15.banya",
  ];
  // delay 1 second
  await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
  return users.slice(offset, offset + limit);
}

export const internalState = atom<string[]>({
  key: "users",
  default: [],
});

export const list = selector<string[]>({
  key: "users/list",
  get: ({ get }) => {
    const users = get(internalState);
    return users;
  },
});

export const state = selector<string[]>({
  key: "users/state",
  get: async ({ get }) => {
    const currentUsers = get(internalState);
    const getUsers = await asyncGetUsers(currentUsers.length);
    console.log("getttererreer");

    // return [...currentUsers, ...getUsers];
    return getUsers;
  },
  set: ({ set }, getUsers) => {
    set(internalState, (currentUsers) => {
      console.log("currentUsers!!!!", currentUsers);
      console.log("getUsers!!!!", getUsers);

      return [...currentUsers, ...(getUsers as string[])];
    });
  },
});
