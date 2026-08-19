import React, { useState, useRef } from 'react';
import '../SmallLetter.css';

const SmallLetter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const letterRef = useRef(null);

    const handleToggleLetter = () => {
        const letterElement = letterRef.current;
        if (!letterElement) return;

        if (isOpen) {
            letterElement.classList.add('small-rajib-letter--close');
            setIsOpen(false);
            setTimeout(() => {
                letterElement.classList.remove('small-rajib-letter--close');
            }, 600);
        } else {
            letterElement.classList.remove('small-rajib-letter--close');
            setIsOpen(true);
        }
    };

    const handleCloseLetter = () => {
        const letterElement = letterRef.current;
        if (!letterElement) return;

        letterElement.classList.remove('small-rajib-letter--open');
        letterElement.classList.add('small-rajib-letter--close');
        setIsOpen(false);

        setTimeout(() => {
            letterElement.classList.remove('small-rajib-letter--close');
        }, 600);
    };

    const letterStateClass = isOpen ? 'small-rajib-letter--open' : '';

    return (
        <>
            <div className={`small-rajib-letter ${letterStateClass}`} ref={letterRef}>
                <div className="small-rajib-envelope" onClick={handleToggleLetter}>
                    <div className="small-rajib-envelope-flap"></div>
                    <div className="small-rajib-envelope-paper"></div>
                    <div className="small-rajib-envelope-detail"></div>
                </div>

                <div className="small-rajib-paper">
                    <div className="small-rajib-paper-content">
                        <div className="small-rajib-paper-close" onClick={handleCloseLetter}>x</div>
                        <p style={{fontSize: '12px'}}>Dear Yến Trương,<br /><br />Chúc em một ngày sinh nhật rực rỡ và hạnh phúc nhất. Cảm ơn em vì đã xuất hiện và làm cho thế giới của anh trở nên tuyệt vời hơn mỗi ngày.<br /><br />Yêu em,<br />Ray Đặng</p>
                    </div>

                    <svg className="rajib-diary-deco" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="5" y1="0" x2="5" y2="100" stroke="#E0DDB7" strokeWidth="1" className="diary-line left-line" />
                        <line x1="95" y1="0" x2="95" y2="100" stroke="#E0DDB7" strokeWidth="1" className="diary-line right-line" />
                        <line x1="0" y1="5" x2="100" y2="5" stroke="#E0DDB7" strokeWidth="0.5" className="diary-line top-line" />
                        <line x1="0" y1="95" x2="100" y2="95" stroke="#E0DDB7" strokeWidth="0.5" className="diary-line bottom-line" />
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((cy, idx) => (
                            <circle key={idx} cx="5" cy={cy} r="0.5" fill="#E0DDB7" className={`diary-dot dot-${idx + 1}`} />
                        ))}
                    </svg>
                </div>
            </div>
        </>
    )
}

export default SmallLetter;