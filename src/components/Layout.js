import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
export default function Layout({ children, ac1, ac2, ac3, ac4, ac5 }) {
  return (
    <div>
      <Header />
      <div >
        <Sidebar
          M1={ac1} RName="Dashboard" RLink="/dashboard" icon1="fas fa-tachometer-alt"
          M2={ac2} RName2="Country" RLink2="/countrylist" icon2="fas fa-globe"
          M3={ac3} RName3="States" RLink3="/stateslist" icon3="fas fa-building"
          M4={ac4} RName4="City" RLink4="" icon4="fas fa-city"
          M5={ac5} RName5="User" RLink5="" icon5="fas fa-users"
        />
        <div className="content-wrapper" >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
