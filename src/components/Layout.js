import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
export default function Layout({
  children,
   ac1,
   ac2

}) {

  return (
    <div>
      <Header />
      <div >
        <Sidebar


          M1={ac1}  RName="" RLink=""
          M2={ac2}  RName2="" RLink2=""


        />
        <div className="content-wrapper" >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
