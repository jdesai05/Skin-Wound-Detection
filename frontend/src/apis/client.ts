
import { Token } from "@/interfaces";
import { jwtDecode } from "jwt-decode";

class APIClient {
    token: string | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('token');
        }
    }

    setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    clearToken() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    }

    getTokenPayload(): Token | null {
        if (this.token) {
            try {
                return jwtDecode<Token>(this.token);
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        }
        return null;
    }

    private getHeaders() {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    get = async(url:string) => {
        const res = await fetch(url,{
            headers: this.getHeaders()
        })

        if(!res.ok){
            throw new Error('Failed to fetch')
        }

        return res.json();

    }

    post = async(url:string,body:object) => {
        const res = await fetch(url,{
            method:'POST',
            headers: this.getHeaders(),
            body:JSON.stringify(body)
        })

        if(!res.ok){
            throw new Error('Failed to fetch')
        }

        return res.json()
    }

    put = async(url:string, body?:object) => {
        const res = await fetch(url,{
            method:'PUT',
            headers: this.getHeaders(),
            body: body ? JSON.stringify(body) : undefined
        })

        if(!res.ok){
            throw new Error('Failed to fetch')
        }

        return res.json()
    }

    delete = async(url:string) => {
        const res = await fetch(url,{
            method:'DELETE',
            headers: this.getHeaders()
        })

        if(!res.ok){
            throw new Error('Failed to fetch')
        }

        return res.json()
    }
}

export const apiclient = new APIClient();
