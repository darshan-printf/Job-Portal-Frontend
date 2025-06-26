import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
export default function Layout({ children, ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10 }) {
  return (
    <div>
      <Header />
      <div >
        <Sidebar
          M1={ac1} RName="Dashboard" RLink="/dashboard" icon1="fas fa-tachometer-alt"
          M2={ac2} RName2="" RLink2="" icon2=""
          M3={ac3} RName3="" RLink3="" icon3=""
          M4={ac4} RName4="" RLink4="" icon4=""
          M5={ac5} RName5="" RLink5="" icon5=""
          M6={ac6} RName6="" RLink6="" icon6=""
          M7={ac7} RName7="" RLink7="" icon7=""
          M8={ac8} RName8="" RLink8="" icon8=""
          M9={ac9} RName9="" RLink9="" icon9=""
          M10={ac10} RName10="" RLink10="" icon10=""
        />
        <div className="content-wrapper" >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
