import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function NewPosts() {
  const [format, setFormat] = useState('Искусство');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Новый пост</Text>
        <Text style={styles.brandText}>искра<Text style={{color: '#2563eb'}}>.</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Формат публикации */}
        <Text style={styles.label}>Формат публикации</Text>
        <View style={styles.tabsContainer}>
          {['Искусство', 'Музыка', 'Текст'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.tab, format === item && styles.activeTab]}
              onPress={() => setFormat(item)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, format === item && styles.activeTabText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Карточка превью файла */}
        <View style={styles.fileCard}>
          <View style={styles.imageContainer}>
            {/* Сюда можно подставить локальный файл или URL картинки */}
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500' }} 
              style={styles.previewImage} 
            />
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.8}>
              <Ionicons name="close" size={16} color="#1f2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.fileInfoRow}>
            <Text style={styles.fileNameText} numberOfLines={1}>
              Город_утро.jpg <Text style={styles.fileSizeText}>· 2,4 МБ</Text>
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.replaceText}>Заменить</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Название работы */}
        <Text style={styles.label}>Название работы</Text>
        <TextInput 
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Введите название"
          placeholderTextColor="#9ca3af"
        />

        {/* Описание */}
        <Text style={styles.label}>Описание</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Расскажите о своей работе..."
          placeholderTextColor="#9ca3af"
          multiline
          textAlignVertical="top"
        />

      </ScrollView>

      {/* Нижняя кнопка публикации */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishButton} activeOpacity={0.8}>
          <Text style={styles.publishButtonText}>Опубликовать</Text>
        </TouchableOpacity>
        <Text style={styles.footerSubtext}>Пост увидят все пользователи Искры</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563eb',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  activeTabText: {
    color: '#ffffff',
  },
  fileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginTop: 16,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#e2e8f0',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  fileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  fileNameText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  fileSizeText: {
    color: '#94a3b8',
  },
  replaceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  textArea: {
    height: 110,
    paddingTop: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  publishButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  footerSubtext: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
  },
});