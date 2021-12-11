import { useUserPagination } from "../hooks/useUserPagination";

export const Users = () => {
  const { userLoadable, isLoadingAdditionalUser, loadMore, clear } =
    useUserPagination();

  switch (userLoadable.state) {
    case "hasValue":
      return (
        <>
          <ul>
            {userLoadable.contents.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
          {isLoadingAdditionalUser && <div>Loading More User....</div>}
          <button disabled={isLoadingAdditionalUser} onClick={loadMore}>
            more
          </button>
          <button onClick={clear}>clear</button>
        </>
      );
    case "loading":
      return <div>Initial Loading...</div>;
    case "hasError":
      return <div>Error</div>;
  }
};
