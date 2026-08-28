'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
export function useSpeechRecognition({ language = 'en-IN', onFinal } = {}) { const recognition = useRef(null), constructorRef = useRef(null), finalRef = useRef(''); const [isSupported, setIsSupported] = useState(false), [state, setState] = useState('IDLE'), [interimTranscript, setInterim] = useState(''), [error, setError] = useState(''); useEffect(() => { constructorRef.current = window.SpeechRecognition || window.webkitSpeechRecognition || null; setIsSupported(Boolean(constructorRef.current)); return () => { recognition.current?.abort(); recognition.current = null; }; }, []); const stopListening = useCallback(() => { recognition.current?.stop(); setState('PROCESSING'); }, []); const startListening = useCallback(() => { const Ctor = constructorRef.current; if (!Ctor) {
    setError("Voice input isn't supported in this browser.");
    setState('ERROR');
    return;
} window.__travelMindRecognition?.abort(); const instance = new Ctor(); window.__travelMindRecognition = instance; recognition.current = instance; finalRef.current = ''; setInterim(''); setError(''); instance.continuous = false; instance.interimResults = true; instance.lang = language; instance.onresult = e => { let interim = '', confidence = 0; for (let i = e.resultIndex; i < e.results.length; i++) {
    const result = e.results[i], text = result[0].transcript;
    confidence = Math.max(confidence, result[0].confidence || 0);
    if (result.isFinal)
        finalRef.current += (finalRef.current ? ' ' : '') + text.trim();
    else
        interim += text;
} setInterim(interim); if (finalRef.current) {
    setState('SUCCESS');
    onFinal?.(finalRef.current, confidence);
} }; instance.onerror = e => { const messages = { 'not-allowed': 'Microphone access is blocked. Allow permission or type your request.', 'audio-capture': 'No microphone was found.', 'no-speech': "I couldn't hear anything clearly. Try again.", network: 'Voice recognition network error. Please try again.' }; setError(messages[e.error] || 'Voice input failed. Please try again.'); setState('ERROR'); }; instance.onend = () => { setState(current => current === 'LISTENING' ? (finalRef.current ? 'SUCCESS' : 'IDLE') : current); if (window.__travelMindRecognition === instance)
    delete window.__travelMindRecognition; if (recognition.current === instance)
    recognition.current = null; }; setState('LISTENING'); instance.start(); }, [language, onFinal]); return { isSupported, state, isListening: state === 'LISTENING', interimTranscript, error, startListening, stopListening, reset: () => { setState('IDLE'); setInterim(''); setError(''); } }; }
