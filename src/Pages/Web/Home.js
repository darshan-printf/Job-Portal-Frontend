import React from 'react'
import WebLayout from '../../components/WebLayout';



export default function Home() {

    return (
        <WebLayout>
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
        </WebLayout>

    )
}
