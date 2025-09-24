import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({
    children,
    ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10
}) {
    const menuItems = [
        { active: ac1, RName: "Dashboard", RLink: "/admin/userdashboard", icon: "fas fa-tachometer-alt" },
        { active: ac2, RName: "Job Posting", RLink: "/admin/joblist", icon: "fas fa-briefcase" },
        { active: ac6, RName: "Candidate List", RLink: "/admin/candidatelist", icon: "fas fa-users" },
        { active: ac7, RName: "Interview Schedule", RLink: "/admin/scheduling", icon: "fas fa-calendar-alt" },
        { active: ac8, RName: "Offer Letter", RLink: "/admin/offerletter", icon: "fas fa-file-signature" },
        { active: ac3, RName: "Location", RLink: "/admin/location", icon: "fas fa-map-marker-alt" },
        { active: ac5, RName: "Reports", RLink: "/admin/jobposition", icon: "fas fa-briefcase" },
        { active: ac4, RName: "Company & Package", RLink: "/admin/candidatelist", icon: "fas fa-users" },
        { active: ac9, RName: "Profile", RLink: "/admin/profile", icon: "fas fa-user" },
        { active: ac10, RName: "Logout", RLink: "/admin/login", icon: "fas fa-sign-out-alt" , onClick: () => {
      // call logout  clear local storage
      localStorage.clear();
      window.location.href = "/admin/login";
    } },
        
    ];

    return (
        <div>
            <Header />
            <div>
                <Sidebar menuItems={menuItems} />
                <div className="content-wrapper">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
