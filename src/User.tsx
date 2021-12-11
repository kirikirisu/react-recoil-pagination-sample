import { useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilCallback,
} from "recoil";
import { asyncGetUsers, internalState } from "./atom";

export const Users = () => {
  const [loadable, setUsers] = useRecoilStateLoadable(internalState);
  // const userList = useRecoilValue(list);
  console.log("loadable!!!!!!!", loadable);

  // useEffect(() => {
  //   if (usersState.state === "hasValue") {
  //     setUsersState(usersState.contents);
  //   }
  // }, [usersState]);

  // const loadMore = async () => {
  //   console.log("click");
  //   const getUsers = await asyncGetUsers(loadable.contents.length);
  //   setUsers(getUsers);
  // };

  const loadMore = useRecoilCallback(({ set }) => async () => {
    const getUsers = await asyncGetUsers(loadable.contents.length);
    set(internalState, (users) => {
      console.log("currentUser", users);
      console.log("getUsers", getUsers);

      return [...users, ...getUsers];
    });
  });

  switch (loadable.state) {
    case "hasValue":
      return (
        <ul>
          {loadable.contents.map((user) => (
            <li key={user}>{user}</li>
          ))}
          <button onClick={loadMore}>more</button>
        </ul>
      );
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      return <div>Error</div>;
  }
};
