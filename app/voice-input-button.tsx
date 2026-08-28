'use client';
import { useEffect,useState } from 'react';
import { Mic,Square } from 'lucide-react';
import { useSpeechRecognition } from './hooks/use-speech-recognition';

export default function VoiceInputButton({onTranscript,disabled=false,label='voice input'}:{onTranscript:(text:string,confidence:number)=>void;disabled?:boolean;label?:string}){
 const [mounted,setMounted]=useState(false);
 const speech=useSpeechRecognition({onFinal:onTranscript});
 useEffect(()=>{
  // Mount state intentionally gates browser capability UI until after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
 },[]);
 const supported=mounted&&speech.isSupported;
 const listening=supported&&speech.isListening;
 return <span className="voice-control">
  <button type="button" className={'voice-btn '+(listening?'listening':!supported?'unsupported':'')} disabled={disabled||!supported} onClick={listening?speech.stopListening:speech.startListening} aria-label={listening?'Stop voice input':supported?'Start voice input':'Voice input unavailable'} title={!mounted?'Voice input is loading':supported?(listening?'Stop listening':`Start ${label}`):"Voice input isn't supported in this browser"}>{listening?<Square/>:<Mic/>}</button>
  {listening&&<small className="voice-status"><i/>Listening… {speech.interimTranscript}</small>}
  {supported&&speech.state==='PROCESSING'&&<small className="voice-status processing">Understanding…</small>}
  {mounted&&speech.error&&<small className="voice-error">{speech.error}</small>}
 </span>
}
