var dataArrayLength = 100
var rmsArray = []

function getRMS() {
    return document.rmsOut;
}

function getSpec() {
    return document.specOut;
}


RMS_GRAPH_DIV = document.getElementById('rmsGraph');
SPEC_GRAPH_DIV = document.getElementById('specGraph');

rmsArray = Array(dataArrayLength).fill(undefined)
specArray = Array(dataArrayLength).fill(undefined)

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


var cnt = 0;

var interval = setInterval(function() {
    if (document.isRecording) {
        var newRMS = getRMS()
        rmsArray = rmsArray.concat(newRMS)
        rmsArray.splice(0, 1)

        var newSpec = getSpec()
        specArray = specArray.concat(newSpec)
        specArray.splice(0, 1)

        var rms_update = {
            y: [rmsArray]
        };

        var spec_update = {
            y: [specArray]
        };

        Plotly.update('rmsGraph', rms_update)
        Plotly.update('specGraph', spec_update)
    }

    if(cnt === 100) clearInterval(interval);
}, 50);
