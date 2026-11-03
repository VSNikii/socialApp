import { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function VerificationScreen() {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const inputs = useRef<Array<any>>([]);

  // Обработка обратного отсчета для повторной отправки
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleChangeText = (text: string, index: number) => {
    // Ввод только цифр
    const cleanText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    // Автопереход на следующее поле
    if (cleanText && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Переход на предыдущее поле при нажатии Backspace в пустой ячейке
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    // Логика повторной отправки кода...
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      console.log('Отправляемый код:', fullCode);
      // Логика подтверждения...
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          {/* Шапка / Логотип */}
          <View style={styles.header}>
            <Text style={styles.logo}>
              искра<Text style={styles.logoDot}>.</Text>
            </Text>
          </View>

          {/* Основной контент */}
          <View style={styles.content}>
            <Text style={styles.title}>Введи код</Text>
            <Text style={styles.subtitle}>
              Мы отправили 4-значный код на почту{' '}
              <Text style={styles.emailHighlight}>user@example.com</Text>
            </Text>

            {/* Ячейки ввода кода */}
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {(inputs.current[index] = ref)}}
                  style={[
                    styles.codeInput,
                    digit !== '' && styles.codeInputFilled,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Главная кнопка action */}
            <TouchableOpacity
              style={[
                styles.button,
                !isCodeComplete && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isCodeComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>

            {/* Блок повторной отправки */}
            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.resendLink}>Отправить код повторно</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Отправить код повторно через {timer} сек.
                </Text>
              )}
            </View>

            {/* Ссылка на изменение почты */}
            <TouchableOpacity style={styles.changeEmailContainer}>
              <Text style={styles.changeEmailText}>
                Неверный адрес? <Text style={styles.linkText}>Изменить почту</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE', // Светлый чистый фон как на макетах
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2563EB', // Фирменный синий бренд-цвет
    letterSpacing: -0.5,
  },
  logoDot: {
    color: '#2563EB',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 36,
  },
  emailHighlight: {
    color: '#0F172A',
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  codeInput: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
    // Небольшая тень для объема в стиле карточек
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  codeInputFilled: {
    borderColor: '#2563EB',
    backgroundColor: '#F0F5FF',
  },
  button: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  resendLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  changeEmailContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  changeEmailText: {
    fontSize: 14,
    color: '#64748B',
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});