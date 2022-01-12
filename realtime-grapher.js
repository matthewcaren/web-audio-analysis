var dataArrayLength = 100
var rmsArray = []

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

var layout = {
    title: 'FFT',
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
}]);

Plotly.newPlot(SPEC_GRAPH_DIV, [{
    y: [0, undefined],
    mode: 'lines',
    line: {
        color: '#FC5656',
        shape: 'linear'
    }
}]);

Plotly.newPlot(FFT_GRAPH_DIV, [{
    y: [0, undefined],
    mode: 'lines',
    line: {
        color: '#FC5656',
        shape: 'linear'
    },
    log_x: true
}], layout);


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
