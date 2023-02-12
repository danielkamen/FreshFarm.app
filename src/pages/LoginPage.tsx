import React, { useState, Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Dialog, Transition } from '@headlessui/react'
import { auth } from "../firebase";
import { HOME, SIGNUP } from "../constants/routes";
import { useUserContext } from "../contexts/useUserContext";
import logo from "../images/freshfarmlogo.gif";

export default function LoginPage() {
  let navigate = useNavigate();
  const { setUser } = useUserContext();
  const [error, setError] = useState({ email: "", password: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [forgotPasswordIsOpen, setForgotPasswordIsOpen] = useState<boolean>(false);
  const [resetPasswordEmail,setResetPasswordEmail] = useState<string>('');
  const cancelButtonRef = useRef(null)

  return (
    <>
      <div className="flex bg-[#F8F9F7] min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to={HOME} className="w-12 block">
                <img className="h-12 w-auto" src={logo} alt="FreshFarm" />
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                <span className="animate-text font-extrabold text3xl bg-clip-text bg-gradient-to-r from-lime-300 via-lime-600 to-green-800 text-transparent font-black">   Sign in to your account</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  to={SIGNUP}
                  className="font-medium text-tertiary-accent hover:text-secondary">
                  sign up now
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  id="login-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                      const authUser = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                      );
                      setUser(authUser.user);
                      navigate(HOME);
                    } catch (e: any) {
                      const err = (e as Error).message;
                      if (
                        err ===
                        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
                      ) {
                        setError({
                          email: "",
                          password:
                            "Too many login attempts. Please try again later.",
                        });
                      } else {
                        setError({
                          email: "",
                          password: "Email or password is incorrect.",
                        });
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
                        id="email-login"
                        name="email"
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

                    <div className="text-sm">
                      <button
                        type="button"
                        className="font-medium text-secondary hover:text-secondary-accent"
                        onClick={(e) => {
                          e.preventDefault();
                          setForgotPasswordIsOpen(!forgotPasswordIsOpen);
                        }}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        >
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      form="login-form"
                      className="flex w-full justify-center rounded-md border border-transparent bg-tertiary-accent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                      Sign in
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
            alt=""
          />
        </div>
      </div>
      {<Transition.Root show={forgotPasswordIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setForgotPasswordIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Reset Password
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">
                          An email will be sent to the given address to reset your password.
                        </p>
                        <input
                          id="email-login"
                          name="email"
                          autoComplete="email"
                          placeholder="Email address"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                          value={resetPasswordEmail}
                          onChange={(event) => setResetPasswordEmail(event.target.value)}
                      />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={async () => {
                      try {
                        await sendPasswordResetEmail(auth, resetPasswordEmail);
                        setResetPasswordEmail('');
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  >
                    Reset password
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setForgotPasswordIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>}
    </>
  );
}
