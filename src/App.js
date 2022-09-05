import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ListHero } from './pages/ListHero';
import { Navbar } from './components/Navbar';
import { DetailHero } from './pages/DetailHero';
import { FavHero } from './pages/FavHero';

//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          autoClose={2000}
          position="top-right"
          className="toast-container"
          toastClassName="dark-toast"
        />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ListHero />} />
          <Route exact path='/:id/detail' element={<DetailHero />} />
          <Route exact path='/my-favhero' element={<FavHero />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
