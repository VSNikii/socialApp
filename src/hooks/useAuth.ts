

export default function useAuth() {
    const sendAuthDataOnServer = async (email: string, password: string, fullName: string) => {
        const allPostData = {
            email,
            password,
            fullName
        }
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth` as any, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(allPostData),
            })
            console.log(response.status);


            return response.ok;

        } catch (err) {
            console.error('Ошибка соединения с сервером:', err);
            
            return false; //
        }
    }
    return { sendAuthDataOnServer }
}