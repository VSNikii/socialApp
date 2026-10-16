import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Feed from '@/myComponents/Feed';

export default function Index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.1.182:3000/');
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.error('Error from fetchPosts', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Feed />
    </View>
  );
}