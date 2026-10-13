import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function PostCard(props: any) {
    const {urlIconProf, urlIconPost, nickname, theme, date, textPost, textHead} = props
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
                    <Feather name="more-horizontal" size={20} color="#6b7280" />
                </TouchableOpacity>
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
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="heart-outline" size={22} color="#4b5563" />
                        <Text style={styles.actionText}>128</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="chatbubble-outline" size={20} color="#4b5563" />
                        <Text style={styles.actionText}>12</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity>
                    <Feather name="bookmark" size={20} color="#4b5563" />
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
});