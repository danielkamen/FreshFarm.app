import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import logo from "../images/freshfarmlogo.gif";
import { HOME, PROFILE, LOGIN } from "../constants/routes";

export default function SignupPage() {
  const [error, setError] = useState({ email: "", password: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFarmer, setIsFarmer] = useState<boolean>(false);
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div className="flex bg-[#F8F9F7] min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to={HOME} className="w-12 block">
                <img className="h-12 w-auto" src={logo} alt="Fresh Farm" />
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 animate-text font-extrabold text-4xl bg-clip-text bg-gradient-to-r from-lime-300 via-lime-600 to-green-800 text-transparent font-black">
                Sign up today!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  to={LOGIN}
                  className="font-medium text-tertiary-accent hover:text-secondary">
                  log in now
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  id="signup-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                      const userAuth = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                      );
                      const user = userAuth.user;
                      if (!isFarmer) {
                        await addDoc(collection(db, "buyers"), {
                          email_address: email,
                          created_at: new Date(),
                          updated_at: new Date(),
                          cart: [],
                          wishlist: [],
                        });
                      } else {
                        await addDoc(collection(db, "sellers"), {
                          email_address: email,
                          created_at: new Date(),
                          updated_at: new Date(),
                        });
                      }
                      if (user && !user.emailVerified) {
                        await sendEmailVerification(user);
                      }
                      await addDoc(collection(db, "users"), {
                        user_id: user.uid,
                        isFarmer: isFarmer,
                      });
                      navigate(PROFILE);
                    } catch (e: any) {
                      const err = (e as Error).message;
                      if (
                        err === "Firebase: Error (auth/email-already-in-use)."
                      ) {
                        setError({
                          email: "Email already exists.",
                          password: "",
                        });
                      } else if (
                        err ===
                        "Firebase: Password should be at least 6 characters (auth/weak-password)."
                      ) {
                        setError({
                          email: "",
                          password: "Password should be at least 6 characters",
                        });
                      } else {
                        setError({ email: "Invalid email", password: "" });
                      }
                      console.error(e);
                    }
                  }}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email-signup"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      {error.email !== "" && (
                        <div className="mb-3 text-normal text-red-500 ">
                          {error.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      {error.password !== "" && (
                        <div className="mb-3 text-normal text-red-500 ">
                          {error.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-tertiary-accent focus:ring-tertiary-accent"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="seller"
                        name="seller"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-tertiary-accent focus:ring-tertiary-accent"
                        onChange={(e) => setIsFarmer(e.target.checked)}
                        defaultChecked={searchParams.get("isFarmer") === "true"}
                      />
                      <label
                        htmlFor="seller"
                        className="ml-2 block text-sm text-gray-900">
                        I am a Farmer
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      form="signup-form"
                      className="flex w-full justify-center rounded-md border border-transparent bg-tertiary-accent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://img.freepik.com/premium-photo/happy-farmers-harvest-rice-together-with-sickles-during-day_8595-18204.jpg?w=1480"
          />
        </div>
      </div>
    </>
  );
}
