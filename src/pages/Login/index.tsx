import React from "react";
import {Auth} from "../../services/Auth.ts";
import './styles.css'
import {useAuth} from "../../hooks/useAuth.ts";
import {toast} from "react-toastify";

export const Login = () => {
  const {loginSuccessfully} = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await Auth.login({username, password});
      loginSuccessfully(response.data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      toast('Invalid credentials', {type: 'error'})
    }

  }

  return (
    <section className={'login-wrapper'}>
      <div className={'login-page'}>
        <img className={'logo'} src="/harvard_logo.png" alt="Logo"/>
        <form className={'form'} action="#" onSubmit={handleSubmit}>
          <input type="text" name={'username'} placeholder={'Username'} autoComplete="off"/>
          <input type="password" name={'password'} placeholder={'Password'}/>
          <button type={'submit'} className={'button'}>Login</button>
        </form>
      </div>
    </section>
  );
};
