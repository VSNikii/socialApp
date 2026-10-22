import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type VisibilityOption = 'public' | 'employers' | 'private';

interface VisibilityModalProps {
  visible: boolean;
  selected: VisibilityOption;
  onSelect: (option: VisibilityOption) => void;
  onClose: () => void;
}

const OPTIONS: {
  id: VisibilityOption;
  title: string;
  subtitle: string;
  badge?: string;
}[] = [
  {
    id: 'public',
    title: 'Публичный доступ',
    subtitle: 'Пост виден всем пользователям в общей ленте NoticeMe.',
  },
  {
    id: 'employers',
    title: 'Только для заказчиков',
    subtitle: 'Виден только работодателям и потенциальным клиентам.',
    badge: 'Pro / B2B',
  },
  {
    id: 'private',
    title: 'Приватный (Черновик)',
    subtitle: 'Доступен только вам и выбранным соавторам.',
  },
];

export const VisibilityModal: React.FC<VisibilityModalProps> = ({
  visible,
  selected,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Затемненный фон при клике закрывает шторку */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheetContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleBar} />

          <Text style={styles.title}>Видимость публикации</Text>
          <Text style={styles.description}>
            Выберите, кто сможет видеть данную работу в ленте
          </Text>

          <View style={styles.optionsList}>
            {OPTIONS.map((item) => {
              const isSelected = selected === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                >
                  <View style={styles.radioOuter}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>

                  <View style={styles.optionContent}>
                    <View style={styles.headerRow}>
                      <Text style={styles.optionTitle}>{item.title}</Text>
                      {item.badge && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Отмена</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#121214',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#3F3F46',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#A1A1AA',
    marginBottom: 20,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#18181B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  optionCardSelected: {
    borderColor: '#6366F1', // Индиго/акцентный цвет
    backgroundColor: '#1E1B4B',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#52525B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 14,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6366F1',
  },
  optionContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4F4F5',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  badge: {
    backgroundColor: '#312E81',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#818CF8',
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#27272A',
    borderRadius: 12,
  },
  cancelText: {
    color: '#FAFAFA',
    fontSize: 15,
    fontWeight: '600',
  },
});