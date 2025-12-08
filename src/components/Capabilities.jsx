import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Globe2 } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    className="group p-8 border border-gray-100 rounded-3xl hover:border-gray-200 hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden flex flex-col justify-start h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <Cpu className="w-24 h-24 text-gray-50 rotate-12" />
    </div>

    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300 relative z-10 shrink-0">
      <Icon className="w-7 h-7"/>
    </div>
    <h4 className="text-2xl font-bold mb-4 tracking-tight relative z-10">{title}</h4>
    <p className="text-gray-600 leading-loose tracking-wide font-light relative z-10">{desc}</p>
  </motion.div>
);

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative">
      <div className="mb-16 md:mb-24 md:max-w-2xl">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Our Expertise</h2>
        <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-relaxed text-[#111111] text-balance">The Weird Landscape.</h3>
        <p className="mt-6 text-lg md:text-xl text-gray-500 font-light leading-relaxed tracking-wide">We don&apos;t sell off-the-shelf products. We solve unique problems using whatever tool is best.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={Cpu}
          title="AI Consultation"
          desc="For businesses navigating the AI landscape or just starting. We integrate pragmatic AI solutions that actually drive efficiency, skipping the hype."
          delay={0.1}
        />
        <ServiceCard 
          icon={Code2}
          title="Custom Software"
          desc="From complex web platforms to mobile apps. We build robust systems tailored to your specific operational needs."
          delay={0.2}
        />
        <ServiceCard 
          icon={Globe2}
          title="Frontier Tech & IoT"
          desc="Bridging the gap between physical hardware and digital intelligence. We handle the intricate, complex engineering."
          delay={0.3}
        />
      </div>
    </section>
  );
};

export default Capabilities;
