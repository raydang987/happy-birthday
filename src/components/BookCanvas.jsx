import React, { useEffect, useRef } from 'react'
import yen from '../assets/yen.jpeg'
import { GiCrossMark } from 'react-icons/gi'

const BookCanvas = ({ active, setActive }) => {

    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActive(true)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setActive])

    return (
        <div className={`boxMail ${active ? 'hidden opacity-0 pointer-events-none' : 'opacity-100 visible'}`}>

            <div onClick={() => setActive(!active)} className="crossAll">
                <GiCrossMark className="text-white" />
            </div>

            <div ref={dropdownRef} className={`boxMail-container duration-500 -translate-y-1/2 ${active ? 'top-0' : ' top-1/2'}`}>
                <div className="card1">
                    <div className="cover-text-wrapper">
                        <h4 className="username">
                            Dear Yến Trương<span className="underline"></span>
                        </h4>
                        <h3 className="cover-title">
                            Happy Birthday!
                        </h3>
                    </div>

                    {/* User Image */}
                    <div className="userImg">
                        <img src={yen} alt="Recipient's Photo" />
                    </div>

                    <div className="card1-decoration-sparkle"></div>

                    <svg className="deco-shape top-right-star" viewBox="0 0 100 100">
                        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="rgba(255, 255, 255, 0.6)" />
                    </svg>

                    <svg className="deco-shape bottom-left-ring" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="5" fill="none" />
                        <circle cx="50" cy="50" r="20" fill="rgba(255, 255, 255, 0.3)" />
                    </svg>
                </div>

                <div className="card2">
                    <div className="card2-content">
                        <h3 className="card2-recipient">To My Love!</h3>
                        <div className="card2-message-text italic">
                            <article style={{ marginBottom: '8px' }}>Chúc mừng sinh nhật Vợ iu của anh 💙</article>
                            <article style={{ marginBottom: '10px' }}>Từ khoảnh khắc em bước vào cuộc đời anh, mọi thứ xung quanh anh đều trở nên tuyệt vời hơn. Em mang đến sự ấm áp, niềm vui và những tia sáng rực rỡ nhất cho những ngày tháng bình dị của anh.</article>
                            <article style={{ marginBottom: '10px' }}>Nhân ngày sinh nhật của em, anh chỉ muốn nói rằng: Anh muốn được đồng hành cùng em trong mọi chương của cuộc đời, qua mọi giông bão hay nắng đẹp. Dù có chuyện gì xảy ra, anh vẫn sẽ luôn ở đây, chọn em, bảo vệ em và yêu em theo cách khiến em luôn cảm thấy bình yên nhất.</article>
                            <article style={{ marginBottom: '10px' }}>Tuổi mới chúc vợ của anh luôn xinh đẹp, rạng rỡ và mãi hạnh phúc bên anh. Cảm ơn em vì đã đến và trở thành ngoại lệ duy nhất của đời anh. Happy Birthday, my everything! 🎂</article>
                        </div>
                        <div className="card2-decoration"></div>
                        <div className="corner-ribbon top-left">
                            <svg className='w-13 h-13 absolute -top-5 -rotate-50 -left-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                                <path fill="#1e3a8a" d="M60.23 50.47s-10.56 2.98-19.38 8.8c-7.26 4.78-13.83 12.04-13.83 12.04l1.88 17.76L34.1 93l21.81-19.63s3.1-8.1 4.21-13.65c.58-2.86.88-5.66.88-5.66zm8.96 2.22s2.21 8.35 3.02 11.66c.92 3.74 2.69 9.82 2.69 9.82l21.69 15.42l8.2-16.05s-4.61-5.72-7.09-8.71s-16.57-12.72-16.57-12.72z" />
                                <path fill="#60a5fa" d="M13.32 98.51s.75-6.87 6.39-16.69s8.41-11.53 8.41-11.53s3.26-.76 6.15-1.11c3.12-.38 5.72-.09 5.72-.09s-3.93 4.78-6.15 9.39s-3.59 8.97-1.96 9.82c1.62.85 3.43-5 6.92-10.33c3.67-5.62 6.47-8.38 6.47-8.38s2.8.09 5.72.96c3.23.96 5.02 2.6 5.02 2.6s-5.76 15.49-8.92 24.46s-7.72 20.87-8.83 21.3s-3.04-3.02-4.24-5.75s-5.29-17.25-5.55-16.99s-15.15 2.34-15.15 2.34M74.89 74.1s2.51-1.69 4.56-2.38c2.05-.68 5.68-1.26 5.68-1.26s2.18 4.26 3.88 7.17c1.71 2.9 4.49 8.88 6.28 8.02c1.79-.85-.51-6.89-1.84-9.56c-1.21-2.43-3.33-5.72-3.33-5.72s2.65-.34 7.51.6c4.87.94 7.17 2.56 7.17 2.56s4.5 6.68 6.92 10.76c3.22 5.44 7.26 14.68 7.26 14.68l-17.85 1.46l-8.97 19.64s-1.24.08-1.93-.34c-.68-.43-3.91-9.3-5.66-14.5c-2.75-8.21-9.68-31.13-9.68-31.13" />
                                <path fill="#2563eb" d="M100.1 98.73c-.69.64-7.36 17.21-7.56 17.7c-1.03 2.54-2.44 3.12-2.44 3.12s1.21 1.74 3.26 1.14c1.58-.46 9.1-18.27 9.1-18.27s13.59.13 15.57-.73c2.22-.96.92-2.77.92-2.77s-17.93-1.05-18.85-.19m-86.75-.6s4.02-.73 7.72-1.71s8.44-2.37 8.44-2.37s3.74 10.22 4.86 13.65s4.04 11.1 4.04 11.1s-1.27 1.37-3.1.24c-1.71-1.06-4.98-10.1-5.84-12.5c-1.1-3.04-2.53-7.55-2.53-7.55s-3.88 1.29-7.11 1.88s-5.42 1.02-6.28.16c-.86-.85-.2-2.9-.2-2.9m33.01-69.16l-18.55-4.76L14.7 34.87l-5.44 26l2.97 5s3.22 2.46 12.28.44c9.06-2.03 29.52-9.91 29.52-9.91s2.61 1.08 4.95 1.4s6.33-.52 6.33-.52s5.02.82 8.01.61c2.98-.21 4.26-.53 4.26-.53s9.81 5.22 19.61 7.99s17.37 3.4 19.08 3.2c2.66-.32 3.94-4.8 3.94-4.8l-1.07-9.81l-14.28-30.7l-29.74 8.53l-1.81 2.03l-7.79-2.12l-10.57 2.08l-1.33-1.56z" />
                                <path fill="#60a5fa" d="M54.59 33.37s1.18-3.66 10.07-3.66c8.29 0 9.41 3.28 9.41 3.28s1.08 7.2.1 13.44c-.87 5.58-3.96 11.41-3.96 11.41s-2.05.51-5.22.6c-2.99.08-6.17-.67-6.17-.67S56 52.8 54.81 46.56c-1.14-6.04-.22-13.19-.22-13.19" />
                                <path fill="#bfdbfe" d="M59.9 45.07c1.7.34 2.67-4.23 3.74-5.48c1.68-1.95 5.66-1.57 5.59-4.18c-.05-2.06-7.63-3.01-10.36.81c-1.9 2.67-1.68 8.31 1.03 8.85" />
                            </svg>
                        </div>
                        <div className="corner-ribbon bottom-right"></div>
                        <div className="confetti-dots"></div>

                        <p className="signature">
                            Yêu em, Ray Đặng
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCanvas