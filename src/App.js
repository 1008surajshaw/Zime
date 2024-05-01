import React, { lazy, Suspense } from 'react';
import { Route,Routes } from 'react-router-dom';
 const Home = lazy(() => import('./pages/Home'));
// import Home from './pages/Home'

function App() {
  return (
    <div className='"w-screen min-h-screen  flex flex-col '>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
