import { useGetUsers } from "@/lib/react-query/queries";
import { Button } from "@/components/ui"
import { useUserContext } from "@/context/AuthContext";
import { useUpdateUser } from "@/lib/react-query/queries";

const Admin = () => {
  const { user } = useUserContext();
  const { data: users } = useGetUsers();
  
  // Queries
  const { mutateAsync: updateUser } =
    useUpdateUser();

  // Handler
  const handleAddAdmin = async (userId: string) => {
    try {
      const updatedUser = await updateUser({
        userId: userId,
        isAdmin: true, // Assuming initialData has isPublished property
      });
      
      if (!updatedUser) {
        return;
      }
      
    } catch {
      console.log({ title: "Something went wrong" });
    }
  }

  const handleRemoveAdmin = async (userId: string) => {
    try {
      const updatedUser = await updateUser({
        userId: userId,
        isAdmin: false, // Assuming initialData has isPublished property
      });
      
      if (!updatedUser) {
        return;
      }
      
    } catch {
      console.log({ title: "Something went wrong" });
    }
  }
  
  const handleVerify = async (userId: string) => {
    try {
      const updatedUser = await updateUser({
        userId: userId,
        status: 'verified', // Assuming initialData has isPublished property
      });
      
      if (!updatedUser) {
        return;
      }
      
    } catch {
      console.log({ title: "Something went wrong" });
    }
  }

  const handleBlock = async (userId: string) => {
    try {
      const updatedUser = await updateUser({
        userId: userId,
        status: 'blocked', // Assuming initialData has isPublished property
      });

      if (!updatedUser) {
        return;
      }

    } catch {
      console.log({ title: "Something went wrong" });
    }
  }

  const handleUnBlock = async (userId: string) => {
    try {
      const updatedUser = await updateUser({
        userId: userId,
        status: 'unverified', // Assuming initialData has isPublished property
      });

      if (!updatedUser) {
        return;
      }

    } catch {
      console.log({ title: "Something went wrong" });
    }
  }

  
  if (!users) return null;

  // Sort polls by creation date in descending order
  const sortedUsers = [...users.documents].reverse();

  return (
    <div className="max-w-5xl p-4">
      <div className="flex-start gap-3 justify-start w-full max-w-5xl">
        <img
          src="/assets/icons/profile.svg"
          width={28}
          height={28}
          alt="edit"
          className="dark:invert-white"
        />
        <h2 className="text-[20px] font-bold text-left w-left">Administrator</h2>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {sortedUsers.map((user) => (
          <div
            key={user.$id}
            className="relative flex flex-col gap-2 rounded-lg bg-card shadow-md border border-border p-2">
            {user.isAdmin && (
              <span className="absolute top-2 right-2 rounded-lg bg-sky-500 text-foreground border-border p-[2px]">
                Administrator
              </span>
            )}
            
            <div>
              <h2 className="body-bold">Name: {user.name}</h2>
              <p>Voter's ID: {user.voterId}</p>
              <p>Status: {user.status}</p>
            </div>

            {user.status !== 'blocked' ? (
              <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                <Button 
                  onClick={() => handleVerify(`${user.$id}`)}
                  className="shad-button_primary">
                  Verify
                </Button>

                {user.status === 'verified' && (
                  <>
                    {user.isAdmin ? (
                      <Button 
                        onClick={() => handleRemoveAdmin(`${user.$id}`)}
                        className="shad-button_primary">
                        Remove Admin
                      </Button>
                    ) : (
                       <Button 
                        onClick={() => handleAddAdmin(`${user.$id}`)}
                        className="shad-button_primary">
                        Add Admin
                      </Button>
                    )}
                  </>
                )}

                <Button
                  onClick={() => handleBlock(`${user.$id}`)}
                  className="shad-button_dark"
                >
                  Block
                </Button>
              </div>
            ) : (
              <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                <Button
                  onClick={() => handleUnBlock(`${user.$id}`)}
                  className="shad-button_dark"
                >
                  unblock
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin