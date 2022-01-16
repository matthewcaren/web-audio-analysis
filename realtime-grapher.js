var dataArrayLength = 80
var rmsArray = []
var specArray = []

FREQ_MULTIPLIER = 44100/2048; // careful!! do not change without changing value in index
fft_xaxis = []

for (var i = 0; i < 1024; i++) {
    fft_xaxis.push(i * FREQ_MULTIPLIER);
}


function getRMS() {
    return document.rmsOut;
}

function getSpec() {
    return document.specOut;
}

function getFFT() {
    return document.fftOut;
}


RMS_GRAPH_DIV = document.getElementById('rmsGraph');
SPEC_GRAPH_DIV = document.getElementById('specGraph');
FFT_GRAPH_DIV = document.getElementById('fftGraph');

rmsArray = Array(dataArrayLength).fill(undefined)
specArray = Array(dataArrayLength).fill(undefined)

var graphLayout = {
    margin: {
        t: 30,
        b: 30
    }
}

var fftLayout = {
    xaxis: {
        type: 'log'
    },
    yaxis: {
        range: [-200, 0],
        autorange: false
    }
};


Plotly.newPlot(RMS_GRAPH_DIV, [{
    y: [0, undefined],
    mode: 'lines',
    line: {
        color: '#FC5656',
        shape: 'linear'
    }
}], graphLayout, {staticPlot: true});

Plotly.newPlot(SPEC_GRAPH_DIV, [{
    y: [0, undefined],
    mode: 'lines',
    line: {
        color: '#FC5656',
        shape: 'linear'
    }
}], graphLayout, {staticPlot: true});

Plotly.newPlot(FFT_GRAPH_DIV, [{
    x: fft_xaxis,
    y: [undefined],
    mode: 'lines',
    line: {
        color: '#FC5656',
        shape: 'linear'
    },
    log_x: true
}], fftLayout, {staticPlot: true});


var cnt = 0;

var interval = setInterval(function() {
    if (document.isRecording) {
        var newRMS = getRMS()
        rmsArray = rmsArray.concat(newRMS)
        rmsArray.splice(0, 1)

        var newSpec = getSpec()
        specArray = specArray.concat(newSpec)
        specArray.splice(0, 1)

        var newFFT = getFFT();

        var rms_update = {
            y: [rmsArray]
        };

        var spec_update = {
            y: [specArray]
        };

        var fft_update = {
            y: newFFT
        }

        Plotly.update('rmsGraph', rms_update)
        Plotly.update('specGraph', spec_update)
        Plotly.update('fftGraph', fft_update)
    }

    if(cnt === 100) clearInterval(interval);
}, 50);



function downloadData() {
    console.log(rmsArray);
    const data = [rmsArray, specArray];
    let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'audio-features.csv');
    link.click();
}
