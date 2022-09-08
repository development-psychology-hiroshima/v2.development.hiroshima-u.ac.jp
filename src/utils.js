import jsyaml from "js-yaml";

const defaultTimeout = 5000;

const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
  const controller = new AbortController();
  // If timeout reached before resource is fetched then the fetch is aborted
  const promise = fetch(url, { signal: controller.signal, ...options }).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Fetch ${response.url} failed: ${response.status}`);
      }
      return response;
    }
  );
  // If the input signal is aborted then the fetch is aborted and the timeout is cleared
  if (signal) signal.addEventListener("abort", () => controller.abort());
  const timeout = setTimeout(() => controller.abort(), ms);
  // If resource is fetched before timeout reaches then the timeout is cleared
  return promise.finally(() => clearTimeout(timeout));
};

const controller = new AbortController();

/**
 * @function getConfig
 * @param {String} configName
 * @param {String} fallbackConfigName
 * @return {Promise<Object>} config
 * @example
 * const config = await getConfig("main.yml", "fallback/main.json");
 */
const getConfig = async (configName, fallbackConfigName) => {
  /**
   * @typedef {Object} project
   * @property {String} title
   * @property {String} url
   * @property {String} image
   * @property {String} downloadTitle - filename of the download
   */

  /**
   * @typedef {Object} backgrounds
   * @property {String} lazyload
   * @property {String} normal
   */

  /**
   * @typedef {Object} award
   * @property {String} year
   * @property {String} text
   * @property {String} url
   */

  /**
   * @typedef {Object} graduate
   * @property {String} year
   * @property {String} undergrad
   * @property {String} grad
   */

  /**
   * @typedef {Object} member
   * @property {String} name
   * @property {String} position
   * @property {String} image
   * @property {String} intro
   * @property {String} interest
   * @property {String} others
   */

  /**
   * @typedef {Object} obog
   * @property {String} name
   * @property {String} position
   * @property {String} intro
   * @property {String} interest
   * @property {String} others
   */

  /**
   * @typedef {Object} faculty
   * @property {String} name
   * @property {String} english
   * @property {String} avatar
   * @property {String} email
   * @property {String} link
   */

  /**
   * @typedef {Object} menuItem
   * @property {String} name
   * @property {String} english
   * @property {String} url
   * @property {String} show
   */

  /**
   * @namespace config
   * @type {Object}
   * @property {Array.<project>} projects - 現在進行中の研究項目
   * @property {Object.<backgrounds>} backgrounds - 背景画像
   * @property {Array.<award>} awards - 「研究室の話題」
   * @property {Array.<graduate>} graduates - 「卒業生の進路」
   * @property {Array.<member>} members - 「メンバー紹介」
   * @property {Array.<obog>} obogs - 「過去のメンバー」
   * @property {Array.<faculty>} faculties - 研究活動の執行主体一覧
   * @property {Array.<menuItem>} menuItems - メニュー項目
   */
  let config = {};

  const response = await fetchTimeout(configName, defaultTimeout, {
    signal: controller.signal,
  })
    .then((response) => response.text())
    .catch((e) => {
      console.error(
        `Caught error: ${e.message}, please contact the maintenance personnel.
        Fallback config loaded for content display.`
      );
      return undefined;
    });

  if (undefined !== response) {
    try {
      config = jsyaml.load(response);
    } catch (e) {
      console.error(e.message);
      if (!fallbackConfigName) {
        return undefined;
      }
      config = await fetchTimeout(fallbackConfigName, defaultTimeout, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .catch((e) => {
          console.error(
            `Get fallback config failed with error: ${e.message}, please contact the maintenance personnel.`
          );
          return {};
        });
    }
  }

  return config;
};

export { getConfig };
