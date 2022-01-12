// Sample EssentiaNodeFactory design pattern

function URLFromFiles(files) {
  const promises = files
    .map((file) => fetch(file)
      .then((response) => response.text()));

  return Promise
    .all(promises)
    .then((texts) => {
      const text = texts.join('');
      const blob = new Blob([text], {type: "application/javascript"});

      return URL.createObjectURL(blob);
    });
}

const workletProcessorCode = ["https://cdn.jsdelivr.net/npm/essentia.js@0.1.0/dist/essentia-wasm.module.js",
                              "https://cdn.jsdelivr.net/npm/essentia.js@0.1.0/dist/essentia.js-core.es.js",
                              "essentia-worklet-processor.js"];

export async function createEssentiaNode (context) {
  class EssentiaNode extends AudioWorkletNode {
    constructor(context) {
      super(context, 'essentia-worklet-processor', {
        outputChannelCount: [1]
      });
    }
  }
  try {
    let concatenatedCode = await URLFromFiles(workletProcessorCode)
    await context.audioWorklet.addModule(concatenatedCode);
  } catch(e) {
    console.log(e);
  }
  return new EssentiaNode(context);
}




const offlineAudioCtx = new AudioContext();

let audioURL = "https://freesound.org/data/previews/328/328857_230356-lq.mp3";
const audioBuffer = essentia.getAudioBufferFromURL(audioURL, offlineAudioCtx);
const vectorizedAudio = essentia.arrayToVector(audioBuffer.getChannelData(0));


// audioData = essentia.MonoLoader(rawAudio)

// generate overlapping frames of audio signal from given parameters
const frames = essentia.FrameGenerator(vectorizedAudio,
                                      1024, // frameSize
                                      512); // hopSize

// Iterate through every frame and do the desired audio processing
// In this case, we just apply a hanning window to the signal
for (var i=0; i<frames.size(); i++) {
    // apply a window (hanning) to the signal using the default parameters
    let windowedOut = essentia.Windowing(frames.get(i));
    console.log(windowedOut.frame);

    // we can add any essentia algorithms here to the compute frame-wise audio feature
}
