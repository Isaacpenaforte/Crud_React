import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const parsedUsers = JSON.parse(usersStorage);
      const hasUser = parsedUsers.find((user) => user.email === JSON.parse(userToken).email);

      if (hasUser) {
        setUser(hasUser);
      }
    }
  }, []);

  const login = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    const hasUser = usersStorage?.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(hasUser);
        return;
      } else {
        return "Email ou senha incorretos";
      }
    } else {
      return "Não existe nenhuma conta com esse email";
    }
  };

  const cadastro = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    const hasUser = usersStorage?.find((user) => user.email === email);

    if (hasUser) {
      return "Já existe uma conta com esse email";
    }

    const newUser = { email, password };
    const newUsers = usersStorage ? [...usersStorage, newUser] : [newUser];

    localStorage.setItem("users_db", JSON.stringify(newUsers));
    setUser(newUser);
    return;
  };

  return (
    <AuthContext.Provider value={{ user, cadastrado: !!user, login, cadastro }}>
      {children}
    </AuthContext.Provider>
  );
};
