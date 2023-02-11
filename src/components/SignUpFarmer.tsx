import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from '../firebase';
const SignUpFarmer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <form>
        <input type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type='text' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type='submit'
          onClick={async(event) => {
            event.preventDefault();
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password)
              const user = userCredential.user;
              // ...
              console.log(user);
            } catch (e) {
              console.error(e);
            }
          }}
        > 
        Submit
        </button>
      </form>
    </div>
  )
}

export default SignUpFarmer;