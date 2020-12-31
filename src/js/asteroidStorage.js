export default class STORAGE {
  constructor() {
    this.optionArr = [];
    this.optionList = [];
    this.idList = [];
  }

  // update local  storage
  updateStorage(dataLocal) {
    const localinfo = dataLocal[0];
    const pageNum = dataLocal[1];
    localStorage.setItem('asteroidDataLocal', JSON.stringify(localinfo));
    localStorage.setItem('numOfPages', JSON.stringify(pageNum));
  }
  getAsteroids() {
    let asteroids = JSON.parse(localStorage.getItem('asteroidDataLocal'));
    let pages = JSON.parse(localStorage.getItem('numOfPages'));
    return [asteroids, pages];
  }

  loadedSelectList() {
    let loadedIdList;
    let loadedOptionList;
    let loadedOptionArr;
    loadedIdList = localStorage.getItem('idList')
      ? JSON.parse(localStorage.getItem('idList'))
      : [];
    loadedOptionList = localStorage.getItem('optionList')
      ? JSON.parse(localStorage.getItem('optionList'))
      : [];
    loadedOptionArr = localStorage.getItem('optionArr')
      ? JSON.parse(localStorage.getItem('optionArr'))
      : [];

    return [loadedOptionList, loadedIdList, loadedOptionArr];
  }

  setLocalStorage(setOptionList, setIdList, setOptionArr) {
    localStorage.removeItem('idList');
    localStorage.removeItem('optionList');
    localStorage.removeItem('optionArr');
    localStorage.setItem('idList', JSON.stringify(setIdList));
    localStorage.setItem('optionList', JSON.stringify(setOptionList));
    localStorage.setItem('optionArr', JSON.stringify(setOptionArr));
  }
  removeLocalStorage() {
    localStorage.removeItem('idList');
    localStorage.removeItem('optionList');
    localStorage.removeItem('optionArr');
  }
  saveCurrPage(currPage) {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', JSON.stringify(currPage));
  }
  getCurrPage() {
    let currPages = JSON.parse(localStorage.getItem('currentPage'));
    return currPages;
  }
  saveSelectList(selectedName, selectedId, indexArr) {
    [this.optionList, this.idList, this.optionArr] = this.loadedSelectList();

    this.idList.push(selectedId);
    this.optionList.push(selectedName);
    this.optionArr.push(indexArr);
    this.setLocalStorage(this.optionList, this.idList, this.optionArr);
  }

  removeSelectedItem(itemIndex) {
    [this.optionList, this.idList, this.optionArr] = this.loadedSelectList();

    this.optionList.splice(itemIndex, 1);
    this.idList.splice(itemIndex, 1);
    this.optionArr.splice(itemIndex, 1);
    this.setLocalStorage(this.optionList, this.idList, this.optionArr);
  }
}
