import "../css/main.css"; // 메인 페이지 css
import { useState } from "react";
import musinsa from "../assets/videos/musinsa.mp4"; // 백그라운드 비디오
import card1 from "../assets/images/card1.png"; // 1번째 카드 이미지
import card2 from "../assets/images/card2.png"; // 2번째 카드 이미지
import card3 from "../assets/images/card3.png"; // 3번째 카드 이미지
import card4 from "../assets/images/card4.png"; // 4번째 카드 이미지
import card5 from "../assets/images/card5.png"; // 5번째 카드 이미지
import card6 from "../assets/images/card6.png"; // 6번째 카드 이미지

// 메인 페이지
function MainPage() {
  const [isCardClicked, setIsCardClicked] = useState(false); // 카드 클릭 여부

  // 카드 클릭 시
  const handleCardClick = () => {
    setIsCardClicked(true);
  };

  return (
    <>
      {/* 메인 페이지 */}
      <div className='mainContainer'>
        {/* 백그라운드 비디오 */}
        <video
          className='video'
          src={musinsa}
          muted // 음소거
          loop // 반복
          playsInline // iOS에서 비디오가 자동으로 전체 화면으로 전환되는 것을 방지
          autoPlay // 자동 재생
        ></video>
        {/* 카드 묶음 */}
        <div className='cardWrapper'>
          <div className='cardSection'>
            <div className='box'>
              {/* 1번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card1} alt='' />
                  <span>무신사 박스</span>
                </a>
              </div>
              {/* 2번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card2} alt='' />
                  <span>솔드아웃</span>
                </a>
              </div>
              {/* 3번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card3} alt='' />
                  <span>케어라벨</span>
                </a>
              </div>
              {/* 4번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card4} alt='' />
                  <span>슈박스-레드</span>
                </a>
              </div>
              {/* 5번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card5} alt='' />
                  <span>그린 버튼</span>
                </a>
              </div>
              {/* 6번째 카드 */}
              <div>
                <a onClick={handleCardClick}>
                  <img src={card6} alt='' />
                  <span>데님</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 카드 클릭 시 나오는 창 */}
      {isCardClicked && (
        <div className='popupContainer'>
          <div className='popupWrapper'>
            <div className='popupContentWrapper'>
              <div className='popupContent'></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
