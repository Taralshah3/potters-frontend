
export interface ConstantTypes {
    apiUrl: string;
    authHeader: string;
}

export interface fileDictionary {
    [filePath: string]: {
        name: string;
        path: string;
        type: string;
    };
}


export interface EndpointsTypes {
    isLoggedIn: string;
    googleAuth: string;
    githubConnect: string;
    githubRepo: string;
    fileContents: string;
    refreshRepo: string;
};

export interface isLoggedInResponse {
    res: boolean,
    user?: User,
}

export interface User {
    email: string,
    dateCreate: Date,
    name: string,
    profilePicture: string,
    githubId?: string,
    accessToken?: string,
    repositories?: usersRepos[],
}

interface usersRepos {
    name: string,
    id: string,
}

export interface FirebaseConfigTypes {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}