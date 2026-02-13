import { Link } from "react-router-dom"
import { FaPlusCircle } from "react-icons/fa";

const PetListPage = () => {
  return (
    <div className="h-screen bg-black">
        <div className="flex justify-between items-center py-10 px-4">
            <div className="space-y-3">
                <p className="text-5xl text-white">My Pets</p>
                <p className="text-neutral-500">central dashboard for your pet's healthcare journey</p>
            </div>
            <div>
                <Link to={'/addpet'} className="flex items-center space-x-2 text-white bg-purple-700 px-5 py-3 rounded-lg">
                    <FaPlusCircle/>
                    <p>Add New Pet</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PetListPage