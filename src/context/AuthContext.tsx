import React, {createContext, useCallback, useEffect, useMemo, useState} from "react";
import api from "../services/api.ts";
import {useNavigate} from "react-router";

interface IAuthContext {
  student: Student | null,
  token: string | null;
  loginSuccessfully: (response: LoginResponse) => void;
  executeLogout: () => void;
  fetcher: (url: string) => Promise<never>
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({children}: React.PropsWithChildren) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [student, setStudent_] = useState<Student | null>(() => {
    const student = localStorage.getItem("student")
    if (student)
      return JSON.parse(student) as Student

    return null
  });
  const navigate = useNavigate();

  const loginSuccessfully = useCallback((response: LoginResponse) => {
    setToken_(response.token)
    setStudent_(response.student)
    localStorage.setItem('student', JSON.stringify(response.student))
    navigate('/registration')
  }, [navigate])

  const executeLogout = useCallback(() => {
    navigate('/login');
    setToken_(null)
    setStudent_(null)
    localStorage.clear()
  }, [navigate])

  const fetcher = useCallback((url: string) => api.get(url, {
    headers: {
      token
    }
  }).then(res => res.data) as Promise<never>, [token])

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      api.defaults.headers.common["token"] = token;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      delete api.defaults.headers.common["token"];
      localStorage.removeItem('token')
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      loginSuccessfully,
      executeLogout,
      student,
      token,
      fetcher
    }),
    [executeLogout, fetcher, loginSuccessfully, student, token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

