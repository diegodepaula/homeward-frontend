import './App.css'
import {PageRoutes} from "./pages";
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main>
          <PageRoutes/>
          <ToastContainer/>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
