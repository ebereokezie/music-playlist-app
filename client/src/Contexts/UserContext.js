import { useState, useEffect, createContext} from 'react'
import Login from '../Login';
const UserContext = createContext()

function UserContextProvider({children}){
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {
      setIsLoading(true)
      fetch('/me')
        .then((data) => {
          if (data.ok) {
            data.json().then((user) => {
              setUser(user);
              setIsLoading(false);
            });
          } else {
            setIsLoading(false);
          }
        });
    }, []);

    if (!localStorage.getItem('user')) return <Login onLogin = {setUser}/>;
    return(
        <UserContext.Provider value={{user, setUser, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}