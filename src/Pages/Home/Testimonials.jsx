import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const reviews = [
  { name: "Rahim Uddin", role: "Traveler", comment: "Smooth and fast booking experience." },
  { name: "Nusrat Jahan", role: "Frequent Traveler", comment: "Clean UI and easy navigation." },
  { name: "Mehedi Hasan", role: "Business Traveler", comment: "Secure payment and instant confirmation." },
  { name: "Ayesha Siddika", role: "Student", comment: "Best ticket platform I’ve used so far." },
  { name: "Tanvir Ahmed", role: "Tourist", comment: "Multiple transport options in one place." },
  { name: "Farzana Islam", role: "Office Commuter", comment: "Loved the real-time countdown feature." },
  { name: "Shakib Al Hasan", role: "Traveler", comment: "Very professional booking system." },
  { name: "Sabbir Rahman", role: "Frequent User", comment: "Fast, simple, and reliable platform." },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-14 text-primary">
          What Our Users Say
        </h2>

        <Swiper
          effect="coverflow"
          centeredSlides
          loop
          slidesPerView={3}
          spaceBetween={40}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.8,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="testimonial-swiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-200 shadow-xl p-8 text-center transition-all duration-300">
                <p className="italic text-gray-700">
                  “{review.comment}”
                </p>
                <h4 className="mt-5 font-semibold">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.role}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔥 Styling for focus & fade */}
      <style>{`
        .testimonial-swiper .swiper-slide {
          opacity: 0.45;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }

        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
