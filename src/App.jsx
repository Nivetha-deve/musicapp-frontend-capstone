import PlaylistTracks from "./pages/PlaylistTrack";

const App = () => {

  const playlistId = '3cEYpjA9oz9GiPac4AsH4n';
  const market = 'ES';
  const fields = 'items(track(name,href,album(name,href)))';
  const limit = 10;
  const offset = 0;
  const additionalTypes = 'track,episode';


  return (
    <div>
       <PlaylistTracks
        playlistId={playlistId} 
        market={market} 
        fields={fields} 
        limit={limit} 
        offset={offset} 
        additionalTypes={additionalTypes} 
      />
    </div>
  )
}

export default App;
