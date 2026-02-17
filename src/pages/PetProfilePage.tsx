import { useContext, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import type { Pet } from "../models/Pet.model";
import { getPetByName } from "../services/Pet.service";
import { ClientContext } from "../context/ClientContext";
import {
  PawPrint,
  Syringe,
  Stethoscope,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

type TabKey = "summary" | "vaccines" | "consults";

const normalize_name = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const pick_pet_emoji = (species: string) => {
  const s = species.trim().toLowerCase();
  if (s.includes("dog")) return "🐶";
  if (s.includes("cat")) return "🐱";
  if (s.includes("bird")) return "🦜";
  if (s.includes("rabbit")) return "🐰";
  if (s.includes("reptile") || s.includes("gecko") || s.includes("lizard"))
    return "🦎";
  return "🐾";
};

export default function PetProfilePage() {
  const { name } = useParams<{ name: string }>();
  const clientContext = useContext(ClientContext);

  const [pet, setPet] = useState<Pet | undefined>();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabKey>("summary");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const loadPet = async () => {
      try {
        setError(null);
        setLoading(true);

        const found = await getPetByName(name, clientContext!.clientID);
        setPet(found);
      } catch (e) {
        setError("Something went wrong while loading this pet.");
        setPet(undefined);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [name, clientContext]);

  if (clientContext?.clientID === "-1") {
    return <Navigate to="/login" />;
  }

  /*const header_subtitle = useMemo(() => {
    if (!pet) return "";
    return [pet.species, pet.breed].filter(Boolean).join(" • ");
  }, [pet]); */

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        {/* Back */}
        <div className="mb-8">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pets
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-44 rounded bg-white/10 animate-pulse" />
                <div className="mt-3 h-3 w-64 rounded bg-white/10 animate-pulse" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
              <div className="h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
              <div className="h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Error</p>
                <p className="mt-1 text-sm text-red-200/90">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Not found */}
        {!loading && !error && !pet && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-lg font-semibold">Pet not found</p>
            <p className="mt-2 text-sm text-zinc-400">
              We couldn’t find a pet named{" "}
              <span className="text-zinc-200 font-semibold">{name || "—"}</span>{" "}
              for this account.
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && pet && (
          <>
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Pet Profile
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  {normalize_name(pet.petName)}
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight">
                  {pet.petName}
                </h1>

                <p className="mt-2 text-zinc-400">{[pet.species, pet.breed].filter(Boolean).join(" • ") || "—"}</p>
              </div>

              {/* Corner badge (simple + pro) */}
              <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/35 to-fuchsia-500/15 ring-1 ring-white/10">
                    <span className="text-2xl">
                      {pick_pet_emoji(pet.species)}
                    </span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                </div>
              </div>
            </div>

            {/* Top cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15">
                  <PawPrint className="h-5 w-5 text-purple-300" />
                </div>
                <p className="text-xs font-semibold tracking-wider text-zinc-400">
                  AGE
                </p>
                <p className="mt-2 text-3xl font-bold">{pet.age}</p>
                <p className="mt-1 text-sm text-zinc-500">years</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Syringe className="h-5 w-5 text-emerald-300" />
                </div>
                <p className="text-xs font-semibold tracking-wider text-zinc-400">
                  VACCINES
                </p>
                <p className="mt-2 text-3xl font-bold">{pet.vaccines.length}</p>
                <p className="mt-1 text-sm text-zinc-500">registered</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                  <Stethoscope className="h-5 w-5 text-yellow-300" />
                </div>
                <p className="text-xs font-semibold tracking-wider text-zinc-400">
                  CONSULTS
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {pet.appointments.length}
                </p>
                <p className="mt-1 text-sm text-zinc-500">appointments</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTab("summary")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    tab === "summary"
                      ? "bg-black text-white border border-white/10"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  Summary
                </button>

                <button
                  onClick={() => setTab("vaccines")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    tab === "vaccines"
                      ? "bg-black text-white border border-white/10"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  Vaccines
                </button>

                <button
                  onClick={() => setTab("consults")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    tab === "consults"
                      ? "bg-black text-white border border-white/10"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  Consults
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Main */}
              <div className="lg:col-span-2">
                {tab === "summary" && (
                  <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold">Summary</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Detailed information about this pet.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                        <p className="text-xs text-zinc-500">Species</p>
                        <p className="mt-1 font-semibold">{pet.species}</p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                        <p className="text-xs text-zinc-500">Breed</p>
                        <p className="mt-1 font-semibold">{pet.breed}</p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                        <p className="text-xs text-zinc-500">Age</p>
                        <p className="mt-1 font-semibold">{pet.age} years</p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                        <p className="text-xs text-zinc-500">
                          Weight (optional)
                        </p>
                        <p className="mt-1 font-semibold">—</p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 sm:col-span-2">
                        <p className="text-xs text-zinc-500">
                          Allergies (optional)
                        </p>
                        <p className="mt-1 font-semibold">—</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-white/80">
                        Recent notes
                      </h3>

                      <ul className="mt-3 space-y-3">
                        {pet.appointmentDescriptions.length === 0 ? (
                          <li className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-400">
                            No recent notes.
                          </li>
                        ) : (
                          pet.appointmentDescriptions.map((line, idx) => (
                            <li
                              key={idx}
                              className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-300"
                            >
                              {line}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </section>
                )}

                {tab === "vaccines" && (
                  <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold">Vaccines</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Vaccination records for this pet.
                    </p>

                    <div className="mt-6 space-y-3">
                      {pet.vaccines.length === 0 ? (
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-400">
                          No vaccines registered.
                        </div>
                      ) : (
                        pet.vaccines.map((v) => (
                          <div
                            key={v}
                            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4"
                          >
                            <div>
                              <p className="font-semibold">{v}</p>
                              <p className="text-xs text-zinc-500">
                                Status: Active
                              </p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                              OK
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )}

                {tab === "consults" && (
                  <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold">Consults</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Visit history for this pet.
                    </p>

                    <div className="mt-6 space-y-3">
                      {pet.appointments.length === 0 ? (
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-400">
                          No consults registered.
                        </div>
                      ) : (
                        pet.appointments.map((a, i) => (
                          <div
                            key={`${a.date}-${i}`}
                            className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                          >
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <p className="font-semibold">{a.service}</p>
                              <span className="text-sm text-zinc-400">
                                {a.date}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-zinc-400">
                              Veterinarian:{" "}
                              <span className="text-zinc-200 font-semibold">
                                {a.veterinarian}
                              </span>
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                )}
              </div>

              {/* Side card */}
              <aside className="space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <h3 className="text-base font-semibold">Owner notes</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Add food, behavior, medication, or care details.
                  </p>

                  <div className="mt-4 rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-300">
                    Eats twice a day. Energy level: high.
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <h3 className="text-base font-semibold">Quick facts</h3>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                      <p className="text-xs text-zinc-500">Microchip</p>
                      <p className="mt-1 font-semibold">Not registered</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                      <p className="text-xs text-zinc-500">Preferred clinic</p>
                      <p className="mt-1 font-semibold">VetPet Downtown</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
