/**
 * Performs a get request
 * @param {String} endPoint 
 * @param {Object | String} dataToSend 
 */
export const get = (endPoint, dataToSend) => {

  let url = new URL(endPoint)
  if (dataToSend.constructor !== String) {
    url.search = new URLSearchParams(dataToSend);
  }

  return fetch(url)
}
