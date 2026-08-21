import React, { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'

const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='love-letter' element={<LoveLetter />}></Route>
        <Route path='love-Letter' element={<Navigate to='/love-letter' replace />}></Route>
        <Route path='test' element={<Test />}></Route>
        <Route path='3D-art-gallery' element={<Navigate to='/' replace />}></Route>
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Route>
    </Route>
  ))


  // ------------------Cake loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false); // New state for animation

  useEffect(() => {
    const handlePageLoad = () => {
      // Đã tăng thời gian chờ ở đây để ngắm pháo hoa và tên lâu hơn
      setTimeout(() => setAnimateOut(true), 10000);   // 10 giây: Bắt đầu hiệu ứng mờ dần và trượt lên
      setTimeout(() => setShowContent(true), 10200);  // 10.2 giây: Bắt đầu load ngầm trang chủ phía sau
      setTimeout(() => setLoading(false), 11000);     // 11 giây: Xóa hoàn toàn màn hình bánh kem
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <>
      {
        loading && <OpeningAnimation animateOut={animateOut}/>
      }
      {
        showContent && <RouterProvider router={MyRoute} />
      }
    </>
  )
}

export default App