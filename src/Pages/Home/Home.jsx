import React from 'react';
import Slider from './Slider';
import PopularRoutes from './PopularRoutes';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import AdvertisementSection from './AdvertisementSection';
import Accordion from './Accordion';
import LatestTickets from './LatestTickets';
import Banner from './Banner';
import Hero1 from './Hero1';

const Home = () => {
    return (
        <div className='container mx-auto'>
            <Slider/>
            <AdvertisementSection/>
            <LatestTickets/>
            <WhyChooseUs/>
            <PopularRoutes/>
            <Testimonials/>
            <HowItWorks/>
            <Accordion/>
        </div>
    );
};

export default Home;