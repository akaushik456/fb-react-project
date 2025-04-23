// src/utils/uploadImage.ts
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Check if response status is OK (200)
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const text = await res.text();
        
        // Parse JSON response
        const data = JSON.parse(text);

        if (data.success) {
            return data.imageUrl; // Return the image URL if successful
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    } catch (e) {
        console.error('Upload failed:', e);
        throw new Error('Upload failed or invalid response');
    }
};
