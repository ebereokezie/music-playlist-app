import { useState, useEffect, createContext} from 'react'
import Login from '../Login';
const UserContext = createContext()

function UserContextProvider({children}){
    const [user, setUser] = useState('');
  

    useEffect(() => {
      
      fetch("/me").then((data) => {
        if (data.ok) {
          data.json().then((user) => setUser(user));
        }
      });
    }, []);

    if (!user) return <Login onLogin = {setUser}/>;
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}