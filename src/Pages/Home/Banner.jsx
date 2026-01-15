import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Banner = () => {
    const images = [
        { src: "https://i.ibb.co.com/vCKwkKB6/pic3.jpg", alt: "Banner Image 1" },
        { src: "https://i.ibb.co.com/FbThkFv6/pic1.jpg", alt: "Banner Image 2" },
        { src: "https://i.ibb.co.com/SD56mdD2/pic2.jpg", alt: "Banner Image 3" },
        { src: "https://i.ibb.co.com/0VRvWW8W/pic-2.jpg", alt: "Banner Image 4" },
    ];

    return (
        <div className="w-[80vw] container mx-auto overflow-hidden">
            <Swiper
                slidesPerView={1}
                observer
                observeParents
                spaceBetween={0}
                loop={true}
                mousewheel={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Mousewheel, Pagination, Autoplay]}
                className="banner-swiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
//  h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]