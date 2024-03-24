import BannerSlide from "./BannerSlide.vue";
import Checkup from "./Checkup.vue";
import Menu from "./Menu.vue";

export default function BodyLayout() {

  return (
    <>
      <div id="sectmobile" class="fugu--hero-section">
        <div class="container">
          <div class=" container slick containerwd slick-initialized slick-slider" id="titleupdated">
              <div class="slick-list draggable container">
                <div class="marquee">
                  <Checkup />
                </div>
              </div>
          </div>
        </div>
        <BannerSlide/>
        <div class="container">
          <div class="fugu--hero-shape1">
            <svg
              style={{
                border: 0,
                clip: "rect(0 0 0 0)",
                height: 0,
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
              }}
            >
              <filter id="sharpBlur">
                <feGaussianBlur
                  stdDeviation="20"
                  colorInterpolationFilters="sRGB"
                ></feGaussianBlur>
                <feColorMatrix
                  type="matrix"
                  colorInterpolationFilters="sRGB"
                  values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
                ></feColorMatrix>
                <feComposite in2="SourceGraphic" operator="in"></feComposite>
              </filter>
            </svg>
          </div>
          <div class="fugu--hero-shape2"></div>
        </div>
      </div>
      <div class="section" style="background-color: #00002a">
        <Menu/>
     </div>
    </>
  );
}