import { useCallback, useState, useEffect } from 'react';

let loggoutTimer;

export const useAuth = () => {
   const [token, setToken] = useState(null);
   const [tokenExDate, setTokenExDate] = useState();
   const [userId, setUserId] = useState(false);

   const login = useCallback((uid, token, exDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExp =
         exDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExDate(tokenExp);
      localStorage.setItem(
         'userData',
         JSON.stringify({
            userId: uid,
            token: token,
            expDate: tokenExp.toISOString(),
         })
      );
   }, []);

   const logout = useCallback(() => {
      setToken(null);
      setTokenExDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
   }, []);

   useEffect(() => {
      if (token && tokenExDate) {
         const remainingTime = tokenExDate.getTime() - new Date().getTime();

         loggoutTimer = setTimeout(logout, remainingTime);
      } else {
         clearTimeout(loggoutTimer);
      }
   }, [token, logout, tokenExDate]);

   useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
         storedData &&
         storedData.token &&
         new Date(storedData.expDate) > new Date()
      ) {
         login(
            storedData.userId,
            storedData.token,
            new Date(storedData.expDate)
         );
      }
   }, [login]);
   return { token, userId, login, logout };
};
