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
        }).catch((error) => {
          console.log('Service worker registration failed ', error);
        });
    } else {
      console.log('Service workers are not supported');
    }
  }

}

export default SwHelper
