import {createContext, PropsWithChildren, useContext} from "react";
import useFetch from "../hooks/useFetch.tsx";

interface ISale {
  id: string
  nome: string
  preco: string
  status: 'pago' | 'processando' | 'falha'
  pagamento: 'boleto' | 'pix' | 'cartao'
  data: string
  parcelas: number | null

}

interface IDataContext {
  loading: boolean;
  error: Error | null;
  data: ISale[] | null;
}

const API_URL = 'localhost:3000/';

const DataContext = createContext<IDataContext | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export const DataProvider = ({children}: PropsWithChildren) => {
  const {data, error, loading} = useFetch<ISale[]>(API_URL)
  return (
    <DataContext.Provider value={{data, error, loading}}>
      {children}
    </DataContext.Provider>
  );
};