import React from 'react';
import Slider from './Slider';
import PopularRoutes from './PopularRoutes';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import AdvertisementSection from './AdvertisementSection';
import Accordion from './Accordion';

const Home = () => {
    return (
        <div className='w-7xl mx-auto'>
            <Slider/>
            <AdvertisementSection/>
            <WhyChooseUs/>
            <PopularRoutes/>
            <Testimonials/>
            <HowItWorks/>
            <Accordion/>
        </div>
    );
};

export default Home;