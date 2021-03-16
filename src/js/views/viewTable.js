import { elements } from './base';

export default class UI {
  constructor(currPage) {
    this.current_page = currPage;
    this.records_per_page = 4;
    this.parentElement = document.querySelector('.loader-container');
  }

  //show feedback
  showFeedback(text, feedback) {
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 3000);
  }

  renderSpinner() {
    const markup = `
      <div class="loader-container">
      <img src="images/loader4.gif" class="loader" alt="" /> 
    </div>
  `;
    this.clear();
    elements.tableBody.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    elements.tableBody.innerHTML = '';
  }

  prevPage(currentPage, info) {
    this.current_page = currentPage;
    this.asteroidTable(info);
  }

  nextPage(currentPage, info) {
    this.current_page = currentPage;
    this.asteroidTable(info);
  }

  pageNumbers(info) {
    const pageNum = info[1];
    elements.pageNumber.innerHTML = '';

    for (let i = 1; i < pageNum + 1; i++) {
      elements.pageNumber.innerHTML +=
        "<span class='clickPageNumber'>" + i + '</span>';
    }
  }
  asteroidTable(asteroidInfoTable) {
    const numPages = asteroidInfoTable[1];
    const info = asteroidInfoTable[0];

    if (this.current_page < 1) {
      this.current_page = 1;
    }
    if (this.current_page > numPages - 1) {
      this.current_page = numPages;
    }

    elements.tableBody.innerHTML = '';
    for (
      let i = (this.current_page - 1) * this.records_per_page;
      i < this.current_page * this.records_per_page && i < info.length;
      i++
    ) {
      const tableElement = document.createElement('tr');
      tableElement.classList.add('table-element');
      tableElement.innerHTML = '';
      tableElement.innerHTML = `
              <td class="fly-date">${info[i].tableDate}</td>
              <td class="name">${info[i].astName}</td>
              <td class="speed">${info[i].astSpeed}</td>
              <td class="min-radius">${info[i].minRadius}</td>
              <td class="max-radius">${info[i].maxRadius}</td>`;
      elements.tableBody.insertAdjacentElement('beforeend', tableElement);
    }

    while (elements.selectBox.childNodes.length > 2) {
      elements.selectBox.removeChild(elements.selectBox.lastChild);
    }

    //  autocomplete box
    info.forEach((currAsteroid) => {
      const opt = document.createElement('option');
      opt.classList.add('option-element');

      opt.value = currAsteroid.astId;
      opt.innerHTML = currAsteroid.astName;

      elements.selectBox.appendChild(opt);
    });

    elements.startDate.value = '';
    elements.endDate.value = '';
  }

  selectedPage(currPage, storageInfo) {
    let currentNumber = document.querySelectorAll('.clickPageNumber');
    let pageNumber = storageInfo[1];
    for (let i = 0; i < pageNumber; i++) {
      if (i == currPage - 1) {
        currentNumber[i].style.opacity = '1.0';
      } else {
        currentNumber[i].style.opacity = '0.5';
      }
    }
  }
  checkButtonOpacity(currPage, storageInfo) {
    let pageNumber = storageInfo[1];
    if (currPage == 1) {
      elements.prevButton.classList.add('opacity');
      elements.nextButton.classList.remove('opacity');
    } else if (currPage == pageNumber) {
      elements.nextButton.classList.add('opacity');
    } else {
      elements.prevButton.classList.remove('opacity');
      elements.nextButton.classList.remove('opacity');
    }
  }

  updateSelection(localList) {
    const names = localList[0];
    const ids = localList[1];
    const indices = localList[2];
    names.forEach((name, index) => {
      const id = ids[index];
      const listIndex = indices[index];
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `<div class="asteroids-item" data-listIndex="${listIndex}">${name}</div>
                        <a href="#" class="delete-icon" data-id="${id}"
                         ><i class="fas fa-times"> </i
                          ></a>
                       `;
      elements.asteroidList.appendChild(li);
    });
  }
  selectItems(listIndex) {
    const idValue = document.getElementsByTagName('option')[listIndex].value;
    const asteroidName = document.getElementsByTagName('option')[listIndex]
      .text;
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `<div class="asteroids-item" data-listIndex="${listIndex}">${asteroidName}</div>
                      <a href="#" class="delete-icon" data-id="${idValue}"
                       ><i class="fas fa-times"></i
                        ></a>
                     `;
    elements.asteroidList.appendChild(li);

    return [asteroidName, idValue];
  }

  // remove item
  removeItem(textName, asteroidItem) {
    let optionList = [];
    let idList = [];

    document.querySelectorAll('.list-item').forEach((item) => {
      optionList.push(item.childNodes[0].innerHTML);
      idList.push(item.childNodes[2].dataset.id);
    });

    // remove from list
    elements.asteroidList.removeChild(asteroidItem);
    const indexOfItem = optionList.indexOf(textName);

    return [indexOfItem];
  }
}
