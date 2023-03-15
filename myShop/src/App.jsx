import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Details } from './pages/details';
import { Signup } from './pages/signup';
import { Error } from './pages/error';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Login } from './pages/login';
import { MonPanier } from './pages/monPanier';
import { session, SessionContext } from '../context/sessionContext';

function App() {
  const location = useLocation();

  // Hide Header and Footer on the Signup and Login pages
  const showHeaderAndFooter = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/error";

  return (
    <div className="App">
      <SessionContext.Provider value={session}>
      {showHeaderAndFooter && <Header />}
        <div id="mainContainer">
          <Routes>
            <Route path="/" element={<Signup />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="details/:id" element={<Details/>}></Route>
            <Route path={"*"} element={<Error />} />
            <Route path={"home"} element={<Home />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"/commande/monPanier"} element={<MonPanier />} />
            {/* <Route path={"/valider-panier"} element={<MonPanier />} /> */}
          </Routes>
        </div>
        {showHeaderAndFooter && <Footer />}
      </SessionContext.Provider>
    </div>
  )
}

export default App;
