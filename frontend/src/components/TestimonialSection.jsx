import React from "react";

const testimonials = [
  {
    name: "Mohamed Ibrahim",
    text: "Excellent service and top-quality crackers! Fast delivery and safe packaging. Highly recommend SM Crackers for festive shopping.",
  },
  {
    name: "Rajesh",
    text: "Fantastic experience — great variety and prices. Their fireworks made our Diwali truly memorable!",
  },
  {
    name: "Ashley Jude",
    text: "Beautiful and colorful fireworks. Very professional and friendly service. Would definitely buy again.",
  },
  {
    name: "Eswara Prakash",
    text: "Quick response and prompt delivery. The crackers were vibrant and safely packed. Trusted brand!",
  },
  {
    name: "Jawahar",
    text: "SM Crackers has the best customer support. They guided me in choosing the right combo boxes for my family.",
  },
  {
    name: "Suresh",
    text: "Affordable, safe, and amazing quality! The entire process was smooth from order to delivery.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-indigo-50/40 to-white py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          What Our Customers Say
        </h2>
        <div className="mt-3 h-[2px] w-20 bg-indigo-500 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Here’s what our happy customers have to say about their experience
          with SM Crackers.
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-slow gap-6 md:gap-8">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
            >
              <p className="text-gray-600 italic mb-4 text-sm md:text-base leading-relaxed">
                “{t.text}”
              </p>
              <h4 className="text-indigo-600 font-semibold text-base md:text-lg">
                {t.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
