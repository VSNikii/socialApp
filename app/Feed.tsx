import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import PostCard from '../src/myComponents/PostCard';
import NewPosts from './newPosts';
import { useRouter } from 'expo-router';

const CATEGORIES = ['Всё', 'Искусство', 'Музыка', 'Тексты'];

// Фиксированные отступы вместо safe area. Подгоняйте под себя:
const TOP_PADDING = 56;     // под вырез / Dynamic Island (меньше -> логотип выше)
const BOTTOM_PADDING = 24;  // под жестовую полосу (меньше -> панель ниже по высоте)

export default function FeedScreen() {
    const [activeTab, setActiveTab] = useState('forYou');
    const [selectedCategory, setSelectedCategory] = useState('Всё');
    const router = useRouter();

    const onPressAddPost = () => {
        router.push('./newPosts');
    }


    return (
        <View style={styles.container}>
            {/* 1. Верхний бар с логотипом и иконками */}
            <View style={[styles.topBar, { paddingTop: TOP_PADDING }]}>
                <Text style={styles.logo}>искра<Text style={styles.dot}>.</Text></Text>
                <View style={styles.topIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="search" size={22} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="bell" size={22} color="#111827" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Лента с постами */}
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Заголовок и подзаголовок */}
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.mainTitle}>Твоё вдохновение</Text>
                    <Text style={styles.subtitle}>Новые голоса. Свежие идеи. Каждый день.</Text>
                </View>

                {/* Переключатели: Для тебя / Подписки */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveTab('forYou')}
                        style={styles.tabItem}
                    >
                        <Text style={[styles.tabText, activeTab === 'forYou' && styles.activeTabText]}>
                            Для тебя
                        </Text>
                        {activeTab === 'forYou' && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab('subscriptions')}
                        style={styles.tabItem}
                    >
                        <Text style={[styles.tabText, activeTab === 'subscriptions' && styles.activeTabText]}>
                            Подписки
                        </Text>
                        {activeTab === 'subscriptions' && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                </View>

                {/* Горизонтальный скролл фильтров */}
                <View style={styles.categoriesWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setSelectedCategory(cat)}
                                    style={[styles.categoryChip, isActive && styles.activeCategoryChip]}
                                >
                                    <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Посты */}
                <View style={styles.feedContainer}>
                    <PostCard
                        urlIconProf={'https://bipbap.ru/wp-content/uploads/2021/07/1525256972_15.jpg'}
                        urlIconPost={'https://th.bing.com/th/id/R.f51cc9a27eb78a17d45e4194d04934c3?rik=EQzHjJTAZbAyHw&riu=http%3a%2f%2fbipbap.ru%2fwp-content%2fuploads%2f2017%2f09%2f0_14a7fc_411c2622_XXL.jpg&ehk=QOZy8GSCZm7okOWIWFCtE45JK9%2bxr0RNEyF5cAYd9Wg%3d&risl=&pid=ImgRaw&r=0'}
                        nickname={'Nikita'}
                        theme={'Живопись'}
                        date={'15 минут назад'}
                        textHead={'Пока город спит'}
                        textPost={'Собрала утро из любимых цветов. Гуашь, бумага и немного тишины.'}
                    />
                    <PostCard
                        urlIconProf={'https://ts1.mm.bing.net/th?id=OIP.PVOkV6Xy0z7Q0aS8lsDqAwHaEo&pid=15.1'}
                        urlIconPost={'https://ts4.mm.bing.net/th?id=OIP.Q8FA8SGnMJfgfpmOBCfkugHaIu&pid=15.1'}
                        nickname={'Марк Лис'}
                        theme={'Музыка'}
                        date={'1 час назад'}
                        textHead={'После дождя'}
                        textPost={'Мой новый инди-трек для ночных прогулок без определенного маршрута.'}
                    />
                    <PostCard
                        urlIconProf={'https://abrakadabra.fun/uploads/posts/2021-12/1640696260_11-abrakadabra-fun-p-prikolnie-zastavki-na-rabochii-stol-kompyu-12.jpg'}
                        urlIconPost={'https://bipbap.ru/wp-content/uploads/2017/04/vodopad_techenie_obryv_teni_les_solnce_svet_1680x1050.jpg'}
                        nickname={'Соня Ветрова'}
                        theme={'Поэзия'}
                        date={'2 часа назад'}
                        textHead={'Не спеши'}
                        textPost={'Мы вырастем из этих городов, из тесных курток, старых обещаний...'}
                    />
                    <PostCard
                        urlIconProf={'https://i.pinimg.com/originals/b6/fc/05/b6fc0514cabfa0f434278903084c594c.jpg'}
                        urlIconPost={'https://tse2.mm.bing.net/th/id/OIP.AZ1pKOxaMGk12SCp26X7RwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'}
                        nickname={'Илья Квант'}
                        theme={'Дизайн'}
                        date={'3 часа назад'}
                        textHead={'Киберпанк-мотивы в UI'}
                        textPost={'Экспериментирую с темной темой и неоновыми акцентами для нового проекта.'}
                    />
                </View>
            </ScrollView>

            {/* 3. Нижняя панель */}
            <View style={[styles.bottomNav, { paddingBottom: BOTTOM_PADDING }]}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home" size={24} color="#2563eb" />
                    <Text style={[styles.navText, styles.activeNavText]}>Лента</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={onPressAddPost}>
                    <Ionicons name="add" size={28} color="#ffffff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Feather name="user" size={24} color="#9ca3af" />
                    <Text style={styles.navText}>Профиль</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: '#f8fafc',
    },
    logo: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1e3a8a',
    },
    dot: {
        color: '#2563eb',
    },
    topIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconBtn: {
        padding: 4,
    },
    scroll: {
        flex: 1,
    },
    headerTitleContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    tabItem: {
        marginRight: 24,
        paddingBottom: 10,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#94a3b8',
    },
    activeTabText: {
        color: '#0f172a',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#2563eb',
        borderRadius: 2,
    },
    categoriesWrapper: {
        marginVertical: 12,
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        marginRight: 8,
    },
    activeCategoryChip: {
        backgroundColor: '#2563eb',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#475569',
    },
    activeCategoryText: {
        color: '#ffffff',
    },
    feedContainer: {
        marginTop: 4,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navText: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
    },
    activeNavText: {
        color: '#2563eb',
        fontWeight: '600',
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
});
