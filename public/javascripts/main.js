import SwHelper from './utils/SwHelper.js';
import ClickManager from './ClickManager.js';


(() => {
  const swHelper = new SwHelper()
  const clickManager = new ClickManager();

  swHelper.registerWorker();
})()
