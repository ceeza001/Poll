import { Link } from "react-router-dom";

import { useGetPolls } from "@/lib/react-query/queries";
import { Button } from "@/components/ui"
import { useUserContext } from "@/context/AuthContext";

const Polls = () => {
  const { user } = useUserContext();
  const { data: polls } = useGetPolls();

  if (!polls) return null;
  
  const sortedPolls = [...polls?.documents].reverse();
 
  const handleCopyInvitation = (invitationLink: string) => {
    // Copy invitation link to clipboard
    navigator.clipboard.writeText(invitationLink)
      .then(() => {
        console.log('Invitation link copied to clipboard:', invitationLink);
      })
      .catch((error) => {
        console.error('Error copying invitation link:', error);
        
      });
  };
  
  return (
    <div className="max-w-5xl p-4">
      <div className="flex-start gap-3 justify-start w-full max-w-5xl">
        <img
          src="/assets/icons/upcoming.svg"
          width={28}
          height={28}
          alt="edit"
          className="dark:invert-white"
        />
        <h2 className="text-[20px] font-bold text-left w-left">Ongoing polls</h2>
      </div>

      {sortedPolls && (
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {sortedPolls.map((poll) => (
          <div
            key={poll?.$id}
            className="flex flex-col gap-2 rounded-lg bg-card shadow-md border border-border p-2">
            <div className="w-full h-[2rem] flex items-center justify-between">
              <img 
                src="/assets/icons/upcoming.svg"
                className="h-full w-[2rem] dark:invert-white"
              />
              {poll?.creator?.$id === user.id && (
                <Link to={`/edit/polls/${poll.$id}`}
                  className="body-bold">
                  Edit
                </Link>
              )}
            </div>

            <div>
              <h2 className="h2-bold">{poll.title}</h2>
              <p>{poll?.description}</p>
            </div>

            <div className="flex-start gap-3 justify-start w-full max-w-5xl">
              <Link to={`/polls/${poll?.$id}`}>
                <Button className="shad-button_primary">
                  Join
                </Button>
              </Link>
              <Button
                onClick={() => handleCopyInvitation(`/polls/${poll.$id}`)}
                className="shad-button_dark"
              >
                  Copy Invitation
              </Button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Polls