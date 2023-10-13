import BasicLayout from "../../components/Layout/BasicLayout";
import { DashBoard } from "../../components/admin/DashBoard";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/adminAPI";

const ManageUsers = () => {
  const { data } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.users;

  return (
    <BasicLayout>
      <DashBoard>
        <div className="flex flex-col gap-5">
          {users &&
            users.map((user, i) => {
              return (
                <div key={i}>
                  <h1>{user.name}</h1>
                  <h1>{user.email}</h1>
                  <button
                    onClick={async () => {
                      await deleteUser(user._id);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      </DashBoard>
    </BasicLayout>
  );
};

export default ManageUsers;
