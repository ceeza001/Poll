import { Link } from "react-router-dom";

const Home = () => {
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Welcome to the Florence Nightingale Voting Platform</h2>
          <p>
            Your voice matters, and this digital space has been created to empower every member of our faculty to actively participate in shaping our academic community. As we embark on this journey of democratic engagement, let your opinions be heard. Explore the candidates, initiatives, and propositions, and cast your vote to make a meaningful impact on the future of our faculty. Together, let's build a stronger, more collaborative academic environment. Your vote, your faculty, your future. Welcome to the Faculty Voting Platform!
          </p>
          
          <div className="flex flex-col md:flex-row w-full gap-4">
            <Link 
              to="/vote" 
              className="flex items-center gap-6 body-bold bg-primary-500 w-full p-[0.8rem] rounded-lg">
              <img 
                src="/assets/icons/vote.svg"
                alt="vote" 
                className="w-[2rem] h-[2rem] invert-white"
              />
              <p>Vote</p>
            </Link>
            <Link 
              to="/result" 
              className="flex items-center gap-6 body-bold bg-dark-2 border border-dark-4 w-full p-[0.8rem] rounded-lg">
              <img 
                src="/assets/icons/result.svg"
                alt="result" 
                className="w-[2rem] h-[2rem] invert-white"
              />
              <p>Results</p>
            </Link>
          </div>
        </div>
      </div>
      
            
    </div>
  );
};

export default Home;