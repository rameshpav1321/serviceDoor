import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiE, SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { shortenAddress } from "../utils/shortenAddress";
import { ServiceContext } from "../context/ServiceContext";

const commonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const {
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        services,
        registerService,
    } = useContext(ServiceContext);

    const { name, age, serviceName, serviceFee, deposit } = formData;

    const handleSubmit = (e) => {
        // const { name, age, serviceName, serviceFee, deposit } = formData;

        e.preventDefault();

        if (!name || !age || !serviceName || !serviceFee || !deposit) return;

        registerService(name, deposit, serviceName, age, serviceFee);
    };

    return (
        <div className="flex w-full justify-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Your Service
                        <br />
                        your Money
                    </h1>
                    <p className="text-left mt-5 mb-5 text-white font-light md:w-11/12">
                        Explore the service world. Earn through service or use
                        the service
                    </p>

                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}
                    <div className="grid sm:grid-cols-3 grid-cols-2">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Trust
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            WEB 3.0
                        </div>
                        <div className={commonStyles}>Decentralized</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Transparency
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 md:w-80 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                    
                                </div>
                                <div className="w-10 h-10 border-white flex justify-center items-center">
                                    <BsInfoCircle fontSize={21} color="#fff" />
                                </div>
                            </div>
                            
                            <div>
                                
                                <p className="text-white font-semibold text-sm mt-1">
                                    {name}
                                </p>
                                <p className="text-white font-light text-sm mt-1">
                                    {serviceName}
                                </p>
                                <p className="text-white font-light text-sm mt-1">
                                    {shortenAddress(currentAccount)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input
                            placeholder="Full Name"
                            name="name"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Age"
                            name="age"
                            type="number"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Service Name"
                            name="serviceName"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Service Fee"
                            name="serviceFee"
                            type="number"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Deposit Amount"
                            name="deposit"
                            type="number"
                            handleChange={handleChange}
                        />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {false ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Register
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* <div className="grid grid-cols-4 gap-2">
                {services.map((item, index) => (
                    <div
                        key={index}
                        className="mb-2 p-6  w-full items-center blue-glassmorphism"
                    >
                        <div className="justify-center items-center">
                            <p className="text-white">
                                Service Type: {item.serviceName}
                            </p>
                            <p className="text-white">
                                Service Fee: {item.serviceFee}
                            </p>
                            <p className="text-white">
                                Address: {item.address}
                            </p>
                            <p className="text-white">Age: {item.age}</p>

                            <button
                                type="button"
                                className="flex w-52 justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                            >
                                <p className="text-white text-base font-semibold">
                                    Book
                                </p>
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Welcome;
