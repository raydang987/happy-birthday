import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import nhacNen from './assets/nhac.mp3' 

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
  const [animateOut, setAnimateOut] = useState(false); 

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setAnimateOut(true), 10000);   
      setTimeout(() => setShowContent(true), 10200);  
      setTimeout(() => setLoading(false), 11000);     
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  // ------------------ Trình phát nhạc nền ------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false); // Biến để nhớ xem người dùng đã click lần nào chưa

  // Tính năng: Click bất kỳ đâu trên màn hình lần đầu tiên sẽ phát nhạc
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true; // Đánh dấu là đã tương tác
            
            // Xóa bộ lắng nghe sự kiện sau khi đã phát nhạc thành công
            document.removeEventListener('click', handleFirstClick);
            document.removeEventListener('touchstart', handleFirstClick);
          })
          .catch(err => console.log("Lỗi tự động phát nhạc:", err));
      }
    };

    // Gắn bộ lắng nghe sự kiện click/chạm vào toàn bộ trang web
    document.addEventListener('click', handleFirstClick);
    document.addEventListener('touchstart', handleFirstClick);

    // Dọn dẹp sự kiện khi thoát
    return () => {
      document.removeEventListener('click', handleFirstClick);
      document.removeEventListener('touchstart', handleFirstClick);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Lỗi phát nhạc:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Nút bật tắt nhạc trôi nổi góc trên bên phải */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-[999] w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-lg border-2 border-[#60a5fa] cursor-pointer hover:scale-110 transition-transform"
        title="Bật/Tắt nhạc"
      >
        {isPlaying ? '🎵' : '🔇'}
      </button>

      {/* Thẻ audio ẩn */}
      <audio ref={audioRef} src={nhacNen} loop />

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