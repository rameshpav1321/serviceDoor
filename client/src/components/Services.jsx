import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import Modal from "./Review";

const TransactionCard = ({
    name,
    age,
    serviceName,
    serviceFee,
    address,
}) => {
    const { sendTransaction, rating } = useContext(ServiceContext);

    const gifUrl = useFetch({ serviceName });

    const handleSubmit = (rating) => {
        // console.log(name,typeof address, typeof serviceFee);
        // e.preventDefault();
        if(rating){

            console.log("Rating is: ", rating);
            sendTransaction(address, String(serviceFee), rating, serviceName);
        }else{
            alert("Please rate the provider to proceed")
        }
    };

    const [openModal, setOpenModal] = useState(false);

    
    return (
        <div className="bg-[#181918] m-4 flex flex-1 
            2xl:min-w-[450px] 2xl:max-w[500px] 
            sm:min-w-[270px] sm:max-w[300px] 
            min-w-full flex-col p-3 rounded-md 
            hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                <img src={gifUrl}
                        alt="gif"
                        className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                    />
                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        {/* <p className="text-[#37c7da] font-bold">{timestamp}</p> */}
                    </div>
                    <p className="text-white text-base">Name: {name}</p>
                    <p className="text-white text-base">Age: {age}</p>
                    <p className="text-white text-base">Service Offered: {serviceName}</p>
                    <p className="text-white text-base">Service Fee: {serviceFee} ETH</p>
                    {/* {rating && <p className="text-white text-base">Rating: {rating}</p>} */}
                    {/* <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="nonreferre">
                        <p className="text-white text-base">Address:{shortenAddress(addressFrom)}</p>
                    </a> */}
                    {/* {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>

                        
                    )} */}

                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {false ? (
                            <Loader />
                        ) : (
                            
                            !openModal && <button
                                type="button"
                                onClick={()=>setOpenModal(true)}
                                className="bg-[#2952e3] text-white w-full mt-2 p-2 hover:bg-[#2546bd] rounded-full cursor-pointer"
                            >
                                Book
                            </button>
                        )}
                        {  openModal && <Modal closeModal={setOpenModal} handlePay={handleSubmit} /> }
                    
                </div>
               
            </div>

        </div>
    );
};
const Transactions = () => {
    const { currentAccount, services } = useContext(ServiceContext);

    // const registeredServices = getAllServices();
    console.log('fetched: ', services);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-services">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Services
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see all services
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {services.map((transaction, index) => (
                        <TransactionCard key={index} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
