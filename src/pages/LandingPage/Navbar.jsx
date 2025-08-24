import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useRef} from 'react';


const pages = [
    {name:'Home', color:'#90f188',bcolor:'#0f1d07', bbcolor: "#fbfbf8"},
    {name:'About', color:'#82d7ff',bcolor:'#070035', bbcolor: "#e0edeb"},
    {name:'Work', color:'#90f188',bcolor:'#0f1d07', bbcolor: "#fbfbf8"},
    {name:'Expertise', color: '#90f188', bcolor: '#0f1d07', bbcolor: "#fbfbf8"},
    {name:'Thinking', color:'#90f188',bcolor:'#0f1d07', bbcolor: "#fbfbf8"},
    {name:'Contact', color:'#b488f1',bcolor:'#12032a', bbcolor: "#eae8ee"},
];

function Navbar() {  

  const [activeButton, setActiveButton] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverSliderStyle, setHoverSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const buttonRefs = useRef({});

  const handleButtonClick = (pageName) => {
    setActiveButton(pageName);
    const buttonElement = buttonRefs.current[pageName];
    const page = pages.find(p => p.name === pageName);
    
    if (buttonElement && page.bcolor) {
      const { offsetLeft, offsetWidth } = buttonElement;
      setSliderStyle({
        left: offsetLeft + 6,
        width: offsetWidth,
        opacity: 1,
        backgroundColor: page.bcolor
      });
    }
  };

  const handleButtonHover = (pageName) => {
    const buttonElement = buttonRefs.current[pageName];
    
    if (buttonElement) {
      const { offsetLeft, offsetWidth } = buttonElement;
      setHoverSliderStyle({
        left: offsetLeft + 6,
        width: offsetWidth,
        // opacity: 1,
        backgroundColor: '#e3e3e3ff'
      });
    }
  };

  const handleButtonLeave = () => {
    if (activeButton) {
      const buttonElement = buttonRefs.current[activeButton];
      if (buttonElement) {
        const { offsetLeft, offsetWidth } = buttonElement;
        setHoverSliderStyle({
          left: offsetLeft + 6,
          width: offsetWidth,
          opacity: 1,
          backgroundColor: '#e3e3e3ff'
        });
      }
    } else {
      setHoverSliderStyle({ left: 0, width: 0, opacity: 0 });
    }
  };

  return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt:3, backgroundColor: 'transparent', width: '100%'} }>  
          <Box sx = {{
            backgroundColor: activeButton ? pages.find(page => page.name === activeButton)?.bbcolor || '#f0f0f0' : '#f0f0f0', 
            justifyContent: 'center', 
            display: 'flex', 
            maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '40%', xl: '30%' }, 
            width: 'fit-content',
            px: { xs: 0.5, sm: 1, md: 1, lg: 1, xl: 1 },
            py:0.5, 
            borderRadius: 5,
            position: 'relative',
            transition: 'background-color 0.3s ease-in-out'
          }}>
            <Box
              sx={{
                position: 'absolute',
                height: 32,
                borderRadius: 4,
                transition: 'all 0.2s ease-in-out',
                zIndex: 2,
                top: { xs: 4, sm: 5, md: 6, lg: 6, xl: 6 },
                ...sliderStyle
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                height: 32,
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
                zIndex: 1,
                top: 6,
                ...hoverSliderStyle
              }}
            />
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                {pages.map((page) => (
                  <Button
                  key={page.name}
                  ref={(el) => buttonRefs.current[page.name] = el}
                  onClick={() => handleButtonClick(page.name)}
                  onMouseEnter={() => handleButtonHover(page.name)}
                  onMouseLeave={handleButtonLeave}
                  sx={{
                    color: activeButton === page.name ? (page.color || 'white') : 'black',
                    backgroundColor: 'transparent',
                    px: { xs: 0.5, sm: 0.5, md: 1, lg: 1, xl: 1 },
                    py: 0.4,
                    my: 0.2,
                    mx: { xs: 0.1, sm: 0.1, md: 0.2, lg: 0.2, xl: 0.2 },
                    borderRadius: 4,
                    fontFamily: 'system-ui', 
                    textTransform: 'capitalize', 
                    fontSize: { xs: 12, sm: 13, md: 14, lg: 14, xl: 15 },
                    position: 'relative',
                    zIndex: 3,
                    transition: 'color 0.3s ease-in-out',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
  );
}
export default Navbar;