import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PostCard from '@/myComponents/PostCard';
import Feed from '@/myComponents/Feed';





export default function Index() {
  const [posts, setPosts] = useState([]);
  const condition = 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.1.182:3000/')
        const data = await response.json();
        console.log(data);  
        setPosts(data);
      }
      catch (err) {
        console.error('Error from fetchPosts' + err);
      }
    }
    fetchPosts();
  }, [condition]);



  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Feed/>
      </View>
      <Text style={styles.postText}>{ }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#ffffff', // Темный фон карточки
    padding: 16,               // Внутренние отступы со всех сторон
    borderRadius: 12,          // Скругленные углы
    marginBottom: 12,          // Отступ снизу до следующего поста
    borderWidth: 1,            // Тонкая рамка
    borderColor: '#2a2a2a',    // Чуть светлее фона, чтобы выделить контур
  },

  // Если внутри карточки будет шапка поста (автор + дата)
  postHeader: {
    flexDirection: 'row',      // Выстраиваем автора и время в ряд
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,           // Отступ до текста поста
  },

  authorText: {
    color: '#ffffff',          // Белый никнейм
    fontWeight: 'bold',
    fontSize: 14,
  },

  dateText: {
    color: '#666666',          // Приглушенный серый для даты
    fontSize: 12,
  },

  postText: {
    color: '#e0e0e0',          // Светло-серый текст самого поста (не выжигает глаза)
    fontSize: 15,
    lineHeight: 20,            // Межстрочный интервал для читаемости
  },
});