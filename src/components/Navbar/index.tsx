import {useAuth} from "../../hooks/useAuth.ts";
import './styles.css'
import useSWRImmutable from "swr/immutable";
import {CurrentTermResponse} from "../../types.ts";


export const Navbar = () => {
  const {executeLogout, student, fetcher} = useAuth();
  const {data, isLoading} = useSWRImmutable<CurrentTermResponse>('/current_term', fetcher);

  return (
    <header>
      <img src="/harvard_logo.png" width={'50px'} height={'50px'} alt="Logo"/>
      <h1>{!data || isLoading ? 'Loading...' : data.name}</h1>
      <div className={'info-wrapper'}>
        <span>{student?.username}</span>
        <button type={'button'} onClick={executeLogout}>Logout</button>
      </div>
    </header>
  );
};
