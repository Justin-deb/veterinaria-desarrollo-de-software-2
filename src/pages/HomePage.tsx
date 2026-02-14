import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/ClientContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

const HomePage = () => {
  const context = useContext(ClientContext);
  const navigate = useNavigate();

  const [client, setClient] = useState<Client>()

  useEffect(() => {
    if(context.clientID === '-1') return;

    const loadClient = async () => {
      try {
        setClient(await getClientByID(context.clientID))
      } catch (error) {
        console.log(error);
      }
    } 
    loadClient()
  },[])

  if (context?.clientID === "-1") {
    return <Navigate to={"/login"} />;
  }

  const logoutHandler = () => {
    context?.setClientID('-1');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
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

            <button
              onClick={logoutHandler}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15">
              <PawPrint className="h-5 w-5 text-purple-300" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-zinc-400">
              TOTAL PETS
            </p>
            <p className="mt-2 text-4xl font-bold">3</p>
            <p className="mt-1 text-sm text-zinc-500">
              Max, Bella, and Cooper
            </p>
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
              Vaccination &amp; Deworming due
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
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
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
          <h3 className="mb-6 text-xl font-semibold">Upcoming Activity</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800" />
                <div>
                  <p className="font-semibold">Max • Rabies Vaccination</p>
                  <p className="text-sm text-zinc-400">
                    In 3 days • Health Clinic Downtown
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                HIGH PRIORITY
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800" />
                <div>
                  <p className="font-semibold">Bella • Dental Cleaning</p>
                  <p className="text-sm text-zinc-400">
                    Scheduled for Oct 28 • 09:15 AM
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                ROUTINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
