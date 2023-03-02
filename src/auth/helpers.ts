import { constants, endpoints } from "../constants";

export const isLoggedIn = async (): Promise<boolean> => {
    const token: string = localStorage.getItem(constants.authHeader) || "";
    if (token.length === 0 || token === null || !token || token.trim() === "" || token === "null") return false;
    const response = await fetch(constants.apiUrl + endpoints.isLoggedIn, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-potter-auth-token": token,
        },
    });
    if (response.status !== 200) {
        localStorage.removeItem(constants.authHeader);
        return false;
    }
    return true;
}

export const logout = (): void => {
    localStorage.removeItem(constants.authHeader);
}
