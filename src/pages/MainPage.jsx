import "../css/main.css"; // 메인 페이지 css
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import musinsa from "../assets/videos/musinsa.mp4"; // 백그라운드 비디오
import card1 from "../assets/images/card1.png"; // 1번째 카드 이미지
import card2 from "../assets/images/card2.png"; // 2번째 카드 이미지
import card3 from "../assets/images/card3.png"; // 3번째 카드 이미지
import card4 from "../assets/images/card4.png"; // 4번째 카드 이미지
import card5 from "../assets/images/card5.png"; // 5번째 카드 이미지
import card6 from "../assets/images/card6.png"; // 6번째 카드 이미지

// 카드 이미지
const cardImages = [card1, card2, card3, card4, card5, card6];

// 카드 제목
const cardTitles = [
  "무신사 박스",
  "솔드아웃",
  "케어라벨",
  "슈박스-레드",
  "그린 버튼",
  "데님",
];

// 카드 설명
const cardDescriptions = [
  "무신사 회원들에게 친숙한 배송 박스를 모티브로 디자인한 카드입니다. 실제 박스를 만지는 듯한 느낌을 표현하기 위하여 질감에 집중하였으며, 특히 테이프 부분을 유광 처리하여 디테일을 더했습니다.",
  "무신사가 만든 한정판 마켓, 솔드아웃을 모티브로 디자인한 카드 플레이트입니다. 한정판 스니커즈를 전문적으로 다루는 공간을 렌티큘러 효과를 적용하여 입체감과 규모감을 극대화하였습니다.",
  "의류 케어 라벨을 모티브로 옷감의 재질, 함유량, 세탁 방법 등을 위트 있게 풀어냈습니다. 플레이트 테두리에는 한 땀 한 땀 수놓은 스티치를 표현하여 디테일을 극대화하였습니다.",
  "무신사의 브랜드 헤리티지를 상징하는 스니커즈 박스를 레드와 블루로 표현하였습니다. 신발의 기본적인 정보를 담고 있는 라벨의 디테일은 무신사 현대카드만의 감성으로 해석하고, 박스의 재질을 느낄 수 있게 마감하여 재미를 더했습니다.",
  "작은 단추 하나가 패션 전체를 좌우하는 포인트가 된다는 점에 착안하여, 플레이트 위에 그린 컬러 단추로 무신사 현대카드만의 특별함을 가득 담았습니다.",
  "패션의 기본 아이템인 '청바지'를 플레이트에 담았습니다. 데님 특유의 거칠고 질긴 재질 및 스티치를 실제로 느낄 수 있도록 디자인하였고, 헤져서 구멍이 난 부분은 투명하게 표현하여 디테일을 더했습니다.",
];

// 카드 정보
const cardInfo = {
  annualFee: "연회비",
  annualFeeDetails: [
    "무신사 현대카드 : 국내전용/국내외겸용(MasterCard) 10,000원",
    "가족 카드 : 국내전용/국내외겸용(MasterCard) 5,000원",
  ],
  overdueFee: [
    "카드 이용대금 연체 시 약정금리+연체가산금리 3%의 연체금리가 적용됩니다.",
    "(회원별, 이용 상품별 차등 적용/법정 최고금리 20% 이내)",
    "단, 연체 발생시점에 약정금리가 없는 경우 아래와 같이 적용",
  ],
  overdueFeeDetails: [
    "일시불: 거래 발생시점 기준 최소 기간(2개월)의 유이자할부 약정금리+연체가산금리 3%",
    "무이자할부: 거래 발생시점 기준 동일한 할부 계약 기간의 유이자할부 약정금리+연체가산금리 3%",
  ],
  issuanceRestriction:
    "신용카드 발급이 부적정한 경우(연체금 보유, 개인신용평점 낮음 등)카드 발급이 제한될 수 있습니다",
  repaymentObligation:
    "카드 이용대금과 이에 수반되는 모든 수수료를 지정된 대금 결제일에 상환합니다.",
  additionalInfo:
    "자세한 내용 및 이용 조건은 카드 신청 전 현대카드 홈페이지 및 상품설명서, 약관 참고",
  complianceNumber: "준법감시심의필 제 240417-045호 (2024.04.17 ~ 2025.04.16)",
};

