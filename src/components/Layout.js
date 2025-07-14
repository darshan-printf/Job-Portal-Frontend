import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({
  children,
  ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10
}) {
  const menuItems = [
    { active: ac1, RName: "Dashboard", RLink: "/admin/dashboard", icon: "fas fa-tachometer-alt" },
    { active: ac2, RName: "Manage Country", RLink: "/admin/countrylist", icon: "fas fa-globe" },
    { active: ac3, RName: "Manage States", RLink: "/admin/stateslist", icon: "fas fa-building" },
    { active: ac4, RName: "Manage City", RLink: "/admin/citylist", icon: "fas fa-city" },
    { active: ac5, RName: "Manage User", RLink: "/admin/userlist", icon: "fas fa-users" },
    { active: ac6, RName: "Manage Job", RLink: "/admin/joblist", icon: "fas fa-briefcase" },
    { active: ac7, RName: "Manage Team", RLink: "/admin/teamlist", icon: "fas fa-users-cog" },
    { active: ac8, RName: "", RLink: "", icon: "" },
    { active: ac9, RName: "", RLink: "", icon: "" },
    { active: ac10, RName: "Log Out", RLink: "", icon: "fas fa-sign-out-alt" }
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
