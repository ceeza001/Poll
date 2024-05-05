import { Models } from "appwrite"
import { useState } from "react"
import { AnimatePresence, motion} from "framer-motion"
import { X } from "lucide-react"

interface RecommendProps {
  courses: Models.Document[];
};

const Recommend = ({ courses }: RecommendProps) => {

  const recommendedCourses = courses.filter((course) => course.category?.name === "Computing")

  return (
    <div className="mt-2 flex-nowrap overflow-x-scroll grid grid-rows-2 grid-flow-col md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {recommendedCourses.map((course) => (
        <div 
          key={course.$id}
          className="relative rounded-lg overflow-hidden border border-border w-[10rem]"
        >
          <div className="aspect-video">
            <img 
              src={course.imageUrl}
              className="h-[12rem]"
            />
          </div>
          <div className="absolute bottom-0 leading-[100%] p-2 w-full z-[2] text-white">
            <h2 className="truncate text-[14px] font-bold">{course.title}</h2>
            <p className="truncate text-[13px] font-semibold">by <span>{course.creator.name}</span></p>
            
          </div>
        <div className="absolute bottom-0 left-0 z-[1] h-[4rem] w-full bg-gradient-to-t from-[#000] to-transparent "/>
        </div>
      ))}
    </div>
  )
}

export default Recommend;