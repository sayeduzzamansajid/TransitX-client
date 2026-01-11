import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img className='w-8 lg:w-13' src={logo} alt="" />
            <h3 className='text-3xl font-bold text-primary'>Transit<span className='text-[#9CA3AF]'>X</span></h3>
        </div>
    );
};

export default Logo;