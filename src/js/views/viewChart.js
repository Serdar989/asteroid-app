import { elements } from './base';
import Chart from 'chart.js';

export default class CHARTUI {
  showMessage() {
    elements.feedback.classList.add('showItem');
    elements.feedback.innerHTML = `<h1>Nije izabran ni jedan asteroid, vratite se na prethodnu stranu izaberite asteroid</h1>`;
  }

  renderSpinner() {
    setTimeout(() => {
      elements.loaderContainer.classList.add('visible-loader');
    }, 2000);
  }

  showChart(showChartData, titleSize, titleText, labelFont) {
    let name, value, color;
    name = showChartData[0];
    value = showChartData[1];
    color = showChartData[2];

    const chart = document.getElementById('myChart');
    if (chart) {
      const ctx = document.getElementById('myChart').getContext('2d');

      const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: name,
          datasets: [
            {
              label: 'Broj razlicitih prolazaka pored Zemlje',
              data: value,
              backgroundColor: color,
              borderColor: ['rgba(255, 255, 255, 1)'],
              borderWidth: 2,
              color: ['rgba(255, 255, 255, 1)'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            animationDuration: 0,
          },

          animation: {
            duration: 1000,
            onComplete: function () {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;

              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'center';
              ctx.fillStyle = Chart.helpers
                .color('black')
                .lighten(0.75)
                .rgbString();

              this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x / 2 + 62, bar._model.y);
                });
              });
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: '#fff',
                },
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.8)',
                },
                lineWidth: 1,
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: '#fff',
                },
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.8)',
                  lineWidth: 1,
                },
              },
            ],
          },
          title: {
            display: true,
            text: titleText,
            fontSize: titleSize,
            fontColor: '#fff',
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'black',
              fontSize: labelFont,
              fontStyle: 'bold',
            },
          },
        },
      });
    }
  }
}
