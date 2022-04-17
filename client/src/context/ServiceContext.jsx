import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

//create react context
export const ServiceContext = React.createContext();

//we get access to the ethereum object by metamask
const { ethereum } = window;

//fetch the ethereum contract
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    //get the contract
    const serviceContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    console.log({
        provider,
        signer,
        serviceContract,
    });

    return serviceContract;
};

export const ServiceProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        serviceName: '',
        seriveFee: '',
        deposit:'',
    });

    const [rating, setRating] = useState(0);


    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const [transactions, setTransactions] = useState([]);

    const [ services, setServices ] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => (
            {   ...prevState, 
                [name]: e.target.value }
            ));
        console.log("Set form data: ",formData);
    };

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const registerService = async(name, deposit, serviceName, age, serviceFee) => {
        console.log("called register")
        try {
            if(!ethereum) 
                return alert("Please install metamask");
            const serviceContract = getEthereumContract();
            
            //make sure wallet is connected (future)

            //call register service form contract
            const status = await serviceContract.registerService(
                name, deposit, serviceName, age, serviceFee);

            status.wait();

            if(status){
                console.log("Registration success");
            }


        } catch (error) {
            console.log(error);
            alert("Registration failed");
            throw new Error("SMART CONTRACT, registration failed");
        }
    }
    const getAllServices = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const serviceContract = getEthereumContract();
            
            console.log("calling get all services", serviceContract);
            const availableServices = await serviceContract.getAllServices();

            console.log(availableServices)
            const structuredServices = availableServices.map((service) => ({
                name: service.name,
                deposit: service.deposit,
                serviceName: service.service,
                age: service.age,
                serviceFee: service.serviceFee,
                address: service.serviceFrom,
            }))

            setServices(structuredServices);
            console.log(structuredServices);
            
        } catch (error) {
            console.log("Failed to get the services", error);
        }
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            console.log("Transactions: ",availableTransactions);
            const structuredTransactions = availableTransactions.map((transaction, index) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18) //to get in wei
            }));

            setTransactions(structuredTransactions);
            console.log(structuredTransactions);

        } catch (error) {
             console.log("Failed to get all transactions",error);
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            console.log("calling transactions count", transactionContract);
            const transactionCount = await transactionContract.getTransactionCount();
            console.log("transactions count");
            window.localStorage.setItem("transactionCount", transactionCount);

        } catch (error) {
            console.log(error);
            // throw new Error("No ethereum object.");
        }
    }

    //check if metamask is installed and get the connected accounts
    const checkIfWalletIsConnected = async () => {
        try {
            //can use ethereum.isMetaMask
            if (!ethereum) return alert("Please install metamask");

            //request to get the accounts if meta mask connected
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metmask");

            //an array of single, hexadecimal Ethereum address string
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    };

    const sendTransaction = async (addressTo, amount, message, keyword, ) => {
        try {
            if (!ethereum) return alert("Please install metamask");

            //get the data from the form
            const transactionContract = getEthereumContract();

            //converting in ethers i.e. wei hexadecimal 
            // console.log("parsing now")
            const parsedAmount = ethers.utils.parseEther(amount);

            // console.log("ethereum call")
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex
                    },
                ],
            });

            console.log("sending to contract")
            //add to blockchain, store the transaction
            const transactionHash = await transactionContract.pay(parsedAmount, addressTo, message, keyword);
            setIsLoading(true);

            //wait for the transaction
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            //close the loader
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    };

    //run once
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
        getAllServices();
        getAllTransactions();
    }, []);

    return (
        <ServiceContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                setFormData,
                handleChange,
                sendTransaction,
                services,
                registerService,
                transactions,
                handleRating,
                rating
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};
