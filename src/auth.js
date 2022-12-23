// import React,{useState,useContext, createContext} from 'react'
// import { useContext } from 'react'
// const AuthContexted = createContext(null)

// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null)

//     const login = (user) =>{
//         setUser(user)
//     }
//     const logout = () =>{
//         setUser(null)
//     }
//   return (
//     <>
//     <AuthContexted.Provider value= ({user ,login,logout}) >
//     {children}
//     </AuthContexted.Provider>
//    </>
//   )
// }

// export const useAuth = () =>{
//     return useContext(AuthContext)
// }
