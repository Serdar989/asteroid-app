// import { api_key } from '../config';

export const state = {
  chartDataArr: [],
  showChartData: [],
  titleText:
    'Prikaz broja prolaza asteroida koji su prošli blizu Zemlje od 1900. do 1999. god.',
  titleSize: '28',
};

export default class CHARTDATA {
  constructor() {
    this.idList = JSON.parse(localStorage.getItem('idList'));
  }
  async asteroidDataArr(urls) {
    try {
      let data = await Promise.all(
        urls.map((url) => fetch(url).then((response) => response.json()))
      );

      return data;
    } catch (error) {
      console.log('Error!', error);
      throw error;
    }
  }

  getChartData(chartData) {
    let objArr = [];
    let arrOfRotation = [];
    let nameArr = [];
    let valueArr = [];
    let numOfRotation;
    let newArrOfRotation;
    let chartColor;
    let chartColorArr = [];
    for (const data of chartData) {
      let { name: astName, close_approach_data: approachData } = data;
      for (const rotationDate of approachData) {
        const { close_approach_date: approachDate } = rotationDate;
        arrOfRotation.push(approachDate);
      }
      let D1 = '1900-01-01';
      let D2 = '1999-12-31';
      D1 = new Date(Date.parse(D1));
      D2 = new Date(Date.parse(D2));
      newArrOfRotation = arrOfRotation.filter(filteringArray);
      // Returns an array of dates between the two dates
      function filteringArray(currentDate) {
        currentDate = new Date(Date.parse(currentDate));
        return currentDate <= D2 && currentDate >= D1;
      }
      numOfRotation = newArrOfRotation.length;
      if (numOfRotation < 25) {
        chartColor = 'rgba(3,252,73)';
      } else if (numOfRotation > 25 && numOfRotation < 45) {
        chartColor = 'rgba(252, 252, 3)';
      } else if (numOfRotation > 45 && numOfRotation < 75) {
        chartColor = 'rgba(252, 182, 3)';
      } else if (numOfRotation > 75) {
        chartColor = 'rgba(238, 21, 7, 1)';
      }
      nameArr.push(astName);
      valueArr.push(numOfRotation);
      chartColorArr.push(chartColor);
      objArr.push({ astName, numOfRotation });
    }
    return [nameArr, valueArr, chartColorArr];
  }
}
