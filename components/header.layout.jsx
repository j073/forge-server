import React, {useState, useEffect } from 'react';

function HeaderLayout () {
   
    function mobileMenu(e) {
        e.preventDefault();
        var element = document.getElementById("append-menu-header");
        element.classList.add("active");
    }

    function closeMenu(e) {
        e.preventDefault();
        var element = document.getElementById("append-menu-header");
        element.classList.remove("active");
    }

    return (
        <>
        <header className="site-header site-header--menu-right fugu--header-section fugu--header-three " id="sticky-menu">
            <div className="container-fluid">
                <nav className="navbar site-navbar">
                    <div className="brand-logo"><a href="/" aria-label="Great RAJAZEUS"><noscript>
                                <img id="logobrand" alt="" srcSet="./assets/img/logorz.webp 1x, /images/nextImageExportOptimizer/logortpgroup-opt-384.WEBP 2x"
                                    src="https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp" width="350"
                                    height="45" decoding="async" data-nimg="1" className="light-version-logo" loading="lazy"
                                    style={{ color: "transparent"}} /></noscript>
                                <img id="logobrand" alt="" srcSet="https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp"
                                src="https://it-cgg.b-cdn.net/rtp/rmj/999f3b90-5abf-4ec3-8c68-3f9def53cb01.webp" width="350" height="45"
                                decoding="async" data-nimg="1" className="light-version-logo" loading="lazy"/><svg
                                style={{ width: "auto", maxHeight: "100%", border: 0, clip: "rect(0 0 0 0)", height: 0, margin: "-1px", overflow: "hidden", padding: 0, position: "absolute", width: "1px" }}>
                                <filter id="sharpBlur">
                                    <feGaussianBlur stdDeviation="20" colorInterpolationFilters='sRGB'>
                                    </feGaussianBlur>
                                    <feColorMatrix type="matrix" colorInterpolationFilters='sRGB'
                                        values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix>
                                    <feComposite in2="SourceGraphic" operator="in"></feComposite>
                                </filter>
                            </svg></a>
                            </div>
                            <div className="header-btn desktop header-btn-l1 ms-auto d-flex d-none d-xs-inline-flex">
                                <a className="btn" href="https://urlshortenertool.com/RTP-RM" style={{ color: "white", marginRight: "10px" }}>CEK RTP SEKARANG</a>
                                <a className="fugu--btn fugu--menu-btn1" href="https://urlshortenertool.com/RTP-RM">DAFTAR</a>
                            </div>
                            <div className="header-btn mobile">
                                <a className="fugu--btn fugu--menu-btn1" style={{width: "25px !important", marginTop: "15px", marginRight: "2.5px", color: "white !important"}} href="https://urlshortenertool.com/RTP-RM">Daftar</a>
                            </div>
                {/* <div onClick={mobileMenu}  className="mobile-menu-trigger" href="https://urlshortenertool.com/RTP-RM"><span></span></div> */}
                </nav>
                <nav className="menu-block" id="append-menu-header">
                <div className="mobile-menu-head"><div className="mobile-menu-close" onClick={closeMenu}>×</div></div>
                <ul className="site-menu-main">
                    <li className="nav-item nav-item-has-children desktop-d-none">
                    <ul className="sub-menu active nav-item" id="submenu-2">
                        <li className="sub-menu--item">
                        <a className="drop-trigger" href="/rtp-gbowin/">Menu 1</a>
                        </li>
                        <li className="sub-menu--item">
                        <a className="drop-trigger" href="/rtp-gbowin/">Menu 2</a>
                        </li>
                        <li className="sub-menu--item">
                        <a className="drop-trigger" href="/rtp-gbowin/">Menu 3</a>
                        </li>
                        <li className="sub-menu--item">
                        <a className="drop-trigger" href="/rtp-gbowin/">Menu 4</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </nav>

            </div>
        </header>
        </>  
    );
};

export default HeaderLayout;