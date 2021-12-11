import { useState } from "react";
import { useRecoilStateLoadable, useRecoilCallback } from "recoil";
import { internalState } from "../atom/atom";
import { asyncGetUsers } from "../mockApi/asyncGetUsers";

export const useUserPagination = () => {
  // 再レンダリングごと実行される
  const [userLoadable, setUsers] = useRecoilStateLoadable(internalState);
  console.log("loadable!!!!!!!", userLoadable);

  // userLoadableでは追加のユーザー取得時のステータスを追えないため、追跡用のステートを作る
  const [isLoadingAdditionalUser, setIsLoadingAdditionalUser] = useState(false);

  const clear = () => {
    setUsers([]);
  };

  const loadMore = useRecoilCallback(({ set }) => async () => {
    setIsLoadingAdditionalUser(true);
    console.log("contents", userLoadable.contents);
    const getUsers = await asyncGetUsers(userLoadable.contents.length);
    setIsLoadingAdditionalUser(false);

    set(internalState, (users) => [...users, ...getUsers]);
  });

  return {
    userLoadable,
    clear,
    loadMore,
    isLoadingAdditionalUser,
  };
};
