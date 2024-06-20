// codeSnippet.js
export const getCodeSnippet = (fps:any,isAnimating:boolean,volume:any,frequency:any,fftSize:any) => {
    return `
    //Analyser.tsx
    useEffect(() => {
    //...
    let interval = 1000 / ${fps};
    const animate = (timestamp:any) => {
        //...
        analyserSettings.gainNode.gain.value = ${volume};

        analyserSettings.analyserNode.fftSize = 2 ** ${fftSize}

        analyserSettings.oscillatorNode.frequency.setValueAtTime(${frequency},0)
    };
    //...
}, [isAnimating:${isAnimating}, FPS:${fps}, Volume:${volume} ,fftSize:${fftSize}]);
`;
};
