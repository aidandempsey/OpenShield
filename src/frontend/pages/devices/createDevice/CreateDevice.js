import React, { useState, useEffect } from 'react';
import "./CreateDevice.css"
import Icon from "../../../images/raspberry-pi.png"
export default function CreateDevice() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [pairingError, setPairingError] = useState(null);
    const [pairingCode, setPairingCode] = useState("");
    const apiUrl = 'https://1d78-46-7-196-15.ngrok-free.app/api/data';

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl, { method: 'GET', headers: { 'Pairing-Code': pairingCode, 'ngrok-skip-browser-warning': 'any' } })
            const responseJson = await response.json();
            const responseData = responseJson;

            if (responseData.error) {
                setPairingError(responseData.error);
                setData(null)
            } else {
                const loadedData = {
                    deviceName: responseData.deviceName,
                    os: responseData.os,
                    cpuCores: responseData.cpuCores,
                    cpuThreads: responseData.cpuThreads,
                    memoryTotal: responseData.memoryTotal,
                    memoryUsed: responseData.memoryUsed,
                    memoryPercent: responseData.memoryPercent,
                    diskTotal: responseData.diskTotal,
                    diskUsed: responseData.diskUsed,
                    diskPercent: responseData.diskPercent,
                };
                setData(loadedData);
            }
        } catch (error) {
            setHttpError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePairButtonClick = e => {
        e.preventDefault();
        setIsLoading(true);
        setHttpError(null)
        setPairingError(null)
        fetchData();
    };

    const handleSaveDevice = () => {
        console.log("saved")
    }

    return (
        <>
            <div className='form-container'>
                <form className="form">
                    <h2>Pair Device</h2>
                    <input
                        type="text"
                        placeholder='Pairing Code'
                        value={pairingCode}
                        onChange={(e) => setPairingCode(e.target.value)}
                    />
                    <button className='btn' onClick={e => { handlePairButtonClick(e) }}>Pair</button>
                </form>
            </div>

            {(data && !httpError) && (
                <div>
                    <img className="device-icon" src={Icon} />
                    <h1>Device Information</h1>
                    <p>Device Name: {data.deviceName}</p>
                    <p>Operating System: {data.os}</p>
                    <p>CPU Cores: {data.cpuCores}</p>
                    <p>CPU Threads: {data.cpuThreads}</p>
                    <p>Memory Percent: {data.memoryPercent}%</p>
                    <p>Disk Percent: {data.diskPercent}%</p>
                    <button className='btn' onClick={handleSaveDevice}>Save</button>
                </div>
            )}

            {isLoading && <p>Loading data...</p>}
            {httpError && <div className='error'>Error: {httpError}</div>}
            {pairingError && <p className='error'>Error: {pairingError}</p>}
        </>
    );
}
