import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const LogIn: React.FC = () => {
    const {signInWithGoogle} = useAuth();
  return (
    <div>
        <button onClick={signInWithGoogle}>
            Log in with Google
        </button>
    </div>
  )
}

export default LogIn
