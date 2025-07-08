import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  useEffect(() => {
    const cssFiles = [
      "/Admin/plugins/fontawesome-free/css/all.min.css",
      "/Admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
      "/Admin/css/adminlte.min.css",
    ];

    const jsFiles = [
      "/Admin/plugins/jquery/jquery.min.js",
      "/Admin/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "/Admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
      "/Admin/js/adminlte.js",
      "/Admin/js/demo.js",
      "/Admin/plugins/jquery-mousewheel/jquery.mousewheel.js",
      "/Admin/plugins/raphael/raphael.min.js",
      "/Admin/plugins/jquery-mapael/jquery.mapael.min.js",
      "/Admin/plugins/jquery-mapael/maps/usa_states.min.js",
      "/Admin/plugins/chart.js/Chart.min.js",
    ];

    const loadedElements = [];
    cssFiles.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      loadedElements.push(link);
    });

    jsFiles.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Important for scripts that have dependencies or need to run in order
      script.defer = true; // Defer execution until HTML parsed (good practice)
      document.body.appendChild(script); // Append to body, as is common for JS
      loadedElements.push(script);
    });

    // Cleanup function: remove all dynamically added CSS and JS when the component unmounts
    return () => {
      loadedElements.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="wrapper">
      {/* The Outlet renders the nested routes/components */}
      <Outlet />
    </div>
  );
}
