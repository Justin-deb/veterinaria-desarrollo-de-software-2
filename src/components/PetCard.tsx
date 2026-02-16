import type { Pet } from "../models/Pet.model"
import { FaDog, FaCalendarAlt } from "react-icons/fa";
import { MdVaccines } from "react-icons/md";
import { Link } from "react-router-dom";

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <article className="bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">

      <div className="h-44 bg-linear-to-b from-neutral-700 to-neutral-800 flex items-center justify-center">
        <FaDog
          className={"text-7xl text-purple-300"}
        />
      </div>


      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{pet.petName}</h2>
            <p
              className={"text-sm text-purple-300"}
            >
              {pet.species} • {pet.breed}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-neutral-300">
          <li className="flex items-center gap-2">
            <FaCalendarAlt />
            {pet.age}
          </li>

          <li
            className={"flex items-center gap-2 "}
          >
            <MdVaccines />
            {pet.vaccines[pet.vaccines.length - 1]}
          </li>
        </ul>

        <div className="mt-6">
          <Link
            to={`/pets/${pet.petName}`}
            className="block w-full text-center bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-lg font-semibold "
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );

}

export default PetCard