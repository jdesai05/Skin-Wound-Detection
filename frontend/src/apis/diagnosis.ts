import { apiclient } from "./client";

export interface DiagnosisResult {
    condition: string;
    first_aid: string;
    remedy: string;
    disclaimer: string;
}

export interface DiagnoseImageResponse {
    filename: string;
    diagnosis: DiagnosisResult;
}

export const uploadImageForDiagnosis = async (imageFile: File): Promise<DiagnoseImageResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    // apiclient.post handles JSON body by default. For file uploads, we need to use fetch directly
    // or modify apiclient to handle FormData. Given the current apiclient, direct fetch is simpler.
    // However, apiclient's post method takes 'body: object', which will JSON.stringify it.
    // I need to use a direct fetch call for multipart/form-data.

    const token = apiclient.token; // Get token from apiclient instance

    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('/api/engine/diagnose', {
        method: 'POST',
        headers: headers, // Do NOT set 'Content-Type': 'multipart/form-data' here; fetch does it automatically with FormData
        body: formData,
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Unable to diagnose image');
    }

    return res.json();
};
