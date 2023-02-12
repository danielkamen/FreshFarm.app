import { Link } from "react-router-dom"

import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Farmer } from "../types";
import Navigation from "../components/Navigation";


export default function MeetFarmersPage() {

  const [farmers, setFarmers] = useState<Array<Farmer>>([]);
  useEffect(() => {
    const fetchFarmers = async () => {
      const farmersData = await getDocs(collection(db, "sellers"));
      let farmersArray: Array<Farmer> = [];
      farmersData.forEach((doc) => {
        const farmerData = {
          id: doc.id,
          ...doc.data()
        } as Farmer;
        farmersArray.push(farmerData)
      })
      setFarmers(farmersArray);
    }
    fetchFarmers();
  }, [])

  
  return (
    
    <div>
      <Navigation/>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our
                Farmers</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're a dynamic group of individuals who are passionate about what we do and dedicated
                to delivering the
                best produce for our clients.
              </p>
            </div>
            <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
            {farmers.map((farmer) => (
              <div key={ farmer.id}>
                <Link to={farmer.id}>
                  <li key={farmer.name}>
                    <img className="aspect-[3/2] w-full rounded-2xl object-cover"
                         src={farmer.image_url} alt="not loaded"/>
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{farmer.name}</h3>
                    <p className="text-base leading-7 text-gray-600">{farmer.address}</p>
                </li>
                </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
    </div>
    
  )
  
}