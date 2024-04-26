import accountsService from "../services/user/accountsService";

export function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
}

function getTokenExpirationDate(token) {
    const decoded = parseJwt(token);
    if (!decoded.exp) {
        return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
}

export function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

export async function refreshTokenIfNeeded() {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await accountsService.refreshToken(refreshToken);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    console.log('Token refreshed successfully. New token:', response.data.token);  // Log the new token
                    return true;
                }
            } catch (error) {
                console.error('Failed to refresh token:', error);
                return false;
            }
        }
        console.log('No valid refresh token available.');
        return false;
    }
    return true;
}

export function logTokenExpirationTime(token) {
    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.exp) {
        const expirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = expirationTime - currentTime;
        console.log(`Token expires in ${timeLeft} seconds`);
    } else {
        console.log('No expiration time found in token.');
    }
}
