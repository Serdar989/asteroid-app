import CHARTUI from './views/viewChart';
import CHARTDATA from './models/Chart';
import { state } from './models/Chart';
import '../scss/style.scss';
import { elements } from './views/base';
import { api_key } from './config';

const controlChartPage = async function () {
  const asteroid = new CHARTDATA();
  const ui = new CHARTUI();
  let urls = [];
  let showChartData;

  if (asteroid.idList.length === 0) {
    ui.showMessage();
  } else {
    for (let i = 0; i < asteroid.idList.length; i++) {
      urls.push(
        `https://www.neowsapp.com/rest/v1/neo/${asteroid.idList[i]}?api_key=${api_key}`
      );
    }
    try {
      state.chartDataArr = await asteroid.asteroidDataArr(urls);

      showChartData = asteroid.getChartData(state.chartDataArr);

      ui.showChart(showChartData);
      ui.renderSpinner();
    } catch (err) {
      console.log(err);
    }
  }
};

document.addEventListener('readystatechange', (event) => {
  const ui = new CHARTUI();

  if (event.target.readyState === 'interactive') {
    ui.renderSpinner();
  } else if (event.target.readyState === 'complete') {
    controlChartPage();
  }
});
