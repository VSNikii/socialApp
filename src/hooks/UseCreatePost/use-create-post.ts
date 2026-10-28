import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import { useState } from "react";
import { supabase } from '../../utils/supabase/supabase';


export const useCreatePost = () => {
    console.log('Айпи сервака' + process.env.EXPO_);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const createPost = async (postData: any, fileData: any) => {
        setIsLoading(true);
        setError(null);

        try {
            let fileUrl = null;

            if (fileData && fileData.uri) {
                console.log("Читаем файл с устройства");
                const base64 = await FileSystem.readAsStringAsync(fileData.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                const fileExt = fileData.uri.split('.').pop() || '.jpg';
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `posts/${fileName}`;

                console.log('Загружаем файл в бакет NoticeMe');

                const { error: uploadError } = await supabase.storage
                    .from('NoticeMe')
                    .upload(filePath, decode(base64), {
                        contentType: fileData.mimeType || 'image/jpeg',
                        upsert: false,
                    })
                if (uploadError) {
                    throw new Error(`Ошибка загрузки в Supabase: ${uploadError.message}`)
                }

                const { data: publicUrlData } = supabase.storage
                    .from('NoticeMe')
                    .getPublicUrl(filePath);
                fileUrl = publicUrlData.publicUrl;
                console.log("Файл успешно загружен. URL:", fileUrl);
            }

            const postPayload = {
                ...postData,
                fileUrl: fileUrl,
            };

            const response = await fetch(process.env.EXPO_PUBLIC_API_URL as any, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postPayload)
            });
            if (!response.ok) {
                const errorText = await response.text(); // Читаем, что именно ответил сервер
                console.log("Ответ бэкенда с ошибкой:", errorText);
                throw new Error(`Ошибка (${response.status}): ${errorText}`);
            }
        }
        catch (err: any) {
            console.error("Error from useCreatePost: ", err);
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return { createPost, isLoading, error }
}