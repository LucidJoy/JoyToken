import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { TokenAddress, TokenAddressABI } from "./constants";
import { info } from "autoprefixer";

// const fetchContract = (signerOrProvider) =>
//   new ethers.Contract(TokenAddress, TokenAddressABI, signerOrProvider);

export const TokenContext = React.createContext();

export const TokenProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [owner, setOwner] = useState("");
  const [mintAmount, setMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [info, setInfo] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found.");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    // Fetch all the eth accounts------------------------------------here----------------
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    // Reloading window
    // window.location.reload();
  };

  const tokenTransfer = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      const txRes = await contract.transfer(address, amount, {
        gasLimit: 5000000,
      });
      await txRes.wait();
      console.log(txRes);
    }
  };

  const getOwner = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      const txRes = await contract.getOwner();
      setOwner(txRes);
      console.log(owner);
    }
  };

  const getTokenInfo = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      const txRes = await contract.getInfo();
      setInfo(txRes);
    }
  };

  const getTotalSupply = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      const txRes = await contract.getTotalSupply();
      const amount = ethers.utils.formatEther(txRes);
      console.log(amount);
      setTotalSupply(amount);
    }
  };

  const mintToOwner = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      const txRes = await contract.mint(mintAmount);
      await txRes.wait();
      console.log(txRes);
    }
  };

  const checkEvent = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
      TokenAddress,
      TokenAddressABI,
      provider
    );

    contract.on("Transfer", (from, to, amount) => {
      console.log("Transfer event was emmitted");
      console.log(JSON.stringify(from));
      console.log(JSON.stringify(to));
      console.log(JSON.stringify(amount.toString()));
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TokenContext.Provider
      value={{
        currentAccount,
        connectWallet,
        setAddress,
        setAmount,
        tokenTransfer,
        getTokenInfo,
        getOwner,
        owner,
        getTotalSupply,
        setMintAmount,
        mintToOwner,
        checkEvent,
        totalSupply,
        info,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
