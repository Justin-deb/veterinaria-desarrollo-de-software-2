import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../context/ClientContext";
import type { Pet } from "../../models/Pet.model";
import { getPets } from "../../services/Pet.service";
import PetCard from "../../components/pet/PetCard";

const PetListPage = () => {
    const clientContext = useContext(ClientContext);
    const [petList, setPetList] = useState<Pet[]>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        const loadPets = async () => {
            try {
                setPetList(await getPets(clientContext.clientID));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadPets();
    }, [])

    if(loading){
        return(<p>Loading...</p>);
    }


    return (
        <div className="min-h-screen bg-black text-gray-100">

            <main className="mx-auto max-w-7xl px-6 py-10">

                <section className="mb-8">
                    <h1 className="text-4xl font-extrabold">My Pets</h1>
                    <p className="mt-2 text-neutral-400">Central dashboard for your pet’s healthcare journey.</p>
                </section>

                <section datatype="petList" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {!petList ? (<p>No pets to show</p>) : petList.map((pet) => <PetCard pet={pet} />)}
                </section>

                <Link to={'/'} className="block w-full text-center bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-lg font-semibold">Back Home</Link>
            </main>

        </div>
    );

}

export default PetListPage