import React from "react"; 
import { TbBrandBooking } from "react-icons/tb";
import { useAuthContext } from "../../AuthProvider";

const GuestNotifications = () => {
    const { notifications } = useAuthContext();

    return (
        <div className='bg-gray-50 pt-[100px] min-h-screen pb-[65px] justify-center items-center '>
            <div className="max-w-[950px] mx-auto px-6" >
                <div className="flex items-center">
                    <div className='w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600'>
                        <TbBrandBooking />
                    </div>
                    <h3 className='text-[24px]  text-rose-600 font-[700]  text-start'>Notifications</h3>
                </div>

                <div className='h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]'></div>
                <div className="flex flex-col space-y-[15px]">
                    {notifications.map((notification, index) => (
                        <div key={index}>
                            <h3>{notification.title}</h3>
                            <p>{notification.details}</p>
                            <p>{notification.listingId}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestNotifications;
