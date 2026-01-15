import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='w-screen h-screen  flex justify-center items-center'> 
            {/* <span className="loading loading-spinner text-primary loading-sm md:loading-md lg:loading-xl"></span> */}
            <span class="loader"></span>
        </div>
    );
};

export default LoadingSpinner;