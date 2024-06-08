// app/add/page.js
'use client';

import { useState, useEffect } from 'react'

export default function Add() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const [lgas, setLgas] = useState('');
  const [fgas, setFgas] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/addData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value }),
    });

    // if (res.ok) {
    //   alert('Data added successfully');
    //   setName('');
    //   setValue('');
    // } else {
    //   alert('Failed to add data');
    // }
  };

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


  useEffect(() => {
    fetch('/api/addDataAuto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lgas, fgas }),
    });
    
}, [data])

  return (
    <div>
      <h1>Add Data to MongoDB</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
