
import { useEffect, useRef, useState } from "react";
import * as Storage from '../../../utils/Storage'
import { AnalyserSettings, GlobalSettings } from "../../../utils/interfaces";
import CodeBlock from "../../design/prism/CodeBlock";
import { getCodeSnippet } from "../../design/prism/codeSnippet/test";
import style from './analyser.module.css';
import Input from "../../design/input/input";
import Analyser from "../../../classes/analyser";
import { validateSettings } from "../../../utils/validate";
function AnalyserComponent() {
  const defaultSettings: GlobalSettings = { fps: 240, volume: 0.3, fftSize: 10, frequency: 200, color: '#877EFF' };
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser  = useRef<AnalyserSettings>()
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(() => {
    try {
      const savedSettings = Storage.getLocalStorage("Settings");
      return savedSettings ? validateSettings(JSON.parse(savedSettings)) : defaultSettings;
    } catch (error) {
      window.alert('Error parsing local storage settings\nDelete the local storage (Settings)')
      return defaultSettings ;
    }
  })
  const [isAnimating , setIsAnimating] = useState<boolean>(false)
  const codeSnippet = getCodeSnippet(globalSettings.fps,isAnimating,globalSettings.volume,globalSettings.frequency,globalSettings.fftSize);
  
  useEffect(()=>{
    if (canvas.current) {
      ctx.current = canvas.current.getContext('2d');
    }
  },[]);

   useEffect(() => {
    Storage.setLocalStorage('Settings', JSON.stringify(globalSettings));
  }, [globalSettings]); 

  useEffect(() => {
    let animationId: any;
    let interval = 1000 / globalSettings.fps!;
    let lastTime = 0;
    const animate = (timestamp:any) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;
      if (ctx.current && analyser.current && isAnimating) {
        const data = new Uint8Array(analyser.current.getAnalyserNode().fftSize);
        analyser.current.getAnalyserNode().getByteTimeDomainData(data);
        if(!canvas.current) return;
        
        ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.current.beginPath();
        for (let i = 0; i < data.length; i++) {
          
            const x = (canvas.current.width * i) / data.length;
            const y = (data[i] / 128) * canvas.current.height / 2;
            if (i == 0) {
                ctx.current.moveTo(x, y);
            } else {
                ctx.current.lineTo(x, y);
            }
        }

        ctx.current.strokeStyle = globalSettings.color!;
        ctx.current.stroke();

        analyser.current.getGainNode().gain.value = globalSettings.volume!;
        analyser.current.getAnalyserNode().fftSize = 2 ** globalSettings.fftSize!;
        analyser.current.getOscillatorNode().frequency.setValueAtTime(globalSettings.frequency!, 0);

      }
    }
      animationId = requestAnimationFrame(animate);
    };
  
    if (isAnimating) {
      animate(0);
    } else {
      cancelAnimationFrame(animationId); 
    }
  
    return () => {
      cancelAnimationFrame(animationId); 
      
    };
  }, [isAnimating, globalSettings.fps, globalSettings.volume , globalSettings.fftSize, globalSettings.frequency, globalSettings.color]);

 useEffect(()=>{
  return () => {
    if (analyser.current) {
      analyser.current.stop();
    }
  }
 },[]);
 
  const start = () => {
    setIsAnimating(true);
    const newAnalyser = new Analyser();
    newAnalyser.start();
    analyser.current = newAnalyser;
  };

  const stop = () => {
    audioContext.current = null;
    if (analyser.current) {
      analyser.current.stop();
    }
    setIsAnimating(false);
  }

  const clear = () => {
    ctx.current?.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
  }

  const changeFPS = (value: number) => {
    setGlobalSettings(prevSettings => ({
      ...prevSettings,
      fps: value,
    }));
  };

  const changeAnalyserVolume = (value: number) => {
    setGlobalSettings(prevSettings => ({
      ...prevSettings,
      volume: value,
    }));
    if (analyser.current) {
      analyser.current.setVolume(value);
    }
  };

  const changeFrequency = (value: number) => {
    setGlobalSettings(prevSettings => ({
      ...prevSettings,
      frequency: value,
    }));
    if (analyser.current) {
      analyser.current.setFrequency(value);
    }
  };

  const changeFFTSize = (value: number) => {
    setGlobalSettings(prevSettings => ({
      ...prevSettings,
      fftSize: value,
    }));
    if (analyser.current) {
      analyser.current.setFFTSize(value);
    }
  };

  const changeColor = (value: string) => {

    setGlobalSettings(prevSettings => ({
      ...prevSettings,
      color: value,
    }));
  };


  return (
    <>
      <div className={`${style.con}`}>
        <canvas className={`${style.canvas}`} ref={canvas} style={isAnimating ? { border: "solid 1px green" } : {}}></canvas>
        <div className={`${style.controls}`}>
          <Input
            label="FPS"
            value={globalSettings.fps}
            onChange={changeFPS}
            min={1}
            max={240}
          />
          <Input
            label="Volume"
            value={globalSettings.volume}
            onChange={changeAnalyserVolume}
            min={0.0001}
            max={2}
            step={0.001}
          />
          <Input
            label="Frequency"
            value={globalSettings.frequency}
            onChange={changeFrequency}
            min={0}
            max={20000}
            step={1}
          />
          <Input
            label="fftSize"
            value={globalSettings.fftSize}
            onChange={changeFFTSize}
            min={5}
            max={15}
            step={1}
          />
            <Input
            label="color"
            inputType="color"
            value={globalSettings.color}
            onChange={changeColor}
          />
          <div className={`${style.buttons}`}>
            <button style={isAnimating ? { backgroundColor: 'var(--danger)' } : {}} onClick={!isAnimating ? start : stop}>{!isAnimating ? 'start' : "stop"}</button>
            <button onClick={clear} disabled={isAnimating}>Clear Canvas</button>
          </div>
        </div>
      </div>
      <div>
        <CodeBlock>{codeSnippet}</CodeBlock>
      </div>
    </>
  );
}

export default AnalyserComponent;
