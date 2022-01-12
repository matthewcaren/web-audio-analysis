// import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@<version>/dist/essentia.js-core.es.js';
// // import essentia-wasm-module
// import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@<version>/dist/essentia-wasm.es.js';
//
// const essentia = new Essentia(EssentiaWASM);
//
// const offlineAudioCtx = new AudioContext();
//
// let audioURL = "https://freesound.org/data/previews/328/328857_230356-lq.mp3";
//
// const audioBuffer = essentia.getAudioBufferFromURL(audioURL, offlineAudioCtx);
//
// const vectorizedAudio = essentia.arrayToVector(audioBuffer.getChannelData(0));
//
//
//
// // audioData = essentia.MonoLoader(rawAudio)
//
// // generate overlapping frames of audio signal from given parameters
// const frames = essentia.FrameGenerator(vectorizedAudio,
//                                       1024, // frameSize
//                                       512); // hopSize
//
// // Iterate through every frame and do the desired audio processing
// // In this case, we just apply a hanning window to the signal
// for (var i=0; i<frames.size(); i++) {
//     // apply a window (hanning) to the signal using the default parameters
//     let windowedOut = essentia.Windowing(frames.get(i));
//     console.log(windowedOut.frame);
//
//     // we can add any essentia algorithms here to the compute frame-wise audio feature
// }
