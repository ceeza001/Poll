const Home = () => {
  
  return (
    <div className="max-w-5xl p-4">
      <div className="w-full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">Revolutionizing Democracy: Introducing Our E-Voting Platform</h2>
        <p className="mt-2">Today, we're excited to introduce you to a game-changer in the realm of democracy – our E-Voting website. Developed by passionate secondary school students, our platform aims to redefine the way we participate in elections, making it more accessible, secure, and convenient for everyone.</p>
      </div>

      <div className="mt-4 w-full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">The Need for Change:</h2>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 my-2">
          <div className="rounded-lg p-2 bg-foreground text-white font-semibold">
            <p>Traditional voting systems often come with challenges such as long queues, limited accessibility for people with disabilities, and logistical hurdles.</p>
          </div>
          <div className="rounded-lg p-2 bg-foreground text-white font-semibold">
            <p>Our E-Voting website addresses these issues by providing a digital platform where users can cast their votes from the comfort of their homes or any location with internet access.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">Key Features</h2>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 my-2">
          <div className="rounded-lg p-2 bg-primary text-white font-semibold">
            <h2 className="h2-bold">User-Friendly Interface</h2>
            <p>Designed with simplicity in mind, our platform ensures that even first-time voters can easily navigate through the voting process.</p>
          </div>
          <div className="rounded-lg p-2 bg-primary text-white font-semibold">
            <h2 className="h2-bold">Accessibility</h2>
            <p>Our website is optimized for accessibility, catering to individuals with visual or motor impairments, ensuring that everyone has equal opportunity to participate in the democratic process.</p>
          </div>
          <div className="rounded-lg p-2 bg-primary text-white font-semibold">
            <h2 className="h2-bold">Transparency</h2>
            <p>Transparency is at the core of our platform. Users can track their votes, ensuring that each vote is counted accurately and fairly.</p>
          </div>
          <div className="rounded-lg p-2 bg-primary text-white font-semibold">
            <h2 className="h2-bold">Security Measures</h2>
            <p>We've implemented robust security protocols to safeguard the integrity of the voting process, including encryption techniques and multi-factor authentication.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 -full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">How It Works</h2>
        <ul>
          <li>Users simply visit our website and create an account or log in if they already have one.</li>
          <li>They verify their identity through a secure process to prevent fraudulent activities.</li>
          <li>Once verified, users can access the ballot and cast their votes securely.</li>
          <li>After voting, users receive a confirmation and can verify their vote at any time.</li>
        </ul>
      </div>

      <div className="mt-4 w-full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">Impact</h2>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 my-2">
          <div className="rounded-lg p-2 bg-red-700 text-white font-semibold">
            <p>By leveraging technology, we're empowering individuals to participate in the democratic process more conveniently and securely.</p>
          </div>
          <div className="rounded-lg p-2 bg-red-700 text-white font-semibold">
            <p>Our platform has the potential to increase voter turnout, especially among younger demographics who are more accustomed to digital platforms.</p>
          </div>
          <div className="rounded-lg p-2 bg-red-700 text-white font-semibold">
            <p>Furthermore, it reduces the environmental impact associated with traditional paper-based voting methods.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full max-w-5xl">
        <h2 className="text-[20px] font-bold text-left w-left">Future Developments</h2>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 my-2">
          <div className="rounded-lg p-2 bg-foreground text-white font-semibold">
            <p>We're committed to continuously improving our platform based on user feedback and technological advancements.</p>
          </div>
          <div className="rounded-lg p-2 bg-foreground text-white font-semibold">
            <p>Future iterations may include features such as blockchain integration for enhanced security and verifiability.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home