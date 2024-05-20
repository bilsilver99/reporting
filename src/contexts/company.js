// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useCallback,
// } from "react";
// import { getUser, signIn as sendSignInRequest } from "../api/auth";

// function CompProvider(props) {
//   const [company, setcompany] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async function () {
//       const result = await getCompany();
//       if (result.isOk) {
//         setCompany(result.data);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const signIn = useCallback(async (email, password) => {
//     const result = await sendSignInRequest(email, password);
//     if (result.isOk) {
//       setUser(result.data);
//     }

//     return result;
//   }, []);

//   const signOut = useCallback(() => {
//     setUser(undefined);
//   }, []);

//   return (
//     <CompContext.Provider
//       value={{ user, signIn, signOut, loading }}
//       {...props}
//     />
//   );
// }

// const CompContext = createContext({ loading: false });
// const useComp = () => useContext(CompContext);

// export { CompProvider, useComp };
