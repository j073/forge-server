export default function FooterLayout () {
    return (
        <>
        <footer className="fugu--footer-section">
        <div className="container">
                <Livechat/>
                <div className="fugu--footer-bottom" style={{color: "white"}}>© Copyright 2024 All Rights Reserved by RAJAZEUS</div>
        </div>
        <div className="rajazeus-icon">
        <a href="https://bit.ly/VPNrajazeus" target="_blank">
            <img src="https://ik.imagekit.io/axsffrw1s/vpn.png?updatedAt=1702806701457" class="vpnmobile" alt="VPN Indonesia"/>
        </a>
        <a href="https://shortener.run/rtp-rajazeus" target="_blank">
            <img src="https://ik.imagekit.io/axsffrw1s/rtp.gif?updatedAt=1707713567728" class="rtpbutton" alt="RTP Live"/>
        </a>
        <a href="https://t.me/RAJAZEUS1/" target="_blank">
            <img src="https://i.ibb.co/SBFGc5R/telegram.png" class="telegrambutton" alt="Chat Telegram"/>
        </a>
        <a href="https://kontak.sbs/wa-raja-zeus/" target="_blank">
            <img src="https://i.ibb.co/CmSLRYC/wa.png" class="wabutton" alt="Chat WA"/>
        </a>
        </div>
        </footer>
        </>
    );
}