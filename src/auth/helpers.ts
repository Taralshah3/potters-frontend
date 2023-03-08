import { constants, endpoints } from "../constants";
import { isLoggedInResponse } from "../types/constants";



export const isLoggedIn = async (): Promise<isLoggedInResponse> => {
    const token: string = localStorage.getItem(constants.authHeader) || "";
    if (token.length === 0 || token === null || !token || token.trim() === "" || token === "null") return { res: false };
    const response = await fetch(constants.apiUrl + endpoints.isLoggedIn, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-potter-auth-token": token,
        },
    });
    if (response.status !== 200) {
        localStorage.removeItem(constants.authHeader);
        return { res: false };

    }
    const data = await response.json();
    return { res: true, user: data.user };
}

export const logout = (): void => {
    localStorage.removeItem(constants.authHeader);
}
