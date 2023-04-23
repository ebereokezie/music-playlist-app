songs = Song.create([
    {
        title: "Work",
        artist: "Rihanna ft. Drake",
        album: "Anti"
    },
    {
        title: "22",
        artist: "Taylor Swift",
        album: "Red"
    },
    {
        title: "God's Plan",
        artist: "Drake",
        album: "Scorpion"
    },
    {
        title: "Jesus, Take the Wheel",
        artist: "Carrie Underwood",
        album: "Some Hearts"
    },
    {
        title: "Set Fire To The Rain",
        artist: "Adele",
        album: "21"
    },
    {
        title: "I Write Sins Not Tragedies",
        artist: "Panic! At The Disco",
        album: "A Fever You Can't Sweat Out"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours"
    },
    {
        title: "No Role Modelz",
        artist: "J.Cole",
        album: "2014 Forest Hills Drive"
    },
    {
        title: "Poetic Justice",
        artist: "Kendrick Lamar",
        album: "good kid, m.A.A.d city"
    },
    {
        title: "Bad Habit",
        artist: "Steve Lacy",
        album: "Gemini Rights"
    }
])

users = User.create([
    {
        username: "Admin",
        password: "Admin"
    }
])

playlists = Playlist.create([
    {
        title: "Party Playlist", 
        user_id: 1
    },
    {
        title: "Workout Playlist",
        user_id: 1
    }
])

playlist_songs = PlaylistSong.create([
    {
        playlist_id: 1,
        song_id: 1
    },
    {
        playlist_id: 1,
        song_id: 2
    },
    {
        playlist_id: 1,
        song_id: 6
    },
    {
        playlist_id: 2,
        song_id: 7
    },
    {
        playlist_id: 2,
        song_id: 9
    },
    {
        playlist_id: 2,
        song_id: 10
    }
])