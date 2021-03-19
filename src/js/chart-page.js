import mediaQuery from './mediaQuery.js';
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
  // let showChartData;
  elements.loaderContainer.classList.remove('visible-loader');
  if (asteroid.idList == null || asteroid.idList.length === 0) {
    ui.showMessage();
    ui.renderSpinner();
  } else {
    for (let i = 0; i < asteroid.idList.length; i++) {
      urls.push(
        `https://www.neowsapp.com/rest/v1/neo/${asteroid.idList[i]}?api_key=${api_key}`
      );
    }
    try {
      state.chartDataArr = await asteroid.asteroidDataArr(urls);

      state.showChartData = asteroid.getChartData(state.chartDataArr);

      ui.showChart(state.showChartData, state.titleSize, state.titleText);
      ui.renderSpinner();
    } catch (err) {
      console.log(err);
    }
  }
};

const controlQuery = function () {
  const ui = new CHARTUI();

  ui.showChart(state.showChartData, state.titleSize, state.titleText);
};
document.addEventListener('DOMContentLoaded', () => {
  const ui = new CHARTUI();

  elements.loaderContainer.classList.remove('visible-loader');
  controlChartPage();
  mediaQuery.addHandlerQuery(controlQuery);
  ui.renderSpinner();
});
