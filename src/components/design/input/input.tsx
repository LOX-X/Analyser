import { useState, useRef } from "react";
import style from './input.module.css';


interface Props {
    inputType?:string;
    label: string;
    value: number | undefined | string;
    onChange: (value: any) => void;
    min?: number;
    max?: number;
    step?: number;
}

const Input = ({ label, inputType, value, onChange, min, max, step = 1 }:Props) => {
  const [isChanging, setIsChanging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    setIsChanging(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  const handleInputBlur = () => {
    setIsChanging(false);
  };

  return (
    <section className={`${style.section}`}>
      <div>
        <label className={`${style.name}`}>{label}</label>
        <div></div>
        {inputType?
         <input
          type={inputType? inputType : 'range'}
          value={value}
          onChange={(e) => onChange((e.target.value))}
        /> : 
        <input
          type={inputType? inputType : 'range'}
          step={step}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        }
      </div>
      {!isChanging ? (
        
        <label
          className={`${style.value}`}
          onClick={handleLabelClick}
        >
          {value}
        </label>
      ) :
        inputType?
        <input
        className={`${style.input}`}
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => onChange((e.target.value))}
          onBlur={handleInputBlur}
        />
         : 
        <input
        className={`${style.input}`}
          ref={inputRef}
          type={'number'}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={handleInputBlur}
        />
        
      }
    </section>
  );
};

export default Input;
