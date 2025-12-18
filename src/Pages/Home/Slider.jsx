import React, { useEffect, useRef, useState } from 'react';
const CarouselStyles = () => (
    <style>{`
    /* This assumes 'Inter' font is loaded in your main index.html
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    */
    body {
        font-family: 'Inter', sans-serif;
    }

    /* Set a fixed height for the Swiper container. */
    .mySwiper {
        width: 100%;
        height: 450px;
    }

    /* Styles for each individual slide */
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        
        /* Center content in slide (optional, good for text) */
        display: flex;
        justify-content: center;
        align-items: center;

        /* Visual flair */
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    /* Ensure images fill the slide container */
    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    /* Custom styling for the navigation buttons */
    :root {
        --swiper-navigation-color: #ffffff;
        --swiper-pagination-color: #007aff;
    }

    .swiper-button-next,
    .swiper-button-prev {
        background-color: rgba(0, 0, 0, 0.4);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .swiper-button-next:hover,
    .swiper-button-prev:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    /* Adjust arrow icon size */
    .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 20px;
        font-weight: 900;
    }
    
    /* Make the active pagination dot slightly larger */
    .swiper-pagination-bullet-active {
        transform: scale(1.2);
        transition: transform 0.2s;
    }
  `}</style>
);
const useExternalScripts = (cssUrl, jsUrl) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const cssId = 'swiper-css';
        const jsId = 'swiper-js';

        // Check if scripts are already loaded
        if (document.getElementById(cssId) && document.getElementById(jsId)) {
            // Check if Swiper global object is available
            if (window.Swiper) {
                setLoaded(true);
            } else {
                // If scripts are loaded but Swiper isn't on window, wait a bit
                const interval = setInterval(() => {
                    if (window.Swiper) {
                        setLoaded(true);
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            }
            return;
        }

        // 1. Load Stylesheet
        const stylesheet = document.createElement('link');
        stylesheet.id = cssId;
        stylesheet.rel = 'stylesheet';
        stylesheet.href = cssUrl;
        document.head.appendChild(stylesheet);

        // 2. Load JavaScript
        const script = document.createElement('script');
        script.id = jsId;
        script.src = jsUrl;
        script.async = true;
        script.onload = () => {
            // Swiper library is loaded
            setLoaded(true);
        };
        script.onerror = () => {
            console.error("Failed to load Swiper.js");
            setLoaded(false);
        };
        document.body.appendChild(script);

        // Cleanup function
        return () => {
            const existingCss = document.getElementById(cssId);
            if (existingCss) {
                document.head.removeChild(existingCss);
            }
            const existingJs = document.getElementById(jsId);
            if (existingJs) {
                document.body.removeChild(existingJs);
            }
        };
    }, [cssUrl, jsUrl]);

    return loaded;
};

// Your main App component
export default function Slider() {

    // Array of images. Easier to manage as data.

//     
// 
// 
// 
// 
// 
// 

    const images = [
        { src: "https://i.ibb.co.com/vCKwkKB6/pic3.jpg", alt: "Placeholder Image 1" },
        { src: "https://i.ibb.co.com/FbThkFv6/pic1.jpg", alt: "Placeholder Image 2" },
        { src: "https://i.ibb.co.com/SD56mdD2/pic2.jpg", alt: "Placeholder Image 3" },
        { src: "https://i.ibb.co.com/0VRvWW8W/pic-2.jpg", alt: "Placeholder Image 4" },
        { src: "https://i.ibb.co.com/WrBB70z/pic-3.jpg", alt: "Placeholder Image 5" },
        { src: "https://i.ibb.co.com/gZ2XsH4s/pic0.jpg", alt: "Placeholder Image 6" },
        { src: "https://i.ibb.co.com/vvrYv56F/pic4.jpg", alt: "Placeholder Image 7" },
    ];

    // Load the Swiper libraries from CDN
    const scriptsLoaded = useExternalScripts(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
    );

    // Ref to hold the Swiper instance
    const swiperInstanceRef = useRef(null);
    // Ref to the swiper container element
    const swiperElRef = useRef(null);

    useEffect(() => {
        // Only initialize Swiper if...
        // 1. The scripts are loaded (window.Swiper is available)
        // 2. The component is mounted (swiperElRef.current is available)
        // 3. We haven't already initialized Swiper (swiperInstanceRef.current is null)
        if (scriptsLoaded && swiperElRef.current && !swiperInstanceRef.current) {

            // We must check for window.Swiper because the build environment
            // doesn't know about it.
            if (window.Swiper) {
                swiperInstanceRef.current = new window.Swiper(swiperElRef.current, {
                    // --- Core Features ---
                    loop: true,
                    centeredSlides: true,
                    slidesPerView: 1,
                    spaceBetween: 30,

                    // --- Modules ---
                    // The 'swiper-bundle.min.js' automatically includes and registers
                    // core modules like Autoplay, Pagination, Navigation.
                    // Explicitly passing them was causing the error.
                    // modules: [window.Swiper.Autoplay, window.Swiper.Pagination, window.Swiper.Navigation, window.Swiper.Keyboard],

                    // --- Autoplay ---
                    // Modules are enabled by providing their config objects
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },

                    // --- Controls ---
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    // --- Accessibility ---
                    keyboard: {
                        enabled: true,
                    },

                    // --- Responsive Breakpoints ---
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    },
                });
            }
        }

        // Cleanup: destroy Swiper instance when component unmounts
        return () => {
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.destroy();
                swiperInstanceRef.current = null;
            }
        };
    }, [scriptsLoaded]); // Re-run effect if scriptsLoaded changes

    return (
        <>
            {/* This component adds the custom CSS */}
            <CarouselStyles />

            {/* Main layout container (using Tailwind) */}
            <div  className="bg-base min-h-screen flex flex-col items-center p-4 sm:p-8">
                <h1 className="text-4xl font-bold text-primary mb-8">All Ticket Book From Here</h1>

                <div className="w-[80vw] max-w-6xl ">
                    <div className="swiper mySwiper" ref={swiperElRef}>
                        <div className="swiper-wrapper">
                            {/* Map over your images to create slides */}
                            {images.map((image, index) => (
                                <div className="swiper-slide" key={index}>
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                        </div>

                        {/* Add Pagination */}
                        <div className="swiper-pagination"></div>

                        {/* Add Navigation */}
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

