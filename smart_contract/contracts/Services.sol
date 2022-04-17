//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Services{
    //chairperson 
    address chairPerson;
    uint120 minDeposit;
    uint8 minAge;
    uint256 transactionCount=0;

    struct ProviderStruct{
        string name;
        uint16 deposit;
        string service;
        uint8 age;
        uint8 serviceFee;
        bool status;
        address serviceFrom;
        // uint8 rating;
        // uint8 ratingCount;
    }

     struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
      
    }

    //array of struct
    TransferStruct[] transactions;

    mapping (address=>ProviderStruct) services;
    ProviderStruct[] providers;

    event Transfer(address from, address to, uint amount, string message, uint256 timestamp, string keyword);

    constructor (uint120 amount, uint8 age){ 
        chairPerson = msg.sender;
        minDeposit = amount;
        minAge = age;
    }

    modifier validRegistration(uint deposit, uint age){
        require(deposit == minDeposit);
        require(age >= minAge);
        _;
    }

    modifier onlyOnce(address provider){
        require(services[provider].status != true);
        _;
    }


    //to register a particular service
    function registerService(string memory name, uint16 amount, string memory service, uint8 age, uint8 fee) 
    validRegistration(amount, age)
    onlyOnce(msg.sender)
     public returns(bool){
        //set the values
        address provider = msg.sender;
        services[provider].name = name;
        services[provider].deposit = amount;
        services[provider].service = service;
        services[provider].age = age;
        services[provider].serviceFee = fee;
        services[provider].status = true;
        services[provider].serviceFrom = provider;

        //push in an array
        providers.push(ProviderStruct(name,amount,service, age, fee, true, provider));
        return true;
    }


    function pay(uint amount, address payable receiver, string memory message, string memory keyword) public{
        //send ether to other account
        transactionCount++; 
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        //call updateRatings
        // updateRatings(receiver, rating);
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // function updateRatings (address receiver, uint8 rating) internal{
    //     //calculate the average rating before updating
    //     uint8 avgRating = (services[receiver].rating + rating) / services[receiver].ratingCount;
    //     services[receiver].rating = avgRating;
    // }

    // get all the transactions to render on fron-end
    function getAllTransactions() public view returns(TransferStruct[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }
    
    // get all the service provider to render on front-end
    function getAllServices() public view returns(ProviderStruct[] memory){
        return providers;
    }
}