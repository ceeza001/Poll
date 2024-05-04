import { Link } from "react-router-dom";
import { useGetCandidates } from "@/lib/react-query/queries";
import { CandidateCard, Loader } from "@/components/shared";

const Home = () => {
  const { data: candidates, isLoading } = useGetCandidates(10);
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="w-full min-h-[15rem] rounded-lg overflow-hidden border border-dark-4">
          <img 
            src="/assets/images/hero.jpeg"
            className="w-full h-full"
            alt="Hero"
          />
        </div>
        {isLoading ? (
          <div className="h-full w-full flex-center flex-col">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            {candidates.documents.map((candidate, index) => (
              <CandidateCard 
                candidate={candidate} key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;