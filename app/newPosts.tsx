import { useCreatePost } from '@/hooks/UseCreatePost/use-create-post';
import { VisibilityModal, VisibilityOption } from '@/myComponents/VisibilityPosts';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
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
  const [imageData, setImageData] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter();
  const [visibility, setVisibility] = useState<VisibilityOption>('public');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { createPost, isLoading } = useCreatePost();







  const OnPressPublishBtn = async () => {
    try {
      const allDataPost = {
        username: 'user',
        title: title,
        des: description,
        visibility: visibility,
        filter: format
      }
      await createPost(allDataPost, imageData)
      alert('Пост успешно создан!')
    }

    catch (err) {
      alert("Не удалось создать пост");
    }
  };

  const onPressBackButton = () => {
    router.push('./Feed');
  }

  const onPressAddImage = async () => {
    const permissionRes = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionRes) {
      alert('Нужен доступ к галерее, чтобы выбрать фото!');
      // здесь пересмотреть потом как нибудь
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // <--- Вот эта строчка заставляет iOS конвертировать HEIC в JPEG
      quality: 0.8,         // <--- И сжимает по качеству до нормального веса
    });
    if (!result.canceled) {
      setImageData(result.assets[0])
    }


  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onPressBackButton}>
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Новый пост</Text>
        <Text style={styles.brandText}>искра<Text style={{ color: '#2563eb' }}>.</Text></Text>
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
        {imageData === null ?
          (<View style={styles.card}>
            {/* Верхняя зона загрузки */}
            <View style={styles.uploadArea}>
              <View style={styles.iconCircle}>
                <Feather name="upload" size={24} color="#2563eb" />
              </View>

              <Text style={styles.title}>Добавьте работу</Text>
              <Text style={styles.subtitle}>
                Перетащите файл сюда или выберите его из галереи
              </Text>

              <TouchableOpacity style={styles.uploadButton} onPress={onPressAddImage} activeOpacity={0.85}>
                <Feather name="upload" size={18} color="#ffffff" style={styles.buttonIcon} />
                <Text style={styles.uploadButtonText}>Выбрать файл</Text>
              </TouchableOpacity>
            </View>

            {/* Пунктирный разделитель */}
            <View style={styles.dashedDivider} />

            {/* Нижняя панель */}
            <View style={styles.footer2}>
              <Text style={styles.infoText}>JPG, PNG, GIF до 10 МБ</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.actionText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>)
          :
          (<View style={styles.fileCard}>
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={() => setImageData(null)}>
                <Ionicons name="close" size={16} color="#1f2937" />
              </TouchableOpacity>
              <Image source={{ uri: imageData.uri }} width={350} height={250} />
            </View>
            <View style={styles.fileInfoRow}>
              <Text style={styles.fileNameText} numberOfLines={1}>
                {imageData.fileName}<Text style={styles.fileSizeText}>{imageData.fileSize}</Text>
              </Text>
              <TouchableOpacity activeOpacity={0.7} >
                <Text style={styles.replaceText} onPress={onPressAddImage}>Заменить</Text>
              </TouchableOpacity>
            </View>
          </View>)}


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
      <VisibilityModal visible={isModalOpen} selected={visibility} onSelect={(opt) => setVisibility(opt)} onClose={() => setIsModalOpen(false)} />
      {/* Нижняя кнопка публикации */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishButton} activeOpacity={0.8} onPress={OnPressPublishBtn}>
          <Text style={styles.publishButtonText}>Опубликовать</Text>
        </TouchableOpacity>
        <Text onPress={() => setIsModalOpen(true)} style={styles.footerSubtext}>Пост увидят все пользователи Искры</Text>
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
    backgroundColor: '#0084ff',
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
    zIndex: 1,
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
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    width: '100%',
  },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 18,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  dashedDivider: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    marginHorizontal: -2,
  },
  footer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#f8fafc',
  },
  infoText: {
    fontSize: 13,
    color: '#64748b',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
});