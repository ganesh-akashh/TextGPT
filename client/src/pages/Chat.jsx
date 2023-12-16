import React, { useState, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import axios from 'axios';
import Blank from '../components/Blank';
import user from "../assets/userImg.avif";
import robot from "../assets/robot.avif";
import LoadingSpinner from '../components/Loaders/LoadingSpinner';
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";  // Import both microphone icons
import { useInView } from 'react-intersection-observer';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);  // New state to track if it's listening

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animationClass = inView && 'animate-fade-up animate-delay-100  animate-duration-1000 animate-ease-out';

    useEffect(() => {
        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript;
            setCurrentMessage(transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }, []);

    const handleVoiceStart = () => {
        if (!isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!currentMessage.trim()) {
            return;
        }

        setIsLoading(true);

        try {
            const userMessage = {
                role: 'user',
                content: currentMessage,
            };

            const newMessages = [...messages, userMessage];
            const response = await axios.post('http://localhost:8080/api/v1/image', { messages: newMessages });

            setMessages((current) => [...current, userMessage, response.data]);
            setCurrentMessage('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div ref={ref} className={`flex flex-col mx-auto gap-3 container justify-center items-center h-screen ${animationClass}`}>

            <h1 className="sm:text-4xl font-bold  text-purple-500  mt-24 text-3xl p-2">Welcome to TextGPT 🚀</h1>
            <p className='font-semibold text-purple-400 text-lg'>Chat your way to the perfect job!</p>
            <div className=" mx-auto w-full p-2">
                <form onSubmit={handleSubmit}>
                    <div className="w-full relative">
                        <input
                            className="w-full font-bold text-gray-500 rounded-3xl border-2 p-2.5 sm:p-3 border-purple-500 focus:outline-none focus:border-purple-700 transition-all duration-300"
                            placeholder="Got questions? Let's talk! 💬"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <div className="absolute right-16  top-6 transform -translate-y-1/2">
                            {isListening ? (
                                <CiMicrophoneOff className='text-2xl text-red-500 cursor-pointer' onClick={handleVoiceStart} />
                            ) : (
                                <CiMicrophoneOn className='text-2xl text-purple-500 cursor-pointer' onClick={handleVoiceStart} />
                            )}
                        </div>
                        <div className="absolute right-5 top-7 transform -translate-y-1/2">
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <button type="submit" disabled={isLoading}>
                                    <RiSendPlaneFill className={`text-purple-500 text-2xl cursor-pointer ${isLoading && "opacity-50"}`} />
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            {messages.length === 0 && !isLoading && (
                <div>
                    <Blank label="No conversation started yet." />
                </div>
            )}
            <div className="flex-grow w-full overflow-auto" >
                <div className="flex flex-col-reverse w-full mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-5 w-full flex justify-center items-center gap-x-8 rounded-lg ${message.role === 'user' ? ' bg-white' : 'bg-gray-100/70'}`}
                        >
                            {message.role === "user" ? (
                                <img src={user} className='h-12 w-12 rounded-full' alt="User" />
                            ) : (
                                <img src={robot} className='h-12 w-12 rounded-full' alt="Robot" />
                            )}
                            <div className="flex flex-col w-full">
                                {message.role === 'assistant' && (

                                    <p className="text-md font-semibold text-gray-500 mb-0">
                                        {message.content}
                                    </p>

                                )}
                                {message.role !== 'assistant' &&
                                    message?.content?.split('\n').map((line, index) => (
                                        <p key={index} className="text-md font-semibold text-gray-500 mb-0">
                                            {line}
                                            {index < message.content.split('\n').length - 1 && <br />}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chat;
