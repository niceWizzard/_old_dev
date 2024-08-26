"use client"

import { useRouter } from "next/navigation"
import CustomButton from "./CustomButton"

interface ShowMoreProps {
    pageNumber: number
    isNext: boolean

}

const ShowMore = ({
    pageNumber,
    isNext
} : ShowMoreProps) => {

    const router = useRouter()
    const handleNavigation = () => {
        const newPathName = 
        new URL(window.location.href)
        const newLimit = (pageNumber + 1) * 10
        newPathName.searchParams.set('limit', newLimit.toString());

        router.push(newPathName.toString(), {
            scroll: false,
        })

    }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton title="Show More"            
            type="button"
            containerStyles="bg-primary-blue rounded-full text-white"
            handleClick={handleNavigation}
            />
        )}
    </div>
  )
}

export default ShowMore