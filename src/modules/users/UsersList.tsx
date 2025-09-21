import { memo, useState } from "react";
import { useAppDispatch, useAppSelector, createAppSelector } from "../../store";
import { type UserId, usersSlice } from "./users.slice";

const selectSortedUsersGlobal = createAppSelector(
  (state) => state.users,
  (_: unknown, sort: "asc" | "desc") => sort,
  (usersState, sort) => usersSlice.selectors.selectSortedUsers(usersState, sort)
);

function UsersList() {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) =>
    selectSortedUsersGlobal(state, sortType)
  );

  const selectedUserId = useAppSelector(
    usersSlice.selectors.selectSelectedUserId
  );
  const selectedUser = useAppSelector((s) =>
    selectedUserId ? s.users.entities[selectedUserId] : undefined
  );

  return (
    <div className="flex flex-col items-center">
      {!selectedUser ? (
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setSortType("asc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Asc
            </button>
            <button
              onClick={() => setSortType("desc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Desc
            </button>
          </div>
          <ul className="list-none">
            {sortedUsers.map((user) => (
              <UserListItem
                key={user.id}
                userId={user.id}
                onClick={() =>
                  dispatch(usersSlice.actions.selected({ userId: user.id }))
                }
              />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser
          userId={selectedUser.id}
          onBackButtonClick={() => dispatch(usersSlice.actions.selectRemove())}
        />
      )}
    </div>
  );
}

const UserListItem = memo(function UserListItem({
  userId,
  onClick,
}: {
  userId: UserId;
  onClick?: () => void;
}) {
  const user = useAppSelector((state) => state.users.entities[userId]);
  const dispatch = useAppDispatch();

  if (!user) return null;

  const handleUserClick = () => {
    if (onClick) return onClick();
    dispatch(usersSlice.actions.selected({ userId }));
  };

  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});

function SelectedUser({
  userId,
  onBackButtonClick,
}: {
  userId: UserId;
  onBackButtonClick: () => void;
}) {
  const user = useAppSelector((state) => state.users.entities[userId]);
  if (!user) return null;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}

export default UsersList;
