import { ConstantTypes, EndpointsTypes, FirebaseConfigTypes } from "./types/constants";


const locaUrl: string = 'http://localhost:4500/api/v1';
const liveUrl: string = 'https://potter-api-production.up.railway.app/api/v1';

const localBrowserUrl: string = 'localhost:3000';
const liveBrowserUrl: string = 'https://clayai.netlify.app';

export const constants: ConstantTypes = {
    apiUrl: locaUrl,
    browserUrl: localBrowserUrl,
    authHeader: "x-access-potter-auth-token",
}

export const endpoints: EndpointsTypes = {
    isLoggedIn: "/auth/isLoggedIn",
    googleAuth: "/auth/google",
    githubConnect: "/github/connect",
    githubRepo: "/github/repo",
    fileContents: "/user/file",
    refreshRepo: "/github/refreshrepo",
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