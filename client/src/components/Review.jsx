import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";

const Modal = ({ closeModal, handlePay }) => {

    const { rating, handleRating } = useContext(ServiceContext);

    return (
        <div className="">
            <div className="">
                <div className="title text-white">
                    <h1>Please rate the service</h1>
                </div>
                <div className="body">
                    <input
                        type="text"
                        className="my-2 w-full rounded-sm p-2 outline-none border-none text-sm"
                        onChange={handleRating}
                    ></input>
                </div>
                <div className="footer text-white">
                    <button
                        className="bg-[#d6112b] text-white w-full mt-2 p-2 hover:bg-[#ba0d24] rounded-full cursor-pointer"
                        onClick={() => closeModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#2952e3] text-white w-full mt-2 p-2 hover:bg-[#2546bd] rounded-full cursor-pointer"
                        onClick={()=>handlePay(rating)}
                    >
                        Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
