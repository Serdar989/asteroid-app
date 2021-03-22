import { state } from './models/Chart';

class MediaQuery {
  addHandlerQuery(handler) {
    //match media
    const desktopView = window.matchMedia('(min-width: 1200px)');
    const extraLarge = window.matchMedia(
      '(min-width: 981px) and (max-width: 1200px)'
    );
    const largeView = window.matchMedia(
      '(min-width: 769px) and (max-width: 980px)'
    );
    const mediumView = window.matchMedia(
      '(min-width: 541px) and (max-width: 768px)'
    );
    const smallView = window.matchMedia(
      '(min-width: 501px) and (max-width: 540px)'
    );
    const smallestView = window.matchMedia(
      '(min-width: 320px) and (max-width: 500px)'
    );

    const mqls = [
      desktopView,
      extraLarge,
      largeView,
      mediumView,
      smallView,
      smallestView,
    ];
    for (let i = 0; i < mqls.length; i++) {
      mqls[i].addEventListener(
        'change',
        function () {
          this.controlQuery(mqls);
          handler();
        }.bind(this),
        false
      );
    }
    this.controlQuery(mqls); // call handler function explicitly at run time
  }

  controlQuery(mqls) {
    if (mqls[0].matches) {
      state.titleSize = '24';
      state.titleText =
        'Prikaz broja prolaza asteroida koji su prošli blizu Zemlje od 1900. do 1999. god.';
    }
    if (mqls[1].matches) {
      state.titleSize = '22';
      state.titleText =
        'Prikaz broja prolaza asteroida koji su prošli blizu Zemlje od 1900. do 1999. god.';
    }
    if (mqls[2].matches) {
      state.titleSize = '20';
      state.titleText =
        'Prikaz broja prolaza asteroida koji su prošli blizu Zemlje od 1900. do 1999. god.';
    }
    if (mqls[3].matches) {
      state.titleSize = '18';
      state.titleText = [
        'Prikaz broja prolaza asteroida koji su prošli blizu ',
        'Zemlje od 1900. do 1999. god.',
      ];
    }
    if (mqls[4].matches) {
      state.titleSize = '16';
      state.titleText = [
        'Prikaz broja prolaza asteroida koji su prošli blizu ',
        'Zemlje od 1900. do 1999. god.',
      ];
    }
    if (mqls[5].matches) {
      state.titleSize = '14';
      state.labelFont = 12;
      state.titleText = [
        'Prikaz broja prolaza asteroida koji su prošli blizu ',
        'Zemlje od 1900. do 1999. god.',
      ];
    }
  }
}

export default new MediaQuery();
