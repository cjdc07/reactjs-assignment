import * as React from 'react';
import axios from 'axios';

const API_URL = 'https://randomuser.me/api';

const useAppState = () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    try {
      const { data: { results } } = await axios.get(API_URL);
      const [ user ] = results;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }

  const refresh = () => {
    setUser(null);
    getUser();
  }

  return {
    user,
    refresh,
  }
}

function App() {
  const { user, refresh } = useAppState();

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="App" style={{padding: 8}}>
      <button onClick={refresh}>Refresh</button>
      <p>Name: {`${user.name['title']} ${user.name['first']} ${user.name['last']}`}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;
