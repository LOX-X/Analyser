import { useEffect, useRef, useState } from 'react';
import style from './morseCode.module.css';
import Analyser from '../../../classes/analyser';
import { textToMorse } from '../../../utils/MorseCodeTranslator';
import { AnalyserSettings } from '../../../utils/interfaces';

function MorseCode() {
  const [inputText, setInputText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const analyser = useRef<AnalyserSettings>();

  useEffect(() => {
    if (canvas.current) {
      ctx.current = canvas.current.getContext('2d');
    }
  }, []);

  useEffect(()=>{
    return () => {
      if (analyser.current) {
        analyser.current.stopBeep();
      }
    }
   },[]);

  const handleInputChange = (e: any) => {
    const text = e.target.value;
    setInputText(text);
    const morse = textToMorse(text);
    setMorseCode(morse);
  };

  const handleStart = () => {
    setIsAnimating(true);
    analyser.current = new Analyser();
    analyser.current.playMorseCode(morseCode, () => setIsAnimating(false));
  };

  const handleStop = () => {
    if (analyser.current) {
      analyser.current.stopBeep();
    }
    setIsAnimating(false);
  };

  const handleClear = () => {
    setInputText('');
    setMorseCode('');
    ctx.current?.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
  };

  useEffect(() => {
    let animationId: any;
    const animate = () => {
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

        ctx.current.strokeStyle = '#877EFF';
        ctx.current.stroke();

        analyser.current.getGainNode().gain.value = 0.4;
        analyser.current.getAnalyserNode().fftSize = 2 ** 15;

      }

      animationId = requestAnimationFrame(animate);
    };
  
    if (isAnimating) {
      animate();
    } else {
      cancelAnimationFrame(animationId); 
    }
  
    return () => {
      cancelAnimationFrame(animationId); 
    };
  }, [isAnimating]);


  return (
    <div className={`${style.con}`}>
      <canvas className={`${style.canvas}`} ref={canvas} style={isAnimating ? { border: 'solid 1px green' } : {}}></canvas>
      <div className={`${style.section}`}>
        <div className={`${style.inputs}`}>
          <div>
            <h3>Input:</h3>
            <textarea name="input" value={inputText} onChange={handleInputChange}></textarea>
          </div>
          <div>
            <h3>Output (Morse Code):</h3>
            <textarea name="output" value={morseCode} readOnly></textarea>
          </div>
        </div>
      </div>
      <div className={`${style.settings}`}>
        <button onClick={handleClear} disabled={isAnimating || inputText.length === 0}>
          clear
        </button>
        <button disabled={inputText.length === 0} style={isAnimating ? { backgroundColor: 'var(--danger)' } : {}} onClick={!isAnimating ? handleStart : handleStop}>
          {!isAnimating ? 'start' : 'stop'}
        </button>
      </div>
    </div>
  );
}

export default MorseCode;
