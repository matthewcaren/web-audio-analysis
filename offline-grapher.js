RMS_GRAPH_DIV = document.getElementById('rmsGraph');
SPEC_GRAPH_DIV = document.getElementById('specGraph');

var graphLayout = {
    margin: {
        t: 30,
        b: 30
    }
}


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


function plotOfflineData() {
    console.log('plotting data!');

    console.log(document.rmsArray);

    var rms_update = {
        y: [document.rmsArray]
    };

    var spec_update = {
        y: [document.specArray]
    };

    Plotly.update('rmsGraph', rms_update)
    Plotly.update('specGraph', spec_update)
}


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
