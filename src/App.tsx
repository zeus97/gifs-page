import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

//Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';





function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
