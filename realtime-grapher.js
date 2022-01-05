var arrayLength = 100
var dataArray = []

function getRMS() {
  return document.rmsOut;
}

function getSpec() {
  return document.specOut;
}

GRAPH_DIV = document.getElementById('specGraph');

dataArray = Array(arrayLength).fill(0)

Plotly.newPlot(GRAPH_DIV, [{
  y: [0,0],
  mode: 'lines',
  line: {color: '#FC5656'}
}]);

var cnt = 0;

var interval = setInterval(function() {
  var y = getRMS()
  dataArray = dataArray.concat(y)
  dataArray.splice(0, 1)

  var data_update = {
    y: [dataArray]
  };

  Plotly.update('specGraph', data_update)

  if(cnt === 100) clearInterval(interval);
}, 50);
