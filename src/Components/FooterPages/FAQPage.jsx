import React, { useEffect, useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How do I book a stay on Airbnb?",
        answer: "You can book a stay by searching for your desired destination, selecting dates, and choosing a listing that fits your needs. Once selected, follow the booking process by creating an account or logging in, and completing payment."
    },
    {
        question: "What is Airbnb's cancellation policy?",
        answer: "Airbnb offers different cancellation policies depending on the host's settings, ranging from flexible to strict. Review the specific cancellation policy on the listing page before booking."
    },
    {
        question: "How can I become an Airbnb host?",
        answer: "Becoming a host is simple! Sign up on Airbnb, list your property with details and photos, set your pricing and availability, and publish your listing to start welcoming guests."
    },
    {
        question: "Are there any service fees when booking on Airbnb?",
        answer: "Yes, Airbnb charges a service fee for bookings, which helps cover the cost of running the platform and offering 24/7 support. The exact fee is displayed during the checkout process."
    },
    {
        question: "Is Airbnb safe to use?",
        answer: "Airbnb is committed to safety with verified profiles, secure payment systems, and community reviews. Additionally, Airbnb offers 24/7 support and policies to address issues that may arise."
    },
    {
        question: "How can I contact my host?",
        answer: "Once you've booked a stay, you can communicate with your host through Airbnb's messaging platform. This ensures all communication is secure and easily accessible."
    },
    {
        question: "What should I do if I have a problem during my stay?",
        answer: "If you encounter issues during your stay, first contact your host to resolve the problem. If the issue persists, reach out to Airbnb support for further assistance."
    },
    {
        question: "Can I book an experience through Airbnb?",
        answer: "Yes, Airbnb offers Experiences, which are activities hosted by locals. Browse and book experiences alongside your stay to make your trip more memorable."
    },
    {
        question: "What payment methods does Airbnb accept?",
        answer: "Airbnb accepts major credit and debit cards, PayPal, Apple Pay, Google Pay, and other regional payment methods. Available options may vary based on your location."
    }
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='bg-gray-100  min-h-screen pt-[120px] pb-8 px-4 md:px-8'>
            <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
                <h1 className='text-2xl md:text-3xl font-bold mb-6 text-center text-rose-500'>
                    <FaQuestionCircle className='inline mr-2' />
                    Frequently Asked Questions
                </h1>

                <div className='h-[3px] mb-[35px] w-[89%] mx-auto bg-rose-500'></div>

                <p className='text-lg text-rose-900 font-medium mb-6'>
                    Welcome to the FAQ section of Airbnb. Here you'll find answers to common questions about booking, hosting, and using our platform. If you have further inquiries, our support team is here to help.
                </p>

                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className='mb-4'>
                            <button
                                className='w-full text-left text-lg font-semibold text-rose-800 py-2 px-4 bg-rose-50 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 flex items-center justify-between'
                                onClick={() => handleToggle(index)}
                                type='button'
                            >
                                <span>{faq.question}</span>
                                <motion.div
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: openIndex === index ? 0.8 : 1.2 }}
                                    transition={{ duration: 0.5 }}
                                    className='text-rose-800'
                                >
                                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className='mt-2 px-4'
                                    >
                                        <p className='text-rose-900'>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
