import { Fragment, useEffect, useState } from "react";
import logo from "./farmfreshnavlogo.gif";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import {
  LOGIN,
  SIGNUP,
  PRODUCTPAGE,
  CARTPAGE,
  HOME,
  MEETFARMERSPAGE,
} from "../constants/routes";
import { useUserContext } from "../contexts/useUserContext";

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
    to: PRODUCTPAGE,
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

  return (
    <Popover className="sticky top-0 bg-white z-10">
      <div
        className="pointer-events-none absolute inset-0 z-30 shadow"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          <div>
            <Link to={HOME} className="flex">
              <span className="sr-only">FarmFresh</span>
              <div className="h-8 w-auto sm:h-10">
                <div className="transform transition duration-300">
                  <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
                </div>
              </div>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-accent">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <div className="flex items-center justify-center">
                <Link
                  to={HOME}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-base font-medium text-gray-500 hover:text-gray-900">
                  <span className="truncate block">FreshFarm</span>
                </Link>
              </div>
              <div className="hidden lg:flex">
                <div className="flex flex-row flex-1 bg-gray-100 px-4 rounded-lg">
                  <div className="flex items-center">
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
                    placeholder="Search produce and farmers"
                  />
                  <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
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
                                className="h-6 w-6"
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
                                <div className="w-1/2 bg-white" />
                                <div className="w-1/2 bg-gray-50" />
                              </div>
                              <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                                <nav className="grid gap-y-10 bg-white px-4 py-8 sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12"></nav>
                                <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                                  <div className="mt-6 text-sm font-medium">
                                    <Link
                                      to={PRODUCTPAGE}
                                      className="text-primary hover:text-primary-accent">
                                      View all posts
                                      <span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
                <div className="bg-primary ml-4 py-2 px-4 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer flex items-center">
                  <span>Search</span>
                </div>
              </div>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              {!user ? (
                <>
                  <Link
                    to={LOGIN}
                    className="truncate block text-base font-medium text-primary hover:text-primary-accent">
                    Log In
                  </Link>
                  <Link
                    to={SIGNUP}
                    className="truncate block ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-accent">
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to={CARTPAGE}
                    className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-primary group-hover:text-primary-accent"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-primary group-hover:text-primary-accent">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              )}
            </div>
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
                <div>
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </div>
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
              <div className="mt-6">
                <Link
                  to={SIGNUP}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-accent">
                  Sign up
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link
                    to={LOGIN}
                    className="text-primary hover:text-primary-accent">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
