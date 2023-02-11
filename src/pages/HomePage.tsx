import Navigation from "../components/Navigation";
import About from "../components/About";
import Callout from "../components/Callout";
import {Link} from 'react-router-dom'
import { PRODUCTPAGE } from "../constants/routes";
//import VerifyFarmer from "../components/VerifyFarmer";

export default function HomePage() {
  return (
      <div>
        <Navigation/>
        <About/>
        <Callout />
    
      </div>
  );
}