import { GlobalSettings } from "./interfaces";

export function validateSettings(settings: any): GlobalSettings {
        return {
        fps: typeof settings.fps === "number" ? settings.fps : 240,
        volume: typeof settings.volume === "number" ? settings.volume : 0.3,
        fftSize: typeof settings.fftSize === "number" ? settings.fftSize : 10,
        frequency: typeof settings.frequency === "number" ? settings.frequency : 200,
        color: typeof settings.color === "string" ? settings.color : '#877EFF',
      }
}