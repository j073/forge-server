function HeaderLayout () {
    return (
        <>
        <header className="site-header site-header--menu-right fugu--header-section fugu--header-three " id="sticky-menu">
            <div className="container-fluid">
                <center>
                    <a href="/" aria-label="Great RAJAZEUS">
                            <img alt="" srcSet="https://it-cgg.b-cdn.net/rtp/rajazeus/logorz.webp"
                            src="https://it-cgg.b-cdn.net/rtp/rajazeus/logorz.webp" width="350" height="65"
                            decoding="async" data-nimg="1" className="light-version-logo" loading="lazy"/>
                    </a>
                </center>
            </div>
        </header>
        </>  
    );
};

export default HeaderLayout;