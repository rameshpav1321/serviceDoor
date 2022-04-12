import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

//create react context
export const TransactionContext = React.createContext();

//we get access to the ethereum object by metamask
const { ethereum } = window;

//fetch ethereum contract
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    //get the contract
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    console.log({
        provider,
        signer,
        transactionContract,
    });

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    //check if metamask is installed and get the connected accounts
    const checkIfWalletIsConnected = async () => {
        try {
            //can use ethereum.isMetaMask
            if (!ethereum) return alert("Please install metamask");

            //request to get the accounts if meta mask connected
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // getAllTransactions();
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
            if (!ethereum) return alert("Please install metamsk");

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

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamsk");

            //get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();

            //converting in ethers i.e. wei hexadecimal 
            const parsedAmount = ethers.utils.parseEther(amount);

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

            //add to blockchain, store the transaction
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
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
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                setFormData,
                handleChange,
                sendTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
