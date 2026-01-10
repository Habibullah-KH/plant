import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        user: "habib",
    });

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}
