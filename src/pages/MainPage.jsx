import "../css/main.css"; // 메인 페이지 css
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
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
  const [scale, setScale] = useState(1); // 스케일 상태
  const [padding, setPadding] = useState("80px 0px"); // 패딩 상태

  // 창 크기에 따라 스케일을 설정하는 함수
  const updateScale = () => {
    const width = window.innerWidth;
    if (width <= 1440) {
      setScale(0.75);
    } else if (width > 1440 && width < 1920) {
      setScale(((width - 1440) / (1920 - 1440)) * 0.25 + 0.75);
    } else {
      setScale(1);
    }
  };

  // 창 크기에 따라 패딩을 설정하는 함수
  const updatePadding = () => {
    const height = window.innerHeight;
    if (height > 587) {
      const paddingValue = (height - 587) / 2 + 80; // 기본 패딩 80px에 추가 패딩 계산
      setPadding(`${paddingValue}px 0px`);
    } else {
      setPadding("80px 0px");
    }
  };

  // 컴포넌트가 마운트될 때와 창 크기가 변경될 때마다 updateScale과 updatePadding을 호출
  useEffect(() => {
    updateScale();
    updatePadding();
    window.addEventListener("resize", updateScale);
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

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
            <div
              className='popupContentWrapper'
              style={{ height: "auto", padding: padding }}
            >
              <div
                className='popupContent'
                style={{ transform: `scale(${scale})` }}
              >
                <Swiper
                  className='cardView'
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                >
                  <SwiperSlide
                    className='swiper-slide swiper-slide-active'
                    style={{ width: "800px", marginRight: "10px" }}
                  >
                    <div className='cardImg'>
                      <img src={card1} alt='무신사 박스' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>무신사 박스</div>
                      <p>
                        무신사 회원들에게 친숙한 배송 박스를 모티브로 디자인한
                        카드입니다. 실제 박스를 만지는 듯한 느낌을 표현하기
                        위하여 질감에 집중하였으며, 특히 테이프 부분을 유광
                        처리하여 디테일을 더했습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='cardImg'>
                      <img src={card2} alt='솔드아웃' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>솔드아웃</div>
                      <p>
                        무신사가 만든 한정판 마켓, 솔드아웃을 모티브로 디자인한
                        카드 플레이트입니다. 한정판 스니커즈를 전문적으로 다루는
                        공간을 렌티큘러 효과를 적용하여 입체감과 규모감을
                        극대화하였습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='cardImg'>
                      <img src={card3} alt='케어라벨' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>케어라벨</div>
                      <p>
                        의류 케어 라벨을 모티브로 옷감의 재질, 함유량, 세탁 방법
                        등을 위트 있게 풀어냈습니다. 플레이트 테두리에는 한 땀
                        한 땀 수놓은 스티치를 표현하여 디테일을
                        극대화하였습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='cardImg'>
                      <img src={card4} alt='슈박스-레드' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>슈박스-레드</div>
                      <p>
                        무신사의 브랜드 헤리티지를 상징하는 스니커즈 박스를
                        레드와 블루로 표현하였습니다. 신발의 기본적인 정보를
                        담고 있는 라벨의 디테일은 무신사 현대카드만의 감성으로
                        해석하고, 박스의 재질을 느낄 수 있게 마감하여 재미를
                        더했습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='cardImg'>
                      <img src={card5} alt='그린 버튼' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>그린 버튼</div>
                      <p>
                        작은 단추 하나가 패션 전체를 좌우하는 포인트가 된다는
                        점에 착안하여, 플레이트 위에 그린 컬러 단추로 무신사
                        현대카드만의 특별함을 가득 담았습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='cardImg'>
                      <img src={card6} alt='데님' />
                    </div>
                    <div className='cardInfo'>
                      <div className='cardType'>무신사 현대카드</div>
                      <div className='cardTit'>데님</div>
                      <p>
                        패션의 기본 아이템인 '청바지'를 플레이트에 담았습니다.
                        데님 특유의 거칠고 질긴 재질 및 스티치를 실제로 느낄 수
                        있도록 디자인하였고, 헤져서 구멍이 난 부분은 투명하게
                        표현하여 디테일을 더했습니다.
                      </p>
                      <div className='applyBox'>
                        <a
                          href='/cpc/cr/CPCCR0201_01.hc?cardWcd=MSSHC'
                          target='_blank'
                        >
                          <span>신청하기</span>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
