import { useEffect } from 'react';
import { FaRegHandshake, FaListAlt, FaRegClock, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TermsOfService = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='bg-gray-100 pt-[120px] min-h-screen py-8 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8'>
        <motion.h1
          className='text-3xl md:text-4xl font-[700]  mb-6 text-rose-600 text-center'
          variants={headingVariants}
          initial='hidden'
          animate='visible'
        >
          Terms of Service
        </motion.h1>
        

        <div className='h-[3px] mb-[35px] w-[89%] mx-auto bg-rose-500'></div>
        <motion.p
          className='text-lg text-rose-700 mb-8 leading-relaxed'
          variants={textVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.8 }}
        >
          Welcome to Airbnb. By using our platform and services, you agree to the following terms and conditions. Please review them carefully to understand your responsibilities and rights.
        </motion.p>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.2 }}
          >
            <FaRegHandshake className='text-3xl text-rose-600 mr-3' />
            Agreement to Terms
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.4 }}
            className='text-rose-700'
          >
            By accessing or using Airbnb, you agree to comply with these terms. If you do not agree, you may not use our services. Ensure you review our policies, including hosting guidelines and guest responsibilities.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
          >
            <FaListAlt className='text-3xl text-rose-600 mr-3' />
            Guest and Host Responsibilities
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.8 }}
            className='text-rose-700'
          >
            Guests must adhere to house rules and treat properties with care. Hosts are responsible for providing accurate listing information and maintaining safe environments. Misuse of the platform may result in account suspension.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.0 }}
          >
            <FaRegClock className='text-3xl text-rose-600 mr-3' />
            Booking and Cancellation Policies
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.2 }}
            className='text-rose-700'
          >
            All bookings are subject to the host’s cancellation policy. Guests should review these policies carefully before confirming their reservation. Airbnb does not guarantee refunds beyond the agreed policy terms.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.4 }}
          >
            <FaExclamationTriangle className='text-3xl text-rose-600 mr-3' />
            Limitation of Liability
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.6 }}
            className='text-rose-700'
          >
            Airbnb is not responsible for any indirect, incidental, or consequential damages arising from the use of our platform. Our liability is limited to the extent permitted by applicable laws.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.8 }}
          >
            <FaRegHandshake className='text-3xl text-rose-600 mr-3' />
            Updates to Terms
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.0 }}
            className='text-rose-700'
          >
            Airbnb reserves the right to update these terms at any time. Changes will be communicated via email or through our platform. Continued use of Airbnb signifies your agreement to the updated terms.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-semibold text-rose-800 mb-4 flex items-center'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.2 }}
          >
            <FaRegHandshake className='text-3xl text-rose-600 mr-3' />
            Contact Us
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.4 }}
            className='text-rose-700'
          >
            For any questions or concerns regarding these Terms of Service, contact Airbnb at <a href="mailto:terms@airbnb.com" className='text-rose-600 underline'>terms@airbnb.com</a>.
          </motion.p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
