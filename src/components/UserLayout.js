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
        { active: ac3, RName: "Candidate List", RLink: "/admin/", icon: "fas fa-user" },
        { active: ac4, RName: "Interview Schedule", RLink: "/admin/", icon: "fas fa-calendar-alt" },
        { active: ac5, RName: "Offer Letter", RLink: "/admin/", icon: "fas fa-file-signature" },
        { active: ac6, RName: "Location", RLink: "/admin/", icon: "fas fa-map-marker-alt" },
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
