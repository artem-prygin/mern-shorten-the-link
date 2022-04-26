import { useCallback, useState } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [, setToken] = useState(false);
    const [, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userId: id }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    return { login, logout };
};
