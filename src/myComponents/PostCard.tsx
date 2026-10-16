import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function PostCard(props: any) {
    const { urlIconProf, urlIconPost, nickname, theme, date, textPost, textHead } = props
    const [isLiked, setIsLiked] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isVisibleSettingsPost, setIsVisibleSettingsPost] = useState(false);

    const onPressLiked = () => {
        try {
            setIsLiked(!isLiked);
        }
        catch (err) {
            console.log('Error from onPressLiked: ', err);

        }
    }
    const onPressFav = () => {
        try {
            setIsFav(!isFav);
        }
        catch (err) {
            console.log('Error from onPressFav: ', err);

        }
    }

    const onPressSettingsPost = () => {
        try {
            setIsVisibleSettingsPost(!isVisibleSettingsPost);
        }
        catch (err) {
            console.log('Error from onPressFav: ', err);
        }
    }

    return (
        <View style={styles.card}>
            {/* Шапка поста: Аватар, имя, категория/время и кнопка опций */}
            <View style={styles.header}>
                <Image
                    source={{ uri: urlIconProf }}
                    style={styles.avatar}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.nickname} numberOfLines={1}>{nickname}</Text>
                    <Text style={styles.subInfo}>{theme}{date}</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={20} color="#6b7280" onPress={onPressSettingsPost} />
                </TouchableOpacity>
                {isVisibleSettingsPost && (
                    <View style={styles.miniModalPostOptions}>
                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={styles.optionText}>Скачать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={styles.optionText}>Поделиться</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionItem}>
                            <Text style={[styles.optionText, { color: '#ef4444' }]}>Пожаловаться</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Основная картинка поста */}
            <Image
                source={{ uri: urlIconPost }}
                style={styles.postImage}
            />

            {/* Заголовок */}
            <Text style={styles.title}>{textHead}</Text>

            {/* Текст описания */}
            <Text style={styles.description}>
                {textPost}
            </Text>

            {/* Нижняя панель действий (Лайки, комменты, закладка) */}
            <View style={styles.footer}>
                <View style={styles.actionsLeft}>
                    <View style={styles.actionButton}>
                        <Ionicons onPress={onPressLiked} size={22} color={isLiked ? "#ef4444" : "#4b5563"} name={isLiked ? 'heart' : 'heart-outline'} />
                        <Text style={styles.actionText}>128</Text>
                    </View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="chatbubble-outline" size={20} color="#4b5563" />
                        <Text style={styles.actionText}>12</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Ionicons name={isFav ? "bookmark" : "bookmark-outline"} size={20} color={isFav ? "#eab308" : "#4b5563"} onPress={onPressFav} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        margin: 16,
        // Тень для iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // Тень для Android
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerTextContainer: {
        flex: 1,
    },
    nickname: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    subInfo: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    postImage: {
        width: '100%',
        height: 280,
        borderRadius: 12,
        marginBottom: 12,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
        marginBottom: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        paddingTop: 12,
    },
    actionsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        color: '#4b5563',
        fontWeight: '500',
    },
    miniModalPostOptions: {
    position: 'absolute',
    top: 35, // Смещение под кнопку настроек
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 6,
    width: 150,
    // Тени для объема (чтобы выглядело как поп-ап)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, // Для Android
    zIndex: 10,   // Чтобы окно было поверх других элементов карточки
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#1f2937',
  },
});