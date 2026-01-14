import { Star } from "lucide-react"
import Button from "../components/ui/Button"

const LandingPage = () => {
    return (
        <div className="w-full sm:max-w-6xl  sm:mx-auto py-20 flex items-center justify-center">
            <div className="">
                <RatingStars />
                <p className="text-xs text-center text-blue-900 font-semibold">Trust by 25+ clients with 5 Star Ratings Across The Board</p>
                <h1 className="text-4xl max-w-lg text-center text-secondary py-5">Bring Big Ideas To Life Without The <span className="text-primary font-medium italic">Tech Headache</span></h1>
                <p className="max-w-lg text-center font-medium text-blue-900">Your all-in-one Product Team, Turning Vision into Live, Launch ready product</p>

                <Button className="w-52 py-3 mt-10 mx-auto border-4 border-sky-300 text-shadow-2xs shadow-2xl shadow-blue-400 text-shadow-sky-200">Get Started</Button>
            </div>
        </div>
    )
}

export default LandingPage



const RatingStars = () => {
    return (
        <div className="flex items-center justify-center gap-1">
            {Array.from([1, 2, 3, 4, 5]).map((item) => (
                <Star
                    key={item}
                    size={10}
                    className="text-yellow-400"
                    fill="yellow"
                />
            ))}

        </div>
    )
}