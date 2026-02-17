import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/ClientContext";
import { Link, Navigate } from "react-router-dom";
import {
  PawPrint,
  CalendarDays,
  Bell,
  Pencil,
  User,
  AlertTriangle,
} from "lucide-react";
import type { Client } from "../models/Client.model";
import { getClientByID } from "../services/Client.service";
import PetActivity from "../components/PetActivity";

const HomePage = () => {
  const date = new Date(); 
  const context = useContext(ClientContext);

  const [client, setClient] = useState<Client>();

  useEffect(() => {
    if (context.clientID === "-1") return;

    const loadClient = async () => {
      try {
        setClient(await getClientByID(context.clientID));
      } catch (error) {
        console.log(error);
      }
    };
    loadClient();
  }, []);

  if (context?.clientID === "-1") {
    return <Navigate to={"/login"} />;
  }
  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-105 w-105 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {client?.firstName}
            </h1>
            <p className="mt-2 text-zinc-400">
              Your pets are looking forward to seeing you. Everything is on
              track.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-purple-300">
              <CalendarDays className="h-4 w-4" />
              Tuesday, October 24th
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15">
              <PawPrint className="h-5 w-5 text-purple-300" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-zinc-400">
              TOTAL PETS {/*Datos quemados que hay que quitar */}
            </p>
            <p className="mt-2 text-4xl font-bold">3</p>
            <p className="mt-1 text-sm text-zinc-500">Max, Bella, and Cooper</p>
          </div>

          <div className="rounded-2xl border border-purple-600/70 bg-zinc-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15">
              <CalendarDays className="h-5 w-5 text-purple-300" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-zinc-400">
              NEXT APPOINTMENT
            </p>
            <p className="mt-2 text-4xl font-bold">Oct 24th</p>
            <p className="mt-1 text-sm text-zinc-500">
              Annual Checkup at 10:00 AM
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
              <Bell className="h-5 w-5 text-yellow-300" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-zinc-400">
              ACTIVE REMINDERS
            </p>
            <p className="mt-2 text-4xl font-bold">2</p>
            <p className="mt-1 text-sm text-zinc-500">
              Vaccination &amp; Deworming due {/*quejezo */}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Need to update something?</h3>
            <p className="mt-2 text-zinc-400">
              Quickly manage your furry friends or update your contact
              information.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
              <Pencil className="h-4 w-4" />
              <Link to={"pets"}>Manage My Pets</Link>
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-900 transition">
              <User className="h-4 w-4" />
              <Link to={"clientDetails"}>View details</Link>
            </button>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-xl font-semibold">Latest Activities</h3>

          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-semibold">Latest Activities</h3>

            <div className="space-y-4">
              {!client!.petList ? (
                <p>No activity to show</p>
              ) : (
                client!.petList.map((pet) => (
                  <PetActivity
                    petName={pet.petName}
                    appoiment={pet.appointments[pet.appointments.length - 1]}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
