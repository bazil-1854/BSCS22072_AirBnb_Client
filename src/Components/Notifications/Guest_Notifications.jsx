import React from "react";
import { TbBrandBooking } from "react-icons/tb";
import { useAuthContext } from "../../AuthProvider";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GuestNotifications = () => {
    const navigate = useNavigate();
    const { notifications } = useAuthContext();

    return (
        <div className='bg-gray-50 pt-[100px] min-h-screen pb-[65px] justify-center items-center '>
            <div className="max-w-[950px] mx-auto px-6" >
                <div className="flex items-center text-rose-600"> 
                        <IoNotificationsCircleOutline size={35} className="mr-[8px]"/> 
                    <h3 className='text-[24px]   font-[700]  text-start'>Notifications</h3>
                </div>

                <div className='h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]'></div>
                
                <div className="flex flex-col space-y-[15px]">
                    {notifications.map((notification, index) => (
                        <div key={index} className="border-b-[2px] border-rose-700  lg:px-[20px] py-[15px] flex flex-col">
                            <div className="flex items-center">
                                <div className='w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <h3 className="text-[16px] ml-[5px] text-rose-700 font-[500]">{notification.title} 
                                <span className={`scale-[0.9] mt-[5px] uppercase font-[600] px-[12px] mx-[8px] pb-[2px] text-white rounded-[30px] text-[13px] 
                                    ${notification.UpdatedStatus === 'approved' ? 'bg-green-800' :
                                        notification.UpdatedStatus === 'pending' ? 'bg-yellow-600' :
                                            notification.UpdatedStatus === 'rejected' ? 'bg-red-800' : 'text-gray-800'}`}
                                >
                                    {notification.UpdatedStatus}
                                </span>
                                </h3>
                            </div>
                            {/*  <p className="ml-[38px]">{notification.details}</p> */}

                            <p className="ml-[48px] break-words">Your reservation for {notification.address}
                                between {notification.checkInOut} has been
                                <span className={`scale-[0.9] mt-[5px] px-[8px] font-[700] underline 
                                     ${notification.UpdatedStatus === 'approved' ? 'text-green-800' :
                                        notification.UpdatedStatus === 'rejected' ? 'text-red-600' : 'text-yellow-700'}`}
                                >
                                    {notification.UpdatedStatus}
                                </span>

                                by Host {notification.host}.</p>
                            <button onClick={() => navigate(`/listing/${notification.listingId}`)} className="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start">See Listing</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestNotifications;
