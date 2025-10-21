import React, { useEffect, useRef, useState } from 'react';
import { LuDot } from 'react-icons/lu';
import plans from '../../api/Membership';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Membership = () => {
    const [selected, setSelected] = useState(0);
    const [currentPlan, setCurrentPlan] = useState(1);
    const cardsRef = useRef([]);
    const userInfo = useSelector((state) => state.user.userInfo);
    const userName = userInfo?.name || '회원';
    const currentPlanName = plans[currentPlan]?.name || 'Silver';

    const onConfirm = async (i) => {
        const result = await Swal.fire({
            title: '이용권을 변경하시겠습니까?',
            text: '결제금액이 업데이트 됩니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            reverseButtons: true,
            customClass: {
                popup: 'my-confirm',
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-confirm-btn',
                cancelButton: 'my-cancel-btn',
            },
        });

        if (result.isConfirmed) {
            setCurrentPlan(i);
            setSelected(i);
            Swal.fire('변경 완료', '멤버십이 변경되었습니다.', 'success');
        }
    };

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        cardsRef.current.forEach((card) => {
            if (!card) return;
            const content = card.querySelector('.card-content');
            const rotationFactor = parseFloat(card.dataset.rotationFactor) || 2;

            if (!isTouchDevice) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateY = (rotationFactor * (x - centerX)) / centerX;
                    const rotateX = (-rotationFactor * (y - centerY)) / centerY;

                    content.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
          `;

                    card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
                    card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
                });

                card.addEventListener('mouseleave', () => {
                    content.style.transform = 'rotateX(0) rotateY(0)';
                    content.style.transition = 'transform 0.5s ease';
                    setTimeout(() => {
                        content.style.transition = '';
                    }, 500);
                });
            }

            const randomDelay = Math.random() * 2;
            card.style.animation = `cardFloat 4s infinite alternate ease-in-out ${randomDelay}s`;
        });
    }, []);

    return (
        <div id="membership">
            <div className="inner1">
                <h2>멤버십 관리</h2>
                <span>
                    {userName}님이 사용 중인 멤버십은 <strong>{currentPlanName}</strong> 입니다.
                </span>
                <h1>사용중인 멤버십 외의 다양한 옵션을 구경해보세요</h1>
                <p className="subtitle">더 다양한 뮤즈온만의 특별한 혜택과 서비스를 즐겨보세요</p>
                <div className="cards-container">
                    {plans.map((plan, i) => {
                        const isActive = selected === i;
                        const isCurrent = currentPlan === i;

                        return (
                            <div
                                className={`card ${isActive ? 'active' : ''} ${
                                    isCurrent ? 'current' : ''
                                }`}
                                data-rotation-factor="2"
                                key={i}
                                ref={(el) => (cardsRef.current[i] = el)}
                                onClick={() => setSelected(i)}
                            >
                                <div className="card-content">
                                    <h2>{plan.name}</h2>
                                    <h3>
                                        <strong>{plan.price.toLocaleString()}원</strong>/ 월
                                    </h3>
                                    <ul>
                                        {plan.features.map((f, idx) => (
                                            <li key={idx}>
                                                <p>
                                                    <LuDot />
                                                </p>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="card-footer">
                                        {isCurrent ? (
                                            <button className="card-button disabled" disabled>
                                                사용 중인 멤버십
                                            </button>
                                        ) : (
                                            <button
                                                className="card-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onConfirm(i);
                                                }}
                                            >
                                                변경
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Membership;
