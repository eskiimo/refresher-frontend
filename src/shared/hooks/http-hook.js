import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
   const [isloading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);

   const activeHttpRequests = useRef([]);

   const sendRequest = useCallback(
      async (url, method = 'GET', body = null, headers = {}) => {
         setIsLoading(true);
         const httpAbortCtrl = new AbortController();
         activeHttpRequest.current.push(httpAbortCtrl);
         try {
            await fetch(url, {
               method,
               body,
               headers,
               signal: httpAbortCtrl.signal,
            });
            const responseData = await response.json();
            console.log(responseData);

            activeHttpRequests.current = activeHttpRequests.current.filter(
               (reqCtrl) => reqCtrl !== httpAbortCtrl
            );
            if (!response.ok) {
               throw new Error('response not ok ');
            }
            setIsLoading(false);
            return responseData;
         } catch (e) {
            setError(e.message);
            setIsLoading(false);
            throw new Error(e.message || 'response not ok ');
         }
      },
      []
   );

   const clearError = () => {
      setError(null);
   };
   useEffect(() => {
      return () => {
         activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
      };
   }, []);
   return { isloading, error, sendRequest, clearError };
};
