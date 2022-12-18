import React, { useState, useEffect, useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TokenContext } from "../context/TokenContext";
import Button from "../components/Button";
import MetamaskBtn from "../components/MetamaskBtn";
import TransferBtn from "../components/TransferBtn";
import { shortenAddress } from "../utils/shortenAddress";

export default function Home() {
  const {
    tokenTransfer,
    connectWallet,
    setAddress,
    setAmount,
    getOwner,
    getTokenInfo,
    getTotalSupply,
    setMintAmount,
    mintToOwner,
    checkEvent,
    owner,
    totalSupply,
    info,
  } = useContext(TokenContext);

  let arrayInfo = [];

  return (
    <div className="flex flex-col items-center justify-center bg-[#111827] text-white h-screen w-full relative">
      <MetamaskBtn handleClick={connectWallet} />

      <div className="absolute left-5 top-auto bottom-auto">
        <div className="p-3 items-center self-center flex-col rounded-xl h-40 max-w-xs sm:w-72 w-full my-5 eth-card border-none flex-1">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full border-2 border-[#1B1A21] flex justify-center items-center">
                <SiEthereum fontSize={21} color="#1B1A21" />
              </div>
              <div className="pl-3 pr-3 pt-1 pb-1 text-sm rounded-md bg-[#4e5d7e62] text-[#1F2937]">
                {totalSupply ? (
                  <span className="font-extrabold font-sm">{totalSupply}</span>
                ) : (
                  <span className="font-extrabold font-sm">...</span>
                )}{" "}
                Tokens
              </div>
              <BsInfoCircle fontSize={17} color="#1B1A21" />
            </div>

            <div className="w-full">
              <p className="text-[#1B1A21] font-semibold text-sm">
                {shortenAddress(owner)}
              </p>
              {info.map((item) => {
                arrayInfo.push(item);
              })}
              <div className="flex flex-row gap-3">
                <p className="text-[#1B1A21] text-sm font-bold">
                  Name:{" "}
                  <span className="text-gradient font-normal">
                    {arrayInfo[0] ? (
                      arrayInfo[0]
                    ) : (
                      <span className="font-bold">...</span>
                    )}
                  </span>
                </p>

                <p className="text-[#1B1A21] text-sm font-bold">
                  Symbol:{" "}
                  <span className="text-gradient font-normal">
                    {arrayInfo[1] ? (
                      arrayInfo[1]
                    ) : (
                      <span className="font-bold">...</span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mt-5 mb-5">
        <label className="flex mb-4 font-bold text-lg items-center justify-center">
          Transfer Area
        </label>

        <input
          type="text"
          className="bg-[#111827] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
          block p-2.5 mb-4 min-w-[300px]
          "
          placeholder="Recipient address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          className="bg-[#111827] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          p-2.5 mb-4 min-w-[300px]
          "
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <TransferBtn handleClick={tokenTransfer} title="Transfer" />
      </div>

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Button title="Owner" handleClick={getOwner} />

        <Button title="Get Info" handleClick={getTokenInfo} />

        <Button title="Total Supply" handleClick={getTotalSupply} />
      </div>

      <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(112,_87,_123,_0.7)] mb-5">
        <input
          type="number"
          className="bg-[#111827] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          p-2.5 mb-4 min-w-[300px]"
          placeholder="Amount"
          onChange={(e) => setMintAmount(e.target.value)}
        />

        <TransferBtn
          title="Mint"
          handleClick={() => {
            mintToOwner();
            checkEvent();
          }}
        />
      </div>
    </div>
  );
}
