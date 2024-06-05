import "../css/main.css";
import musinsa from "../assets/videos/musinsa.mp4";

function MainPage() {
  return (
    <div className='container'>
      {/* 백그라운드 비디오 */}
      <video
        className='video'
        src={musinsa}
        muted
        loop
        playsInline
        autoPlay
      ></video>
      <div className='cardWrapper'>
        <div className='cardSection'>
          <div className='box'></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
