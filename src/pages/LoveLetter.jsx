import React, { useEffect, useRef, useState } from 'react'
import anhdautien from '../assets/anhdau.jpg'
import ghephinhtraitim from '../assets/ghephinh.jpg'
import nhannham from '../assets/nhannham.jpeg'
import wedding from '../assets/wed.jpg'
import dilam from '../assets/dilam.jpeg'
import cat from '../assets/cat.jpeg'
import dienthoai from '../assets/dienthoai.jpeg'
import kethon from '../assets/ket.jpg'

const lettersData = [
    { id: 1, name: "Ray Đặng", msg: <>Vợ chồng mình mỗi ngày yêu thêm từng chút nhé rồi sẽ đến ngày mình cầm được tờ giấy này thôi <br/> Chồng yêu em 🤍</>, img: kethon },
    { id: 2, name: "Ray Đặng", msg: "Chắc chắn anh sẽ lấy Yến làm vợ👰🏻‍♀️", img: wedding },
    { id: 3, name: "Ray Đặng", msg: "Dù chỉ thấy qua màn hình điện thoại, chỉ nghe được giọng nói và tiếng cười của em nhưng em vẫn là mục tiêu để anh cố gắng hơn từng ngày đó", img: dienthoai },
    { id: 4, name: "Ray Đặng", msg: "Sóng có thể cuốn trôi dòng chữ trên cát, nhưng không gì có thể xóa nhòa vị trí của em trong tim anh kkkkk", img: cat },
    { id: 5, name: "Ray Đặng", msg: "Lần đầu mang em theo đi làm", img: dilam },
    { id: 6, name: "Ray Đặng", msg: "Còn đây là lần đầu ghép hình trái tim", img: ghephinhtraitim },
    { id: 7, name: "Ray Đặng", msg: "Đây là bức ảnh đầu tiên của anh với em mặc dù nó không giống vợ lắm hihi 😁", img: anhdautien },
    { id: 8, name: "Ray Đặng", msg: <>17/04/2026 Anh "bấm nhầm" rep vợ</>, img: nhannham },
];

const LoveLetter = () => {
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState(lettersData);
    const zIndexCounterRef = useRef(100);
    const lettersContainerRef = useRef(null);

    // Chỉ khóa thanh cuộn tổng, không chặn click
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
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

        zIndexCounterRef.current += 1;
        letterEl.style.zIndex = zIndexCounterRef.current;

        letterEl.style.transform = "none";
        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            // ĐÂY LÀ ĐIỂM MẤU CHỐT: Chỉ chặn trình duyệt cuộn khi bạn đang kéo ảnh
            if (isTouch && moveEvent.cancelable) {
                moveEvent.preventDefault();
            }
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
            // Thêm { passive: false } để lệnh preventDefault() ở trên có tác dụng
            document.addEventListener("touchmove", onMouseMove, { passive: false });
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
        <main className='munna bg-[#0f172a] h-screen w-full overflow-hidden relative flex justify-center items-center'>
            <section className="munna cssletter z-10 w-full h-full flex justify-center items-center relative">
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

                {openEnvelope && (
                    <div 
                        className="munna letters absolute inset-0 w-full h-full pointer-events-auto" 
                        ref={lettersContainerRef}
                    >
                        {letters.map((letter, index) => (
                            <blockquote
                                key={letter.id}
                                className="munna letter cursor-grab active:cursor-grabbing rounded-sm flex flex-col items-center outline-none focus:outline-none
                                           w-[220px] min-h-[260px] p-[15px_15px_45px_15px]
                                           md:w-[280px] md:min-h-[340px] md:p-[20px_20px_70px_20px]"
                                id={letter.id}
                                tabIndex={0}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${(index % 5 - 2) * 3}deg)`,
                                    backgroundColor: '#fdfbf7',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 0 10px rgba(0,0,0,0.05)', 
                                    border: '1px solid #e2e8f0',
                                    zIndex: 50 + index
                                }}
                                onMouseDown={(e) => handleMouseDown(e, letter.id)}
                                onTouchStart={handleMouseDown}
                            >
                                <button
                                    className="munna closeLetter outline-none focus:outline-none"
                                    title={`Đóng thư của ${letter.name}`}
                                    onClick={() => handleCloseLetter(letter.id)}
                                >
                                    Đóng
                                </button>
                                
                                <div className="w-full h-[160px] md:h-[240px] overflow-hidden bg-white mb-4 md:mb-6 shadow-inner pointer-events-none relative border border-gray-200">
                                    <img 
                                        src={letter.img} 
                                        alt="Kỷ niệm" 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>

                                <p className="w-full text-center text-slate-800 font-sriracha text-[13px] md:text-[16px] leading-relaxed pointer-events-none opacity-90 whitespace-pre-line">
                                    {letter.msg}
                                </p>
                            </blockquote>
                        ))}
                    </div>
                )}
            </section>

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

export default LoveLetter;