import { Token } from "@/interfaces";
import { apiclient } from "./client";

export interface LoginRequest{
    email:string;
    password:string;
}

export interface SignUpRequest{
    name:string;
    email:string;
    password:string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
}

export interface UserListResponse {
    users: User[];
}

export const getAllUsers = async(): Promise<User[]> => {
    const res = await apiclient.get('/api/users/all');
    if (!res.ok) {
        throw new Error('Unable to fetch users');
    }
    return res;
}

export const deleteAllUsers = async(): Promise<void> => {
    const res = await apiclient.delete('/api/users/all');
    if (!res.ok) {
        throw new Error('Unable to delete all users');
    }
    return;
}

export const login = async(request:LoginRequest):Promise<Token> => {
    const res = await fetch('/api/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:request.email,
            password:request.password
        })
    });

    if(!res.ok){
        switch(res.status){
            case 404:
                throw new Error('You don\'t have an account!')
            case 401:
                throw new Error('Invalid Credentials')
            default:
                throw new Error('Unable to Login')
        }
    }

    const data = await res.json();
    apiclient.setToken(data);
    return apiclient.getTokenPayload()!;
}

export const signup = async(request:SignUpRequest):Promise<Token> => {
    const res = await fetch('/api/users/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:request.name,
            email:request.email,
            password:request.password,
            is_admin:false
        })
    });

    if(!res.ok){
        switch(res.status){
            case 409:
                throw new Error('You already have an account!')
            default:
                throw new Error('Unable to Register')
        }
    }

    const data = await res.json();
    apiclient.setToken(data);
    return apiclient.getTokenPayload()!;
}

export const deleteUser = async():Promise<void> => {
    const res = await apiclient.delete('/api/users/')

    if(!res.ok){
        throw new Error('Unable to Delete user')
    }

    return;
}
