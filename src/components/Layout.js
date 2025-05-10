import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
export default function Layout({ children, ac1, ac2, ac3, ac4, ac5 , ac6, ac7, ac8, ac9, ac10 }) {
  return (
    <div>
      <Header />
      <div >
        <Sidebar
          M1={ac1} RName="Dashboard" RLink="/dashboard" icon1="fas fa-tachometer-alt"
          M2={ac2} RName2="Manage Country" RLink2="/countrylist" icon2="fas fa-globe"
          M3={ac3} RName3="Manage States" RLink3="/stateslist" icon3="fas fa-building"
          M4={ac4} RName4="Manage City" RLink4="" icon4="fas fa-city"
          M5={ac5} RName5="Manage User" RLink5="" icon5="fas fa-users"
          M6={ac6} RName6="Manage Job" RLink6="" icon6=""
          M7={ac7} RName7="Manage Resume" RLink7="" icon7=""
          M8={ac8} RName8="User" RLink8="" icon8=""
          M9="" RName9="" RLink9="" icon9=""
          M10="" RName10="" RLink10="" icon10=""
        />
        <div className="content-wrapper" >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
