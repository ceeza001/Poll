import { useState } from "react"
import { AnimatePresence, motion} from "framer-motion"
import { X } from "lucide-react"

const Hero = () => {
  const [selectedId, setSelectedId] = useState(null)
 
  return (
    <>
      <h2 className="text-[16px] font-bold">Daily refresh</h2>
      <motion.div 
        layoutId="id" 
        onClick={() => setSelectedId("id")}
        className="mt-2 relative overflow-hidden w-full h-[10rem] border border-border rounded-xl"
      >
        <img
          src="/assets/images/hero2.jpg"
          className=""
        />
        <div className="absolute top-0 left-0 right-0 z-[1] h-full w-full bg-[#000] opacity-[.5] blur"/>
        <div className="absolute top-0 left-0 right-0 z-[2] p-4 text-white">
          <motion.h5 className="text-[12px] font-bold">Fun Facts</motion.h5>
          <motion.h2 className="text-[16px] font-bold">Music helps improve language skills</motion.h2>
          <motion.p className="line-clamp-3 mt-2">
            Anthony Brandt, a professor of music composition and theory, and co-author of the paper titled Frontiers in Cognitive Auditory Neuroscience said in an interview to medical news today (published in 2012) that "Language is typically viewed as fundamental to human intelligence, and music is often treated as being dependent on or derived from language.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 z-[2] h-[4rem] w-full bg-gradient-to-t from-[#000] to-transparent "/>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="bg-border text-white h-[100dvh] w-screen z-[100] fixed top-0 left-0"
            layoutId={selectedId}>
            <img
              src="/assets/images/hero2.jpg"
              className=""
            />
            <div className="absolute top-0 left-0 right-0 z-[1] h-full w-full bg-[#000] opacity-[.5] blur"/>
            <div className="absolute top-0 left-0 right-0 h-full z-[2] p-4 flex flex-col justify-center">
              <motion.h5 className="text-[12px] font-bold">Fun Facts</motion.h5>
              <motion.h2 className="text-[16px] font-bold">Music helps improve language skills</motion.h2>
              <motion.p className="mt-2">
                Anthony Brandt, a professor of music composition and theory, and co-author of the paper titled Frontiers in Cognitive Auditory Neuroscience said in an interview to medical news today (published in 2012) that "Language is typically viewed as fundamental to human intelligence, and music is often treated as being dependent on or derived from language.
              </motion.p>
            </div>
            <motion.button 
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 z-[3]"
            >
              <X className="h-[2.3rem] w-[2.3rem]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Hero;