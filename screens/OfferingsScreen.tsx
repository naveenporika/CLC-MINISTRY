import React, { useState } from 'react';
import Header from '../components/Header';
import { CopyIcon, GPayIcon, PhonePeIcon, PaytmIcon } from '../components/icons';

const UPI_ID = 'teluguchurch@upi';

const OfferingsScreen: React.FC = () => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy'), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy UPI ID.');
        });
    };

    return (
        <div className="h-full flex flex-col bg-slate-100">
            <Header title="కానుకలు" />
            <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6 text-center">
                <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 max-w-sm w-full">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 font-telugu">దేవుని సేవకు సహకరించండి</h2>
                    <p className="text-slate-600 mb-4 font-telugu">
                        Scan the QR code or use the UPI ID to give.
                    </p>

                    <div className="p-2 bg-white border-2 border-slate-300 rounded-lg inline-block">
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=teluguchurch@upi" 
                            alt="QR Code for Offerings" 
                            width="200" 
                            height="200"
                        />
                    </div>
                    
                    <div className="mt-4">
                        <p className="text-sm text-slate-500 font-sans">UPI ID:</p>
                        <div className="mt-1 flex items-center justify-center bg-slate-100 p-2 rounded-lg">
                            <span className="font-mono text-slate-700 font-semibold tracking-wide">{UPI_ID}</span>
                            <button 
                                onClick={handleCopy}
                                className={`ml-3 flex items-center text-sm font-semibold py-1 px-2 rounded-md transition-colors ${
                                    copyButtonText === 'Copied!' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                                }`}
                            >
                                <CopyIcon className="w-4 h-4 mr-1"/>
                                {copyButtonText}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md border border-slate-200">
                    <p className="text-sm text-slate-500 font-telugu mb-3">లేదా మీకు ఇష్టమైన యాప్‌ని ఉపయోగించండి</p>
                    <div className="grid grid-cols-3 gap-3">
                         <a href="#" className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <GPayIcon className="h-8 w-8" />
                            <span className="text-xs mt-1 font-semibold text-slate-600">GPay</span>
                         </a>
                         <a href="#" className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <PhonePeIcon className="h-8 w-8" />
                            <span className="text-xs mt-1 font-semibold text-slate-600">PhonePe</span>
                         </a>
                         <a href="#" className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <PaytmIcon className="h-8 w-8" />
                            <span className="text-xs mt-1 font-semibold text-slate-600">Paytm</span>
                         </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferingsScreen;