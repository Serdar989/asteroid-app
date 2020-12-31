import '../scss/style.scss';
import { elements } from './views/base';
import ASTEROID from './models/Table';
import UI from './views/viewTable';
import STORAGE from './asteroidStorage';

(function () {
  let currPage = 1;
  const asteroid = new ASTEROID();
  const ui = new UI(currPage);
  const storage = new STORAGE();
  ui.showLoader();

  /* Table controller */

  elements.startDate.value = '1900-01-01';
  elements.endDate.value = '1900-01-07';
  elements.dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ['table-section', 'select-section'].forEach(function (id) {
      document.getElementById(id).style.display = 'block';
    });
    const searchStart = elements.startDate.value;
    const searchEnd = elements.endDate.value;
    const one_day = 1000 * 60 * 60 * 24;

    const startDay = Date.parse(searchStart);
    const endDay = Date.parse(searchEnd);
    const rez = (endDay - startDay) / one_day;

    if (searchStart === '' && searchEnd === '') {
      ui.showFeedback('Molimo Vas, unesite datum', elements.feedback);
    } else if (rez > 7) {
      ui.showFeedback(
        'Maksimalni period između dva datuma je 7 dana, molimo Vas unesite datume u skladu sa zahtevom',
        elements.feedback
      );
    } else if (rez < 0) {
      ui.showFeedback(
        'Početni datum mora biti pre završnog, molimo Vas unesite pravilno parametre',
        elements.feedback
      );
    } else {
      ui.showLoader();
      elements.asteroidList.innerHTML = '';
      storage.removeLocalStorage();
      asteroid
        .asteroidDate(searchStart, searchEnd)
        .then((asteroidInfo) => {
          ui.asteroidTable(asteroidInfo);
          ui.pageNumbers(asteroidInfo);
          storage.updateStorage(asteroidInfo);
        })
        .catch((error) => console.log(error));
    }
  });

  /* pagination  */
  elements.prevButton.addEventListener('click', () => {
    const storageInfo = storage.getAsteroids();
    if (currPage > 1) {
      currPage--;
      const uiSelect = new UI(currPage);
      uiSelect.prevPage(currPage, storageInfo);
      uiSelect.selectedPage(currPage, storageInfo);
      uiSelect.checkButtonOpacity(currPage, storageInfo);
      storage.saveCurrPage(currPage);
    }
  });
  elements.nextButton.addEventListener('click', () => {
    const storageInfo = storage.getAsteroids();
    if (currPage < storageInfo[1]) {
      currPage++;
      const uiSelect = new UI(currPage);
      uiSelect.nextPage(currPage, storageInfo);
      uiSelect.selectedPage(currPage, storageInfo);
      uiSelect.checkButtonOpacity(currPage, storageInfo);

      storage.saveCurrPage(currPage);
    }
  });

  document.addEventListener('click', (e) => {
    const storageInfo = storage.getAsteroids();
    if (
      e.target.nodeName == 'SPAN' &&
      e.target.classList.contains('clickPageNumber')
    ) {
      ui.current_page = parseInt(e.target.textContent);
      ui.selectedPage(ui.current_page, storageInfo);
      ui.checkButtonOpacity(ui.current_page, storageInfo);

      ui.asteroidTable(storageInfo);
      storage.saveCurrPage(ui.current_page);
    }
  });

  /*** Drop-down list controller *****/

  elements.selectBox.addEventListener('change', () => {
    const optionArr = localStorage.getItem('optionArr')
      ? JSON.parse(localStorage.getItem('optionArr'))
      : [];
    elements.selectBox.options[0].disabled = true;
    const listIndex = elements.selectBox.selectedIndex;

    if (optionArr.includes(listIndex)) {
      ui.showFeedback(
        'Asteroid koji ste izabrali vec postoji u izabranoj listi, molimo Vas izaberite drugi asteroid',
        elements.selectFeedback
      );
    } else {
      const [nameSelected, idValues] = ui.selectItems(listIndex);
      storage.saveSelectList(nameSelected, idValues, listIndex);
    }
  });

  elements.asteroidList.addEventListener(
    'click',
    function (e) {
      e.preventDefault();

      const removedItem = e.target.parentElement;
      if (removedItem.classList.contains('delete-icon')) {
        const textName = removedItem.previousElementSibling.innerHTML;
        const asteroidItem = e.target.parentElement.parentElement;

        const indexOfItem = ui.removeItem(textName, asteroidItem);

        storage.removeSelectedItem(indexOfItem);
      }
    },
    false
  );

  // Display local storage
  document.addEventListener('DOMContentLoaded', () => {
    const asteroids = storage.getAsteroids();
    if (asteroids[0] !== null) {
      ui.current_page = storage.getCurrPage();
      currPage = storage.getCurrPage();

      ui.pageNumbers(storage.getAsteroids());

      ui.asteroidTable(storage.getAsteroids());

      ui.selectedPage(currPage, storage.getAsteroids());
      ui.checkButtonOpacity(currPage, storage.getAsteroids());

      ui.updateSelection(storage.loadedSelectList());
    }
  });
})();