// 메인 페이지
function MainPage() {
  const [isCardClicked, setIsCardClicked] = useState(false); // 카드 클릭 여부
  const [animationClass, setAnimationClass] = useState(""); // 애니메이션 클래스 상태 추가
  const [popupScale, setPopupScale] = useState(1); // 팝업 스케일 상태
  const [cardWrapperScale, setCardWrapperScale] = useState(1); // cardWrapper 스케일 상태
  const [padding, setPadding] = useState("80px 0px"); // 패딩 상태
  const [activeIndex, setActiveIndex] = useState(0); // 클릭한 카드의 인덱스
  const cardWrapperRef = useRef(null); // cardWrapper 요소를 참조하기 위한 useRef
  const swiperRef = useRef(null); // Swiper 인스턴스를 참조하기 위한 useRef
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // thumbsSwiper 설정

  // 창 크기에 따라 스케일을 설정하는 함수
  const updateScale = () => {
    const width = window.innerWidth; // 창 너비
    const height = window.innerHeight; // 창 높이

    let newPopupScale = 1;
    if (width <= 1440) {
      // 1440px 이하일 때 스케일 0.75로 설정
      newPopupScale = 0.75;
    } else if (width > 1440 && width < 1920) {
      // 1440 ~ 1920px 사이일 때 스케일 계산
      newPopupScale = ((width - 1440) / (1920 - 1440)) * 0.25 + 0.75; // 0.75 ~ 1.0
    }
    setPopupScale(newPopupScale);

    const contWidth = ((100 / 1920) * width) / 100; // 창 크기에 따른 가로, 세로 비율 계산
    const contHeight = ((100 / 1080) * height) / 100; // 창 크기에 따른 가로, 세로 비율 계산
    const maxScale = Math.max(contWidth, contHeight); // 가로, 세로 중 큰 값으로 스케일 설정
    setCardWrapperScale(maxScale);

    // cardWrapperRef가 존재할 때 cardWrapperRef의 스케일을 변경
    if (cardWrapperRef.current) {
      cardWrapperRef.current.style.transform = `scale(${maxScale})`;
    }
  };

  // 창 크기에 따라 패딩을 설정하는 함수
  const updatePadding = () => {
    const height = window.innerHeight; // 창 높이

    // 창 높이가 587px 이상일 때 패딩 계산
    if (height > 587) {
      const paddingValue = (height - 587) / 2 + 80; // 기본 패딩 80px에 추가 패딩 계산
      setPadding(`${paddingValue}px 0px`);
    } else {
      setPadding("80px 0px");
    }
  };

  // popContWrap의 높이를 동적으로 조정하는 함수
  const resizePop = () => {
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const minPopPadding = 80;
    const scaleRatio = ((100 / 1920) * wWidth) / 100;
    let calPopMinTopPadding = (wHeight - 570) / 2;

    //팝업 스케일, Paading, 팝업 스크롤바 사이즈 조정
    if (scaleRatio < 1) {
      const calScale = scaleRatio < 0.75 ? 0.75 : scaleRatio;
      const calContHT =
        document.querySelector(".popCont").clientHeight * calScale;
      document.querySelector(".popCont").style.transform = `scale(${calScale})`;
      document.querySelector(
        ".popCont"
      ).parentElement.style.height = `${calContHT}px`;
      calPopMinTopPadding = (wHeight - 570 * calScale) / 2;
    } else {
      document.querySelector(".popCont").removeAttribute("style");
      document.querySelector(".popCont").parentElement.style.height = "auto";
    }
    if (wHeight > 1080) {
      calPopMinTopPadding =
        (wHeight - document.querySelector(".popCont").clientHeight) / 2;
    }
    calPopMinTopPadding =
      calPopMinTopPadding > minPopPadding ? calPopMinTopPadding : minPopPadding;
    document.querySelector(
      ".popContWrap"
    ).style.padding = `${calPopMinTopPadding}px 0`;
  };

  // 컴포넌트가 마운트될 때와 창 크기가 변경될 때마다 updateScale과 updatePadding을 호출
  useEffect(() => {
    updateScale();
    updatePadding();
    window.addEventListener("resize", updateScale); // 창 크기가 변경될 때 updateScale 함수 호출
    window.addEventListener("resize", updatePadding); // 창 크기가 변경될 때 updatePadding 함수 호출
    window.addEventListener("resize", resizePop); // 창 크기가 변경될 때 resizePop 함수 호출
    return () => {
      window.removeEventListener("resize", updateScale); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("resize", updatePadding); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("resize", resizePop); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);

  // isCardClicked 상태가 변경될 때 resizePop 호출
  useEffect(() => {
    if (isCardClicked) {
      resizePop();
    }
  }, [isCardClicked]);

  // 카드 클릭 시 실행되는 함수
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setAnimationClass("fadeIn");
    setIsCardClicked(true);
    setTimeout(() => {
      const activeSlide = document.querySelector(
        ".swiper-slide-active .cardImg"
      );
      if (activeSlide) {
        activeSlide.style.transition = "transform 0.5s, opacity 0.5s";
        activeSlide.style.transform = "translateX(0)";
        activeSlide.style.opacity = "1";
      }
    }, 100);
    resizePop(); // 팝업을 열 때에도 resizePop 함수 호출
  };

  // 팝업 닫기 버튼 클릭 시 실행되는 함수
  const handleCloseClick = () => {
    setAnimationClass("fadeOut"); // fadeOut 애니메이션 클래스 추가
    setTimeout(() => {
      setIsCardClicked(false); // 카드 클릭 여부를 false로 변경
      swiperRef.current = null; // swiperRef를 null로 초기화
      setThumbsSwiper(null); // thumbsSwiper를 null로 초기화
    }, 500);
  };

  return (
    <>
      {/* 메인 페이지 */}
      <div className='mainContainer'>
        {/* 백그라운드 비디오 */}
        <video id='video' muted loop playsInline autoPlay>
          <source type='video/mp4' src={musinsa} />
        </video>
        {/* 카드 묶음 */}
        <div
          className='cardWrap'
          ref={cardWrapperRef}
          style={{ transform: `scale(${cardWrapperScale})` }}
        >
          <div className='cardSection'>
            <div className='box'>
              {cardImages.map((image, index) => (
                <div key={index} style={{ zIndex: "99" }}>
                  <a onClick={() => handleCardClick(index)}>
                    <img src={image} alt='' />
                    <span>{cardTitles[index]}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 카드 클릭 시 나오는 창 */}
      {isCardClicked && (
        <div
          className={`layerPop ${animationClass}`}
          style={{ display: "block" }}
        >
          <div className='popupWrap'>
            <div
              className='popContWrap'
              style={{ height: "866.25px", padding: padding }}
            >
              <div
                className='popCont'
                style={{ transform: `scale(${popupScale})` }}
              >
                {/* cardView */}
                <Swiper
                  className='cardView'
                  spaceBetween={10}
                  slidesPerView={1}
                  initialSlide={activeIndex}
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.slideTo(activeIndex, 0);
                    // 슬라이드가 초기화될 때 transition 적용
                    setTimeout(() => {
                      const activeSlide = document.querySelector(
                        ".swiper-slide-active .cardImg"
                      );
                      if (activeSlide) {
                        activeSlide.style.transition =
                          "transform 0.5s, opacity 0.5s";
                        activeSlide.style.transform = "translateX(0)";
                        activeSlide.style.opacity = "1";
                      }
                    }, 100);
                  }}
                >
                  {cardImages.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className={`swiper-slide ${
                        index === activeIndex ? "swiper-slide-active" : ""
                      }`}
                      style={{ width: "800px", marginRight: "10px" }}
                    >
                      <div className='cardImg'>
                        <img src={image} alt={cardTitles[index]} />
                      </div>
                      <div className='cardInfo'>
                        <div className='cardType'>무신사 현대카드</div>
                        <div className='cardTit'>{cardTitles[index]}</div>
                        <p>{cardDescriptions[index]}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* cardThumbs */}
                <Swiper
                  modules={[Thumbs, Navigation]}
                  className='cardThums'
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  slidesPerView={"auto"}
                  navigation={{
                    // Navigation 옵션 추가
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                >
                  {cardImages.map((image, index) => (
                    <SwiperSlide
                      className='swiper-slide'
                      key={index}
                      style={{ width: "36px" }}
                    >
                      <img src={image} alt={`thumb-${index}`} />
                    </SwiperSlide>
                  ))}
                  <div
                    className='swiper-button-next'
                    tabIndex='0'
                    role='button'
                    aria-label='Next slide'
                    aria-disabled='false'
                  ></div>
                  <div
                    className='swiper-button-prev'
                    tabIndex='0'
                    role='button'
                    aria-label='Previous slide'
                    aria-disabled='true'
                  ></div>
                </Swiper>
                {/* 카드 정보 */}
                <div className='useinfo'>
                  <div className='box_bul'>
                    <ul className='bul_list line_top'>
                      <li>
                        {cardInfo.annualFee}
                        <ul className='dash_list'>
                          {cardInfo.annualFeeDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </li>
                      <li className='fw_bold'>
                        {cardInfo.overdueFee[0]}
                        <br />
                        {cardInfo.overdueFee[1]}
                        <br />
                        {cardInfo.overdueFee[2]}
                        <ul className='dash_list'>
                          {cardInfo.overdueFeeDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </li>
                      <li>{cardInfo.issuanceRestriction}</li>
                      <li>{cardInfo.repaymentObligation}</li>
                      <li>{cardInfo.additionalInfo}</li>
                      <li>{cardInfo.complianceNumber}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='btnClose' onClick={handleCloseClick}></div>
        </div>
      )}
    </>
  );
}

export default MainPage;
