import '../styles/globals.css'
import Navbar from '../components/navbar'
import { useUserData } from '../lib/hook';
import { UserContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return( 
      <UserContext.Provider value={userData}>
        <Navbar/>
        <Component {...pageProps} />
      </UserContext.Provider>

      
   
  )
}

export default MyApp
