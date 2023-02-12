import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from "firebase/firestore";
import Navigation from '../components/Navigation';
import { HOME } from '../constants/routes';
import { useUserContext } from '../contexts/useUserContext';
import { db } from '../firebase';

export default function ProfilePage() {
  let navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');

  const { isFarmer, collectionUID } = useUserContext();

  return (

    <div>
      <header className="relative bg-white">
        <Navigation />
      </header>
      
      <form className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          console.log(collectionUID);
          if (isFarmer) {
            await setDoc(doc(db, "sellers", collectionUID), {
              name: name,
              address: address + ', ' + city + ', ' + state + ' ' + zip,
              phone_number: phoneNumber,
              updated_at: new Date(),
              image_url: photo,
              description: description
            }, { merge: true });
          } else {
            await setDoc(doc(db, "buyers", collectionUID), {
              name: name,
              address: address + ', ' + city + ', ' + state + ' ' + zip,
              phone_number: phoneNumber,
              updated_at: new Date()
            }, { merge: true });
          }
        } catch (e) {
          console.log(e);
          setError('Error updating profile. Please try again later.');
          setName('');
          setPhoneNumber('');
          setAddress('');
          setCity('');
          setState('');
          setZip('');
          setDescription('');
          setPhoto('');
        }
      }}>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              {isFarmer &&
                <div>
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="you@example.com"
                        defaultValue={''}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              onChange={e => {
                                if (e.target.files) {
                                  setPhoto(URL.createObjectURL(e.target.files[0]));
                                }}
                              }/>
                            {photo.length !== 0 && <img src={photo} alt='preview' />}
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                }
            </div>
          </div>
        </div>
  
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
  
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="phone-number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
  
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
  
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
  
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={zip}
                    onChange={(e) => {
                      setZip(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='items-center'>
        {error !== '' && (
          <div className="ml-5 text-normal text-red-500 ">{error}</div>
        )}
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                navigate(HOME)
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
