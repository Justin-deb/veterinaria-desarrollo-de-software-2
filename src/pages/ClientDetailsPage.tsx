import { useContext, useEffect, useState } from "react";
import type { Client } from "../models/Client.model";
import { ClientContext } from "../context/ClientContext";
import { getClientByID } from "../services/Client.service";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { updateClient } from "../services/Client.service";

const ClientDetailsPage = () => {
  const [client, setClient] = useState<Client | undefined>();
  const clientContext = useContext(ClientContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClient = async () => {
      try {
        setClient(await getClientByID(clientContext.clientID));
        console.log(client);
      } catch (error) {
        console.log(error);
      }
    };

    loadClient();
  }, []);

  const logoutHandler = () => {
    clientContext.setClientID("-1");
    navigate("/login");
  };

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setClient((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!client) return;

  try {
    await updateClient(client.id, client);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Client Settings</h1>
        <p className="text-zinc-400 mt-2">
          Manage your contact information and communication preferences.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* left: avatar + text */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500 bg-zinc-800 flex items-center justify-center">
                <FaUser className="text-3xl sm:text-4xl text-purple-500" />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                Profile Photo
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                This will be visible to your veterinarian.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex justify-center items-center bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-3 px-8 sm:px-10 text-sm"
          >
            Return
          </Link>
        </div>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={client?.firstName ?? ""}
                onChange={ChangeHandler}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={client?.lastName ?? ""}
                onChange={ChangeHandler}
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
              name="email"
              value={client?.email || ""}
              onChange={ChangeHandler}
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
              name="phone"
              value={client?.phone || ""}
              onChange={ChangeHandler}
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            />
          </div>

          <hr className="border-zinc-800" />

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-purple-500 hover:opacity-90 transition rounded-lg py-3 font-semibold"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-3"
              onClick={logoutHandler}
            >
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
