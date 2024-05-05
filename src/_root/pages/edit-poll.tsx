import { Models } from "appwrite";
import { useParams } from "react-router-dom"

import { useGetPollById } from "@/lib/react-query/queries"
import { Loader, Banner, Actions } from "@/components/shared"
import { TitleForm, DescriptionForm, CandidatesForm } from "@/components/forms"

const EditPoll = () => {
  const { id } = useParams()
  
  const { data: poll } = useGetPollById(id || "");
  
  if (!poll)
    return (
      <div className="flex-center w-full h-full dark:invert-white">
        <Loader />
      </div>
    );

  const requiredFields = [
    poll.title,
    poll.description,
    poll.candidates,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  
  return (
    <div className="p-4">
      {!poll.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}

      <div className="py-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Poll setup
            </h1>
            <span className="text-sm text-dim">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            poll={poll}
            isPublished={poll.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex-start gap-3 justify-start w-full max-w-5xl">
              <img
                src="/assets/icons/course.svg"
                width={20}
                height={20}
                alt="edit"
                className="dark:invert-white"
              />
              <h2 className="text-[22px] font-bold text-left w-left">Customize your poll</h2>
            </div>
            <TitleForm
              initialData={poll}
              pollId={poll.$id}
              type="Poll"
            />
            <DescriptionForm
              initialData={poll}
              pollId={poll.$id}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                <img
                  src="/assets/icons/checklist.svg"
                  width={24}
                  height={24}
                  alt="edit"
                  className="dark:invert-white"
                />
                <h2 className="text-[22px] font-bold text-left w-left">Candidates</h2>
              </div>
              <CandidatesForm
                initialData={poll}
                pollId={poll.$id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPoll