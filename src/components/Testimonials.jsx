import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import { testimonials } from "../data/testimonials";

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-dark-900 relative overflow-hidden">
    <section id="testimonials" className="py-16 bg-dark-900 relative overflow-hidden">
1/4 w-96 h-96 bg-cyber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-fl          className="text-center mb-10"
-full bg-cyber-500/10 border border-cyber-500/30 mb-4">
            <MessageSquare className="h-4 w-4 text-cyber-400" />
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/30 mb-3">
 sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our <span className="text-gradient">Graduates Say</span>
          </h2>
          <p className="text-dark-400 text-lg ma          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
eir careers with our training.
          </p>
        </motion.div>

        <div           <p className="text-dark-400 text-base max-w-2xl mx-auto">
p((testimonial, index) => (
            <motion.div
              key={testimonial.id}
           <div className="grid md:grid-cols-2 gap-5">
  initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-dark-950/50 rounded-2xl p-8 border border-dark-700"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-cyber-500/10" />
                          className="relative bg-dark-950/50 rounded-xl p-5 border border-dark-700"
src={testimonial.image}
                  alt={testimonial.name}
                  clas              <Quote className="absolute top-4 right-4 h-10 w-10 text-cyber-500/10" />
              <div className="flex items-center gap-3 mb-4">
"text-lg font-bold text-white">{testimonial.name}</h4>
                  <p className="text-dark-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

                  className="w-12 h-12 rounded-full object-cover border-2 border-cyber-500/30"
].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <h4 className="text-base font-bold text-white">{testimonial.name}</h4>
g-relaxed mb-4 italic">
                "{testimonial.quote}"
              </p>

                         <div className="flex gap-1 mb-3">
0">
                <span className="text-cyber-400 text-sm font-medium">
                               <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export               <p className="text-dark-300 text-sm leading-relaxed mb-3 italic">

              <div className="pt-3 border-t border-dark-700">