let essentia;

const audioURL = "https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_2MG.wav";

EssentiaWASM().then( async function(EssentiaWasm) {
    essentia = new Essentia(EssentiaWasm);

    console.log("using essentia version " + essentia.version)

    // prints all the available algorithms in essentia.js
    // console.log(essentia.algorithmNames);

    const offlineAudioCtx = new AudioContext();

    console.logToScreen("loading audio data: " + audioURL)

    const audioData = await essentia.getAudioChannelDataFromURL(audioURL, offlineAudioCtx);

    console.logToScreen("finished loading audio data");

    console.logToScreen("extracting audio features...");

    // generates frames, output type VectorVectorFloat
    const frames = essentia.FrameGenerator(audioData,
                                           1024, // frameSize
                                           512); // hopSize

    var rmsArray = [];
    var specArray = [];

    // iterate through each frame, compute audio features
    for (var i=0; i<frames.size(); i++) {
        // windowing (default = hanning)
        let windowedOut = essentia.Windowing(frames.get(i));

        // feature extraction here
        rmsArray.push(essentia.RMS(windowedOut.frame).rms);
        specArray.push(essentia.Centroid(windowedOut.frame).centroid);

        // console.log(essentia.Chromagram(windowedOut.frame))
    }

    document.rmsArray = rmsArray;
    document.specArray = specArray;

    console.logToScreen("finished extracting audio features");

    plotOfflineData()
});
