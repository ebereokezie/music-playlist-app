import { useState, useEffect, createContext} from 'react'

const PlaylistContext = createContext()

function PlaylistContextProvider({children}){
    const [playlists, setPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {
        setIsLoading(true)
        fetch("/playlists")
        .then((data) => {
            if (data.ok) {
                setIsLoading(false);
                data.json()
                .then(data => setPlaylists(data))
            } else {
                data.json()
                .then((err) => console.log(err.errors))
            }
    })
}, [])

 
    return(
        <PlaylistContext.Provider value={{playlists, setPlaylists, isLoading, setIsLoading}}>
            {children}
        </PlaylistContext.Provider>
    )
}

export {PlaylistContext, PlaylistContextProvider}