import React from 'react';
import Slider from './Slider';
import PopularRoutes from './PopularRoutes';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import AdvertisementSection from './AdvertisementSection';

const Home = () => {
    return (
        <div>
            <Slider/>
            <AdvertisementSection/>
            <WhyChooseUs/>
            <PopularRoutes/>
            <Testimonials/>
            <HowItWorks/>
        </div>
    );
};

export default Home;