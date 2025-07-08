import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function WebLayout() {
  useEffect(() => {
    const cssFiles = [
      "/Web/img/favicon.png",
      "/Web/img/apple-touch-icon.png",
      "/Web/vendor/bootstrap/css/bootstrap.min.css",
      "/Web/vendor/bootstrap-icons/bootstrap-icons.css",
      "/Web/vendor/aos/aos.css",
      "/Web/vendor/glightbox/css/glightbox.min.css",
      "/Web/vendor/swiper/swiper-bundle.min.css",
      "/Web/css/main.css",
    ];

    const jsFiles = [
      "/Web/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "/Web/vendor/php-email-form/validate.js",
      "/Web/vendor/aos/aos.js",
      "/Web/vendor/glightbox/js/glightbox.min.js",
      "/Web/vendor/purecounter/purecounter_vanilla.js",
      "/Web/vendor/swiper/swiper-bundle.min.js",
      "/Web/vendor/imagesloaded/imagesloaded.pkgd.min.js",
      "/Web/vendor/isotope-layout/isotope.pkgd.min.js",
      "/Web/js/main.js",
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
      script.async = false;
      script.defer = true;
      document.body.appendChild(script);
      loadedElements.push(script);
    });

    return () => {
      loadedElements.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  return (
    <div className="index-page">
      <Outlet />
    </div>
  );
}
