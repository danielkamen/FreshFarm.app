import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import {
  LOGIN,
  SIGNUP,
  PRODUCEPAGE,
  CARTPAGE,
  HOME,
  MEETFARMERSPAGE,
  PROFILE,
} from "../constants/routes";
import { auth } from "../firebase";
import { useUserContext } from "../contexts/useUserContext";
import logo from "./farmfreshnavlogo.gif";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const features = [
  {
    name: "View Farmers",
    description: "Find local farmers",
    to: MEETFARMERSPAGE,
    icon: ChartBarIcon,
  },
  {
    name: "View Produce",
    description: "Find fresh produce near you",
    to: PRODUCEPAGE,
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Cart",
    description: "View your cart",
    to: CARTPAGE,
    icon: ShieldCheckIcon,
  },
];

export default function Navigation() {
  const { user } = useUserContext();
  let navigate = useNavigate();
  return (
    <Popover className="sticky bg-white z-10">
      <div
        className="pointer-events-none absolute inset-0 z-20 shadow"
        aria-hidden="true"
      />
      <div className="bg-[#F8F9F7] relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-5 px-4 md:justify-start md:space-x-10">
          {/** Logo and Company Name */}
          <div className="flex flex-1 mr-4">
            <div className="flex flex-row">
              <Link
                to={HOME}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex flex-row text-lg font-medium text-gray-500 hover:text-gray-900">
                <span className="sr-only">FreshFarm</span>
                <div className="transform transition duration-300">
                  <img className="min-h-6 min-w-6 w-8 h-8" src={logo} alt="" />
                </div>
                <div className="mx-2">
                  <h1>FreshFarm</h1>
                </div>
              </Link>
            </div>
          </div>
          {/** Middle Section */}
          <Popover.Group
            as="nav"
            className="hidden lg:flex lg:flex-auto space-x-10">
            <div className="flex w-full justify-center">
              <div className="flex flex-row bg-gray-100 rounded-lg">
                <div className="flex items-center pl-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 opacity-30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  className="flex bg-gray-100 outline-none border-transparent focus:ring-0 focus:border-transparent"
                  type="text"
                  placeholder="Search produce"
                />
                <div className="flex px-4 items-center rounded-lg bg-gray-200 text-gray-500 font-semibold">
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`${
                            open ? "text-gray-900" : "text-gray-500"
                          } group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-transparent`}>
                          <div className="flex flex-row items-center justify-center h-full">
                            <span className="truncate block">
                              All categories
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 font-semibold ml-1 -mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1">
                          <Popover.Panel className="absolute inset-x-0 top-full z-10 hidden transform shadow-lg md:block">
                            <div className="absolute inset-0 flex">
                              <div className="w-full bg-white" />
                            </div>
                            <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                              <div className="grid gap-y-10 bg-white px-4 h-16 py-8 sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                                {/** Search Categories Modal */}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
              <div className="bg-tertiary-accent ml-4 py-2 px-4 text-white font-semibold rounded-lg transition duration-3000 cursor-pointer flex items-center hover:bg-secondary">
                <span>Search</span>
              </div>
            </div>
          </Popover.Group>
          <div>
            <div className="hidden md:flex items-center">
              {!user ? (
                <>
                  <Link
                    to={LOGIN}
                    className="truncate block text-base font-medium text-primary hover:text-primary-accent">
                    Log In
                  </Link>
                  <Link
                    to={SIGNUP}
                    className="truncate block ml-8 items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-accent">
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="ml-4 flex flex-row items-center">
                  <Link
                    to={CARTPAGE}
                    className="group flex items-center p-2 mx-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-primary group-hover:text-primary-accent"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-primary group-hover:text-primary-accent">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="items-center inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-accent focus:outline-none focus:ring-0 focus:ring-transparent">
                        Account
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 font-semibold ml-1 -mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Menu.Item>
                            <div className="block px-4 py-2 text-sm">
                              Signed in as <strong>{user.email}</strong>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={PROFILE}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}>
                                <Link to={PROFILE} />
                                View Profile
                              </a>
                            )}
                          </Menu.Item>
                          <form onSubmit={() => {
                            signOut(auth);
                            navigate(HOME);
                            }}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}>
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>
          {/** Menu Button (Mobile only) */}
          <div className="flex justify-end flex-1 -my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-accent">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <img
                  className="min-h-6 min-w-6 w-8 h-8"
                  src={logo}
                  alt="FreshFarm"
                />
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-accent">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {features.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
            {!user ? (
              <>
              <Link
                to={SIGNUP}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-accent">
                Sign up
              </Link>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Already have an account?{" "}
                <Link
                  to={LOGIN}
                  className="text-primary hover:text-primary-accent">
                  Log In
                </Link>
              </p>
              </>
            ) : (
              <></>
            ) }
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
