/**
 * Utility class for dealing with service workers.
 */
class SwHelper {
  constructor() {}

  registerWorker = () => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register('pixelSw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service worker registered for', registration.scope);
          registration.addEventListener('updatefound', () => {
            this.handleSwUpdateFound(registration)
          }) 
        }).catch((error) => {
          console.log('Service worker registration failed ', error);
        });
    } else {
      console.log('Service workers are not supported');
    }
  }

  handleSwUpdateFound = (registration) => {
    const installingWorker = registration.installing;

    if (installingWorker) {
      console.log('Installing new service worker: ', installingWorker);
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log(`Service worker updated, will be used when all
            other tabs are closed.`);
          } else {
            console.log('Service worker installed');
          }
        }
      };
    }
  };

}

export default SwHelper
