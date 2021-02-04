const data = [];
const ctx = document.getElementById('chart1');

const graphParams = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'test',
        data: data,
        lineTension: 0.3,
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        borderColor: 'rgba(78, 115, 223, 1)',
        pointRadius: 0,
        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointBorderColor: 'rgba(78, 115, 223, 1)',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: 'rgb(255,255,255)',
      bodyFontColor: '#858796',
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
    },
    animation: {
      duration: 0, // general animation time
    },
  },
};

const chart1 = new Chart(ctx, graphParams);

client.on('message', (topic, message) => {
  let val = parseFloat(message);
  changeValue(val, 'test');
});

// Update HTML when message received
const changeValue = (value, topic) => {
  const date = new Date();

  switch (topic) {
    case 'test':
      if (data.length > 30) {
        data.shift();
      }
      data.push({ x: date.toISOString(), y: value });
      chart1.update();
      break;
  }
};
