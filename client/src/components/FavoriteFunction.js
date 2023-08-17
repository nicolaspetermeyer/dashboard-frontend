function FavoriteFunction() {
    const [favorite, setFavorite] = useState('');
    const [favorites, setFavorites] = useState([]);

  const fetchFavorite = async () => {
    try {
      const response = await fetch('http://172.23.4.80/api/favorite');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

const sendFavorite = async () => {
  try {
    const response = await fetch('http://172.23.4.80/api/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: favorite })
    });


    if (response.ok) {
      const newFavorite = await response.json();
      setFavorites([...favorites, newFavorite]);
      setFavorite('');
    } else {
      console.error('Error sending favorite:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending favorite:', error);
  }
};

useEffect(() => {
    fetchMessages();
  
    const interval = setInterval(fetchMessages, 1000);
  
    return () => clearInterval(interval)
  }, []);

}
export { FavoriteFunction };
