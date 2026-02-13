import { useContext, useEffect, useState } from "react";
import type { Client } from "../models/Client.model";
import { ClientContext } from "../context/ClientContext";
import { getClientByID } from "../services/Client.service";
import { FaUser } from "react-icons/fa";

const ClientDetailsPage = () => {
  const [client, setClient] = useState<Client | undefined>();
  const { clientID } = useContext(ClientContext);

  useEffect(() => {
    const loadClient = async () => {
      try {
        setClient(await getClientByID(clientID));
        console.log(client)
      } catch (error) {
        console.log(error);
      }
    };

    loadClient();
  }, [clientID]);

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
            <div className="w-24 h-24 rounded-full border-2 border-purple-500 bg-zinc-800 flex items-center justify-center">
              <FaUser className="text-4xl text-purple-500" />
            </div>

            <button className="absolute bottom-0 right-0 bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm"></button>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Profile Photo</h2>
            <p className="text-zinc-400 text-sm">
              This will be visible to your veterinarian.
            </p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                First Name
              </label>
              <input
                type="text"
                value={client?.firstName ?? ""}
                readOnly
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                Last Name
              </label>
              <input
                type="text"
                value={client?.LastName ?? ""}
                readOnly
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Email Address
            </label>
            <input
              type="email"
              value={client?.email || ""}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Used for appointment reminders and digital health records
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Phone Number
            </label>
            <input
              type="text"
              value={client?.phone || ""}
              readOnly
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            />
          </div>

          <hr className="border-zinc-800" />

          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition rounded-lg py-3 font-semibold">
              Save Changes
            </button>

            <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-3">
              Log Out
            </button>
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10 w-full max-w-2xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-2">🛡 Data Privacy</h3>
          <p className="text-sm text-zinc-400">
            Your personal data is encrypted and used only for clinic
            communication.
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
  );
};

export default ClientDetailsPage;
