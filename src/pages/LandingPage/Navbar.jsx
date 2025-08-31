import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", color: "#90f188", bcolor: "#0f1d07", bbcolor: "#bae3b3" },
  { name: "About", color: "#82d7ff", bcolor: "#070035", bbcolor: "#b3e3e2" },
  { name: "Enterprise", color: "#90f188", bcolor: "#0f1d07", bbcolor: "#bae3b3" },
  // {name:'Pricing', color: '#90f188', bcolor: '#0f1d07', bbcolor: "#fbfbf8"},
  // // {name:'Thinking', color:'#90f188',bcolor:'#0f1d07', bbcolor: "#fbfbf8"},
  { name: "Employee", color: "#b488f1", bcolor: "#12032a", bbcolor: "#d1b3e3" },
];

function Navbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Home");
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    top: 0
  });
  const [hoverSliderStyle, setHoverSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    top: 0
  });
  const buttonRefs = useRef({});

  function isXsScreen() {
    return window.innerWidth < 640;
  }

  function getSliderPosition(buttonElement, page, isXs) {
    if (!buttonElement || !page) return { left: 0, width: 0, opacity: 0, top: 0 };
    const { offsetLeft, offsetWidth, offsetTop } = buttonElement;
    return {
      left: offsetLeft + 4,
      width: offsetWidth,
      opacity: 1,
      backgroundColor: page.bcolor,
      top: isXs ? offsetTop + 1 : offsetTop + 6
    };
  }

  useEffect(() => {
    function updateSliderPosition() {
      const homeButton = buttonRefs.current["Home"];
      const homePage = pages.find((p) => p.name === "Home");
      setSliderStyle(getSliderPosition(homeButton, homePage, isXsScreen()));
    }
    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);
    return () => window.removeEventListener("resize", updateSliderPosition);
  }, []);

  const handleButtonClick = (pageName) => {
    setActiveButton(pageName);
    const buttonElement = buttonRefs.current[pageName];
    const page = pages.find((p) => p.name === pageName);
    setSliderStyle(getSliderPosition(buttonElement, page, isXsScreen()));
  };

  const handleButtonHover = (pageName) => {
    const buttonElement = buttonRefs.current[pageName];
    if (buttonElement) {
      const { offsetLeft, offsetWidth, offsetTop } = buttonElement;
      setHoverSliderStyle({
        left: offsetLeft +4,
        width: offsetWidth,
        opacity: 1,
        backgroundColor: "#e3e3e3ff",
        top: isXsScreen() ? offsetTop +1 : offsetTop + 6
      });
    }
  };

  const handleButtonLeave = () => {
    if (activeButton) {
      const buttonElement = buttonRefs.current[activeButton];
      if (buttonElement) {
        const { offsetLeft, offsetWidth, offsetTop } = buttonElement;
        setHoverSliderStyle({
          left: offsetLeft +4,
          width: offsetWidth,
          opacity: 0,
          backgroundColor: "#e3e3e3ff",
          top: isXsScreen() ? offsetTop +1 : offsetTop +6
        });
      }
    } else {
      setHoverSliderStyle({ left: 0, width: 0, opacity: 0, top: 0 });
    }
  };

  return (
    <div className="flex justify-center pt-8 pb-4 bg-transparent w-full">
      <div
        className="flex justify-center max-w-full px-1 h-11 sm:h-11 md:h-12 lg:h-13 xl:h-13  rounded-[50px] relative transition-colors duration-300 ease-in-out"
        style={{
          backgroundColor: activeButton
            ? pages.find((page) => page.name === activeButton)?.bbcolor || "#f0f0f0"
            : "#f0f0f0",
        }}
      >
        {/* Active slider */}
        <div
          className="absolute rounded-[50px] transition-all duration-200 ease-in-out z-20 h-8 sm:h-8 md:h-9 lg:h-10 xl:h-10"
          style={{
            left: `${sliderStyle.left}px`,
            width: `${sliderStyle.width}px`,
            opacity: sliderStyle.opacity,
            backgroundColor: sliderStyle.backgroundColor,
            top: `${sliderStyle.top}px`
          }}
        />
        
        {/* Hover slider */}
        <div
          className="absolute rounded-[50px] transition-all duration-300 ease-in-out z-10 h-8 sm:h-8 md:h-9 lg:h-10 xl:h-10"
          style={{
            left: `${hoverSliderStyle.left}px`,
            width: `${hoverSliderStyle.width}px`,
            opacity: hoverSliderStyle.opacity,
            backgroundColor: hoverSliderStyle.backgroundColor,
            top: `${hoverSliderStyle.top}px`
          }}
        />
         
        <div className="relative z-30">
          {pages.map((page) => {
            // Determine route for each page
            let to = "/home";
            if (page.name === "Home") to = "/home";
            else if (page.name === "About") to = "/home/about";
            else if (page.name === "Enterprise") to = "/home/enterprise";
            else if (page.name === "Pricing") to = "/home/pricing";
            else if (page.name === "Employee") to = "/home/employee";

            const isActive = location.pathname === to || activeButton === page.name;

            return (
              <Link
                key={page.name}
                ref={(el) => (buttonRefs.current[page.name] = el)}
                to={to}
                onClick={() => handleButtonClick(page.name)}
                onMouseEnter={() => handleButtonHover(page.name)}
                onMouseLeave={handleButtonLeave}
                className="inline-block bg-transparent mt-1.5 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 px-4 py-1 sm:py-2 md:py-2.5 lg:py-3 xl:py-3 mx-1 sm:mx-1 md:mx-1 lg:mx-1 xl:mx-1 rounded relative z-30 transition-colors duration-300 ease-in-out text-10px sm:text-lg md:text-lg lg:text-lg xl:text-lg-700 font-medium capitalize min-w-0 hover:bg-transparent"
                style={{
                  color: isActive ? page.color || "white" : "black",
                  fontFamily: "system-ui",
                }}
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;