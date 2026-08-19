import React, { useRef, useState } from 'react'
import yen from '../assets/yen.jpeg'

const lettersData = [
    {
        id: 1,
        name: "Ray Đặng",
        msg: "Chúc vợ iu của anh có một ngày sinh nhật thật hạnh phúc và tràn ngập niềm vui 💙",
        img: yen
    },
    {
        id: 2,
        name: "Ray Đặng",
        msg: "Chỉ một nụ cười hay một bức ảnh của em thôi cũng đủ làm bừng sáng cả ngày dài của anh.",
        img: yen
    },
    {
        id: 3,
        name: "Ray Đặng",
        msg: "Dù là qua màn hình điện thoại, giọng nói và tiếng cười của em vẫn sưởi ấm trái tim anh như ánh nắng ban mai.",
        img: yen
    },
    {
        id: 4,
        name: "Ray Đặng",
        msg: "Mỗi thông báo tin nhắn từ em đều giống như một nhịp đập thì thầm rằng: 'Có em ở đây, và em thương anh'.",
        img: yen
    },
    {
        id: 5,
        name: "Ray Đặng",
        msg: "anh bấm lộn",
        img: yen
    },
    {
        id: 6,
        name: "Ray Đặng",
        msg: "Kể từ ngày mình quen nhau, trái tim anh đã biết chính xác nơi nó thuộc về — đó là ở bên cạnh em, mãi mãi.",
        img: yen
    },
    {
        id: 7,
        name: "Ray Đặng",
        msg: "Mỗi khoảnh khắc ở bên em đều mang lại cảm giác bình yên, nhẹ nhàng. Em là khoảng trời dịu êm nhất của anh.",
        img: yen
    },
    {
        id: 8,
        name: "Ray Đặng",
        msg: "Từ cuộc trò chuyện đầu tiên, em đã là ngọn lửa nhỏ thắp sáng thế giới của anh, biến mọi ngày bình thường thành phép màu.",
        img: yen
    },
];

const LoveLetter = () => {
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState(lettersData);
    const zIndexCounterRef = useRef(10);
    const lettersContainerRef = useRef(null);
    
    // Logic kéo thả
    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;
        const rect = letterEl.getBoundingClientRect();
        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;
        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;
        zIndexCounterRef.current += 1;
        letterEl.style.zIndex = zIndexCounterRef.current;

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };

    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };

    return (
        <main className='munna bg-[#0f172a] h-screen w-full overflow-hidden'>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Mở ra</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>Envelope Of Love</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>Dear Yến Trương</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className="munna letters" ref={lettersContainerRef}>
                    {letters.map((letter) => (
                        <blockquote
                            key={letter.id}
                            className="munna letter -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing rounded-xl flex flex-col items-center"
                            id={letter.id}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: window.innerWidth < 768 ? '53%' : '50%',
                                left: window.innerWidth < 768 ? '50%' : '50%',
                                transform: 'none',
                                /* Ép giao diện thẻ Polaroid (Ảnh lấy liền) */
                                width: '280px',
                                height: 'auto',
                                minHeight: '320px',
                                padding: '45px 15px 20px 15px', 
                                backgroundColor: '#ffffff',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.25)', 
                                justifyContent: 'flex-start',
                                border: '1px solid #e2e8f0'
                            }}
                            onMouseDown={(e) => handleMouseDown(e, letter.id)}
                            onTouchStart={handleMouseDown}
                        >
                            <button
                                className="munna closeLetter"
                                title={`Đóng thư của ${letter.name}`}
                                onClick={() => handleCloseLetter(letter.id)}
                            >
                                Đóng
                            </button>
                            
                            {/* Khu vực Hình ảnh */}
                            <div className="w-full h-[220px] rounded-md overflow-hidden bg-gray-100 mb-4 shadow-inner pointer-events-none border border-gray-200">
                                <img 
                                    src={letter.img} 
                                    alt="Kỷ niệm" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>

                            {/* Khu vực Ghi chú */}
                            <p className="w-full text-center text-slate-800 font-sriracha text-[15px] leading-relaxed pointer-events-none">
                                {letter.msg}
                            </p>
                        </blockquote>
                    ))}
                </div>
            </section>

            {/* ------------------ Heart Beating ------------------ */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
                    <path d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z" fill="#2563eb" />
                </svg>
            </div>
            
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
                    <path d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z" fill="#2563eb" />
                </svg>
            </div>

            <div className="munna snowflakes z-0">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="munna snowflake">
                        <img 
                            src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" 
                            width="25" 
                            alt="heart"
                            style={{ filter: 'hue-rotate(220deg)' }} 
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default LoveLetter