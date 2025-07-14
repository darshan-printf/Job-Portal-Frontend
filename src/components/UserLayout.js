import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({
    children,
    ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10
}) {
    const menuItems = [
        { active: ac1, RName: "Dashboard", RLink: "/admin/userdashboard", icon: "fas fa-tachometer-alt" },

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
