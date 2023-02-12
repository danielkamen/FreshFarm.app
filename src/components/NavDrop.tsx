import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Category } from "../types";
import { useCategoryContext } from "../contexts/useCategoryContext";

export default function NavDropDown() {
  const [selected, setSelected] = useState<Category | null>(null);
  const { categories } = useCategoryContext();

  return (
    <Listbox
      value={selected}
      onChange={(value) => (value ? setSelected(value) : setSelected(null))}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md  bg-grey-100 py-2 pl-3 pr-10 text-left focus:bg-grey-200  sm:text-sm">
              <span className="flex items-center">
                {selected !== null ? (
                  <img
                    src={selected.image_url}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                ) : (
                  <Squares2X2Icon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">
                  {selected !== null ? selected.name : "All Categories"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
                          as={Fragment}
                          enter="transition ease-out duration-300"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-250"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1">
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-hidden rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                {categories.map((Category) => (
                  <Listbox.Option
                    key={Category.id}
                    className={({ active }) =>
                      `${
                        active ? "text-white bg-indigo-600" : "text-gray-900"
                      } relative cursor-default select-none py-2 pl-3 pr-9`
                    }
                    value={Category.name}>
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={Category.image_url}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } ml-3 block truncate`}>
                            {Category.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={`${
                              active ? "text-white" : "text-indigo-600"
                            } absolute inset-y-0 right-0 flex items-center pr-4`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
