<div align="center">
  <br />
    <img src="https://raw.githubusercontent.com/LOX-X/Analyser/main/public/bg/an-bg.PNG" alt="Project Banner">
  <br />

  <div>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext" target="_blank"><img src="https://img.shields.io/badge/-Audio_Context-black?style=for-the-badge&logoColor=white&logo=apple%20music&color=06B6D4" alt="AudioContext"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode" target="_blank"><img src="https://img.shields.io/badge/-Analyser_Node-black?style=for-the-badge&color=6C47FF" alt="AnalyserNode"/></a>
  </div>

  <h3 align="center">Audio Analyser and Morse Code Visualizer</h3>

</div>


## <a name="introduction">Introduction</a>

This project features two main components: an Audio Analyser and a Morse Code Visualizer. The Audio Analyser visualizes audio data in real-time, allowing users to manipulate settings such as FPS, volume, frequency, FFT size, and color. The Morse Code Visualizer converts text into Morse code and animates it on a canvas. Both components utilize the Analyser class for audio processing and visualization. Note that the code is still a work in progress and some issues may be fixed in future updates

## <a name="quick-start">Quick Start</a>

**Installation**
Befor u start:
- Remove this from node_modules/prismjs/themes/prism-tomorrow.css
- It's fine if u not remove it, but u will not get the same css i used in the project

```css
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #2d2d2d;
  }
```

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

<img src="https://github.com/LOX-X/Analyser/blob/main/public/bg/mc-bg.PNG" alt="MorseCode Translator">

