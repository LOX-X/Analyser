import Analyser from "../classes/analyser";
export interface AnalyserSettings extends Analyser{}

export interface GlobalSettings {
    fps?: number;
    volume?: number;
    fftSize?:number;
    frequency?:number;
    color?: string;
}
