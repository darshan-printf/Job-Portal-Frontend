import React, { useEffect } from 'react'
import WebLayout from '../../components/WebLayout';
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export default function Home() {
    useEffect(() => {
        new Swiper(".init-swiper", {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 5000,
            },
            slidesPerView: "auto",
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            },
        });
    }, []);
    return (
        <>
            <header id="header" className="header d-flex align-items-center sticky-top">
                <div className="container-fluid container-xl position-relative d-flex align-items-center">

                    <a href="index.html" className="logo d-flex align-items-center me-auto">
                        {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
                        {/* <!-- <img src="Web/img/logo.png" alt=""> --> */}
                        <h1 className="sitename">Vesperr</h1>
                    </a>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="#hero" className="active">Home<br /></a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#team">Team</a></li>
                            <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Dropdown 1</a></li>
                                    <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                        <ul>
                                            <li><a href="#">Deep Dropdown 1</a></li>
                                            <li><a href="#">Deep Dropdown 2</a></li>
                                            <li><a href="#">Deep Dropdown 3</a></li>
                                            <li><a href="#">Deep Dropdown 4</a></li>
                                            <li><a href="#">Deep Dropdown 5</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Dropdown 2</a></li>
                                    <li><a href="#">Dropdown 3</a></li>
                                    <li><a href="#">Dropdown 4</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    <a className="btn-getstarted" href="index.html#about">Get Started</a>

                </div>
            </header>
            <main className="main">

                <section id="hero" className="hero section">

                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                <h1>Grow your business with Vesperr</h1>
                                <p>We are team of talented designers making websites with Bootstrap</p>
                                <div className="d-flex">
                                    <a href="#about" className="btn-get-started">Get Started</a>
                                    <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center"></a>
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 hero-img">
                                <img src="Web/img/hero-img.png" className="img-fluid animated" alt="" />
                            </div>
                        </div>
                    </div>

                </section>

                <section id="clients" className="clients section light-background">

                    <div className="container" data-aos="fade-up">

                        <div className="row gy-4">

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-1.png" className="img-fluid" alt="" />
                            </div>

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-2.png" className="img-fluid" alt="" />
                            </div>

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-3.png" className="img-fluid" alt="" />
                            </div>

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-4.png" className="img-fluid" alt="" />
                            </div>

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-5.png" className="img-fluid" alt="" />
                            </div>

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="Web/img/clients/client-6.png" className="img-fluid" alt="" />
                            </div>

                        </div>

                    </div>

                </section>

                <section id="about" className="about section">


                    <div className="container section-title" data-aos="fade-up">
                        <h2>About Us</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>

                    <div className="container">

                        <div className="row gy-5">

                            <div className="content col-xl-5 d-flex flex-column" data-aos="fade-up" data-aos-delay="100">
                                <h3>Voluptatem dignissimos provident quasi</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                                </p>
                                <a href="#" className="about-btn align-self-center align-self-xl-start"><span>About us</span> <i className="bi bi-chevron-right"></i></a>
                            </div>

                            <div className="col-xl-7" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-briefcase"></i>
                                        <h4><a href="" className="stretched-link">Corporis voluptates sit</a></h4>
                                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                                    </div>

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-gem"></i>
                                        <h4><a href="" className="stretched-link">Ullamco laboris nisi</a></h4>
                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                                    </div>

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-broadcast"></i>
                                        <h4><a href="" className="stretched-link">Labore consequatur</a></h4>
                                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                                    </div>

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-easel"></i>
                                        <h4><a href="" className="stretched-link">Beatae veritatis</a></h4>
                                        <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </section>




                <section id="services" className="services section">


                    <div className="container section-title" data-aos="fade-up">
                        <h2>Services</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>


                    <div className="container">

                        <div className="row gy-4">

                            <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                                <div className="service-item position-relative">
                                    <i className="bi bi-activity"></i>
                                    <h4><a href="" className="stretched-link">Lorem Ipsum</a></h4>
                                    <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
                                <div className="service-item position-relative">
                                    <i className="bi bi-bounding-box-circles"></i>
                                    <h4><a href="" className="stretched-link">Sed ut perspici</a></h4>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
                                <div className="service-item position-relative">
                                    <i className="bi bi-calendar4-week"></i>
                                    <h4><a href="" className="stretched-link">Magni Dolores</a></h4>
                                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="400">
                                <div className="service-item position-relative">
                                    <i className="bi bi-broadcast"></i>
                                    <h4><a href="" className="stretched-link">Nemo Enim</a></h4>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>


                <section id="alt-services" className="alt-services section">

                    <div className="container" data-aos="fade-up" data-aos-delay="100">

                        <div className="row gy-4">

                            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
                                <div className="service-item position-relative">
                                    <div className="img">
                                        <img src="Web/img/services-1.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="details">
                                        <a href="service-details.html" className="stretched-link">
                                            <h3>Nesciunt Mete</h3>
                                        </a>
                                        <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="300">
                                <div className="service-item position-relative">
                                    <div className="img">
                                        <img src="Web/img/services-2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="details">
                                        <a href="service-details.html" className="stretched-link">
                                            <h3>Eosle Commodi</h3>
                                        </a>
                                        <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="400">
                                <div className="service-item position-relative">
                                    <div className="img">
                                        <img src="Web/img/services-3.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="details">
                                        <a href="service-details.html" className="stretched-link">
                                            <h3>Ledo Markt</h3>
                                        </a>
                                        <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="500">
                                <div className="service-item position-relative">
                                    <div className="img">
                                        <img src="Web/img/services-4.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="details">
                                        <a href="service-details.html" className="stretched-link">
                                            <h3>Asperiores Commodit</h3>
                                        </a>
                                        <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
                                        <a href="service-details.html" className="stretched-link"></a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>











            </main>

            <footer id="footer" className="footer">
                <div className="container">
                    <div className="copyright text-center ">
                        <p>
                            © <span>Copyright</span>{" "}
                            <strong className="px-1 sitename">Vesperr</strong>{" "}
                            <span>All Rights Reserved</span>
                        </p>
                    </div>
                    <div className="social-links d-flex justify-content-center">
                        <a href="">
                            <i className="bi bi-twitter-x" />
                        </a>
                        <a href="">
                            <i className="bi bi-facebook" />
                        </a>
                        <a href="">
                            <i className="bi bi-instagram" />
                        </a>
                        <a href="">
                            <i className="bi bi-linkedin" />
                        </a>
                    </div>
                    <div className="credits">

                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>


        </>

    )
}
