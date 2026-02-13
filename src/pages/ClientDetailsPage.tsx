import { useState } from "react";
import type { Client } from "../models/Client.model";


const ClientDetailsPage = () => {
  const [client, setClient] = useState<Client | undefined>();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Client Settings</h1>
        <p className="text-zinc-400 mt-2">
          Manage your contact information and communication preferences.
        </p>
      </div>



      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img src="https://i.pravatar.cc/100"
              className="w-24 h-24 rounded-full border-2 border-purple-500" />
            <button className="absolute bottom-0 right-0 bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">

            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Profile Photo</h2>
            <p className="text-zinc-400 text-sm">
              This will be visible to your veterinarian.
            </p>
          </div>
        </div>


        <form className="space-y-6">

          <div>
            <label className="block mb-2 text-sm text-zinc-400">Full Name</label>
            <input type="text"
              value="Alex Johnson"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>


          <div>
            <label className="block mb-2 text-sm text-zinc-400">Email Address</label>
            <input type="email"
              value="alex.johnson@example.com"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <p className="text-xs text-zinc-500 mt-2">
              Used for appointment reminders and digital health records
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">Phone Number</label>
            <input type="text"
              value="+1 (555) 123-4567"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>

          <hr className="border-zinc-800" />

          <div className="space-y-4">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition rounded-lg py-3 font-semibold">
              Save Changes
            </button>

            <button
              className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-3">
              Log Out
            </button>
          </div>

        </form>

        <div className="flex justify-between items-center mt-8 text-sm text-zinc-500">
          <span>Last updated: Oct 24, 2023</span>
          <a href="#" className="text-purple-500 hover:underline">
            Deactivate Account
          </a>
        </div>

      </div>


      <div className="grid md:grid-cols-2 gap-6 mt-10 w-full max-w-2xl">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-2">🛡 Data Privacy</h3>
          <p className="text-sm text-zinc-400">
            Your personal data is encrypted and used only for clinic communication.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-2">🎧 Need Help?</h3>
          <p className="text-sm text-zinc-400">
            Our support team is available 24/7 for any technical issues.
          </p>
        </div>

      </div>


    </div>
  )
}

export default ClientDetailsPage;