import { ConstantTypes, EndpointsTypes, FirebaseConfigTypes } from "./types/constants";


const locaUrl: string = 'http://localhost:4500/api/v1';
const liveUrl: string = 'https://potter-api-production.up.railway.app/api/v1';

export const constants: ConstantTypes = {
    apiUrl: locaUrl,
    authHeader: "x-access-potter-auth-token",
}

export const endpoints: EndpointsTypes = {
    isLoggedIn: "/auth/isLoggedIn",
    googleAuth: "/auth/google",
    githubConnect: "/github/connect",
    githubRepo: "/github/repo",
}
export const firebaseConfig: FirebaseConfigTypes = {
    apiKey: "AIzaSyA2LgZRKfH1y2T5NAxTtWxfkZZ0tbyzKYk",
    authDomain: "potter-e7259.firebaseapp.com",
    projectId: "potter-e7259",
    storageBucket: "potter-e7259.appspot.com",
    messagingSenderId: "508656216323",
    appId: "1:508656216323:web:ecf24188be5a027517e136",
    measurementId: "G-41DSEPR2T4"
};