import Link from 'next/link';
import { useContext,useState } from 'react';
import { auth } from '../lib/firebase';
import { UserContext } from '../lib/context';
export default function Navbar(){
  
    const { user, username } = useContext(UserContext);

    const signOut =  () => {
        auth.signOut();
      }
    return(
        <nav className="navbar">
            <ul>
            <li>
                <Link href="/">
                <button className="btn-logo">Stud Bud</button>
                </Link>
            </li>
    
            {/* user is signed-in and has username */}
            {user && (
                <>
                <li className="push-left">
                    <button onClick={signOut}>Sign Out</button>
                </li>
                <li>
                    <Link href="/createPost">
                    <button className="btn-blue">Create Card</button>
                    </Link>
                    <button>Study time?</button>
                </li>
                <li>
                    <Link href={"/profile"}>
                    <img src={user?.photoURL || '/hacker.png'} />
                    </Link>
                </li>
                </>
            )}
    
            {/* user is not signed OR has not created username */}
            {!user  && (
                <li>
                <Link href="/enter">
                    <button className="btn-blue">Log in</button>
                </Link>
                </li>
            )}
            </ul>
      </nav>
    )
}