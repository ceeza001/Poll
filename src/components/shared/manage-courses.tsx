import { Models } from "appwrite";
import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"

import { Button, Input } from "../ui"
import { useGetCourses } from "@/lib/react-query/queries"

interface DataProps {
  user: Models.Document;
  currentUser: Models.Document;
  courses: Models.Document[];
};

const ManageCourses = ({ user, currentUser, courses}: DataProps) => {
  
  return (
    <div>
      {courses.map((course) => (
        <div
          key={course.$id}
          className="flex justify-between items-center p-2"
        >
          <div className="flex gap-2 items-start">
            <div className="relative sm:w-full w-[5rem] sm:h-[10rem] aspect-square md:aspect-video rounded-md overflow-hidden object-cover">
              <img 
                src={course.imageUrl || "/assets/icons/file-upload.svg"} 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="text-lg md:text-base font-medium transition line-clamp-2">
                {course.title}
              </div>
              <p className="text-xs text-muted-foreground">
                {course.category?.name}
              </p>
              <span className="flex gap-2 items-center">
                <img
                  src="/assets/icons/chapters.svg"
                  className="dark:invert-white w-[1rem]"
                />
                {course.chapters.length} chapter{course.chapters.length > 1 && 's'}
              </span>
            </div>
          </div>
          <Link to={`/edit/courses/${course.$id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ManageCourses;