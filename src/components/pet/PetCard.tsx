import type { Pet } from "../../models/Pet.model";
import { FaDog, FaCalendarAlt } from "react-icons/fa";
import { MdVaccines } from "react-icons/md";
import { Link } from "react-router-dom";

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <article datatype="petCard" className="bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">

      <div className="h-44 bg-neutral-700">
        {pet.photoUrl ? (
          <img
            src={pet.photoUrl}
            alt={pet.petName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-b from-neutral-700 to-neutral-800">
            <FaDog className="text-7xl text-purple-300" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 datatype="petNameCard" className="text-xl font-bold">{pet.petName}</h2>
            <p className="text-sm text-purple-300">
              {pet.species} • {pet.breed}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-neutral-300">
          <li className="flex items-center gap-2">
            <FaCalendarAlt />
            {pet.age} years
          </li>

          <li className="flex items-center gap-2">
            <MdVaccines />
            {pet.vaccines.length > 0
              ? pet.vaccines[pet.vaccines.length - 1]
              : "No vaccines"}
          </li>
        </ul>

        <div className="mt-6">
          <Link
            datatype="viewPetDetailsButton"
            to={`/pets/${pet.petName}`}
            className="block w-full text-center bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-lg font-semibold"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PetCard;