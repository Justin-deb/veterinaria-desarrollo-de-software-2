import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Pet } from "../types/Pet"
import { getPetByName } from "../service/PetService"

export default function PetProfile() {
  const { name } = useParams<{ name: string }>()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"summary" | "vaccines" | "consults">("summary")

  useEffect(() => {
    if (!name) return

    getPetByName(name)
      .then(setPet)
      .catch(() => setPet(null))
      .finally(() => setLoading(false))
  }, [name])

  if (loading) return <div className="p-6">Cargando...</div>
  if (!pet) return <div className="p-6">Mascota no encontrada</div>

  return (
    <div className="p-6 max-w-xl mx-auto">

      <Link to="/pets" className="text-blue-600 block mb-4">
        ← Volver a lista
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        {pet.petName}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("summary")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Resumen
        </button>

        <button
          onClick={() => setTab("vaccines")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Vacunas
        </button>

        <button
          onClick={() => setTab("consults")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Consultas
        </button>
      </div>

      {/* Resumen */}
      {tab === "summary" && (
        <div className="bg-white shadow rounded p-4 space-y-2">
          <p><strong>Especie:</strong> {pet.species}</p>
          <p><strong>Raza:</strong> {pet.breed}</p>
          <p><strong>Edad:</strong> {pet.age}</p>
        </div>
      )}

      {/* Vacunas */}
      {tab === "vaccines" && (
        <div className="bg-white shadow rounded p-4">
          <ul className="list-disc pl-5">
            {pet.vaccines.length === 0
              ? <li>Sin vacunas registradas</li>
              : pet.vaccines.map(v => <li key={v}>{v}</li>)
            }
          </ul>
        </div>
      )}

      {/* Consultas */}
      {tab === "consults" && (
        <div className="bg-white shadow rounded p-4 space-y-3">
          {pet.appointments.map((a, i) => (
            <div key={i} className="border-b pb-2">
              <p><strong>Fecha:</strong> {a.date}</p>
              <p><strong>Servicio:</strong> {a.service}</p>
              <p><strong>Veterinario:</strong> {a.veterinarian}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
