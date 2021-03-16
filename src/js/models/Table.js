import { api_key } from '../config';

export default class ASTEROID {
  constructor() {
    this.records_per_page = 4;
  }

  async asteroidDate(start, end) {
    try {
      //user url
      const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${api_key}`;
      //nasa century url

      //get data
      const nasaData = await fetch(nasaURL);
      const data = await nasaData.json();

      let asteroidData = data.near_earth_objects;

      const dateArray = Object.entries(asteroidData);
      let asteroidInfoHazardous = [];
      let asteroidHazardousArray = [];
      for (let [date, asteroidInfo] of dateArray) {
        asteroidInfoHazardous = asteroidInfo.filter(
          (currDate) => currDate.is_potentially_hazardous_asteroid === true
        );
        asteroidInfoHazardous = asteroidInfoHazardous.map((item) => {
          const tableDate = date;
          const astName = item.name;
          const astId = item.id;
          const astSpeed =
            item.close_approach_data[0].relative_velocity.kilometers_per_hour;
          const minRadius =
            item.estimated_diameter.meters.estimated_diameter_min;
          const maxRadius =
            item.estimated_diameter.meters.estimated_diameter_max;
          return { tableDate, astId, astName, astSpeed, minRadius, maxRadius };
        });
        if (asteroidInfoHazardous.length) {
          asteroidHazardousArray.push(asteroidInfoHazardous);
        }
      }
      const mergedAsteroidInfo = asteroidHazardousArray.flat();

      const numPages = Math.ceil(
        mergedAsteroidInfo.length / this.records_per_page
      );

      return [mergedAsteroidInfo, numPages];
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
