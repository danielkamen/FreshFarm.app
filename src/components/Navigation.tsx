import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  LOGIN,
  SIGNUP,
  PRODUCEPAGE,
  CARTPAGE,
  HOME,
  MEETFARMERSPAGE,
  PROFILE,
  SEARCHRESULTPAGE,
} from "../constants/routes";
import { auth } from "../firebase";
import { useUserContext } from "../contexts/useUserContext";
import logo from "../images/freshfarmlogo.gif";
import NavDropDown from "./NavDropdown";
import { useSearchContext } from "../contexts/useSearchContext";

const features = [
  {
    name: "Browse Produce",
    description: "Find fresh produce near you",
    to: PRODUCEPAGE,
    icon: Squares2X2Icon,
  },
  {
    name: "Meet Our Farmers",
    description: "Find local farmers",
    to: MEETFARMERSPAGE,
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Cart",
    description: "View your cart",
    to: CARTPAGE,
    icon: ShoppingCartIcon,
  },
];

export default function Navigation() {
  const { user } = useUserContext();
  const { searchTerm, setSearchTerm } = useSearchContext();
  let navigate = useNavigate();

  return (
    <Popover className="sticky bg-white z-10">
      <div
        className="pointer-events-none absolute inset-0 z-20 shadow"
        aria-hidden="true"
      />
      <div className="bg-[#F8F9F7] relative z-20">
        <div className="mx-auto flex max-w-full items-center justify-between py-5 px-4 xl:px-8 md:justify-start md:space-x-10">
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
                  <h1>Fresh Farm</h1>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchTerm) {
                      navigate(`${SEARCHRESULTPAGE}?searchTerm=${searchTerm}`);
                    } else {
                      navigate(0);
                    }
                  }}>
                  <input
                    value={searchTerm}
                    className="flex bg-gray-100 outline-none border-transparent focus:ring-0 focus:border-transparent"
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search produce"
                  />
                </form>
                <NavDropDown />
              </div>
              <button
                onClick={() => {
                  if (searchTerm) {
                    navigate(`${SEARCHRESULTPAGE}?searchTerm=${searchTerm}`);
                  } else {
                    navigate(0);
                  }
                }}
                className="bg-primary ml-4 py-2 px-4 text-white font-semibold rounded-lg transition duration-3000 cursor-pointer flex items-center hover:bg-primary-accent">
                <span>Search</span>
              </button>
            </div>
          </Popover.Group>
          <div className="flex flex-1 ml-4 justify-end">
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
                    className="truncate block ml-8 items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm  hover:bg-primary-accent">
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="flex flex-row items-center">
                  <Link
                    to={CARTPAGE}
                    className="group flex items-center p-2 mx-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-primary group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-primary group-hover:text-primary-accent">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        id="dropdownInformationButton"
                        data-dropdown-toggle="dropdownInformation"
                        className="text-white bg-primary hover:bg-primary-accent font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                        type="button">
                        Account
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-300"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-200"
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
                                className={`
                                  ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } block px-4 py-2 text-sm`}>
                                <Link to={PROFILE} />
                                Manage Profile
                              </a>
                            )}
                          </Menu.Item>
                          <form
                            onSubmit={() => {
                              signOut(auth);
                              navigate(HOME);
                            }}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={`
                                    ${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block w-full px-4 py-2 text-left text-sm`}>
                                  Sign Out
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
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
