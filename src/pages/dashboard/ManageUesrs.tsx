import { UserTableSkeleton } from "@/components/skeletonts/user-table-sekeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/endpoints/authApi";
import { toast } from "sonner";

export default function ManageUsers() {
  // Fetch all users
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const users = data?.data;

  // Mutation to update a user
  const [updateUser] = useUpdateUserMutation();

  // Handle role update
  const handleRoleChange = async (
    userId: string,
    currentRole: "admin" | "user"
  ) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await updateUser({
        id: userId,
        payload: { role: newRole },
      });
      toast.success("Role updated successfully");
    } catch (error) {
      console.error("Failed to update user role", error);
      toast.error("Failed to update user role");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <Table className="mt-4">
        <TableCaption>Manage roles and view users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    Change to {user.role === "admin" ? "User" : "Admin"}
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
