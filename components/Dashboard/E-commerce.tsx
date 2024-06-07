"use client";
import React from "react";
import { useState, useEffect } from 'react'

import { AreaChart, SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import DataCard from "../Cards/DataCard";


 function ECommerce() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.etherscan.io/api' +
            '?module=gastracker' +
            '&action=gasoracle' +
            '&apikey=ZZIEIMYMJSYSQADP3VGXPA3JGY7QE5PT2F ')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
                console.log(data.result)
            })
        console.log(data)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  return (
    <>
        {/*<h1 className={'text-white'}>{data.result.SafeGasPrice}</h1>*/}
        {/*<p className={'text-white'}>{data.result.ProposeGasPrice}</p>*/}
        {/*<p className={'text-white'}>{data.result.FastGasPrice}</p>*/}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <DataCard name="Safe Gas fee" amount={data.result.SafeGasPrice} />
        <DataCard name="Propos gas fee" amount={data.result.ProposeGasPrice} />
        <DataCard name="Fast gas fee" amount={data.result.FastGasPrice} />
      </div>
      <div className="space-y-5 py-5">
        <AreaChart />
        <SimpleBar />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
