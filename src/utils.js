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

const getConfig = async (configName, fallbackConfigName) => {
  // TODO finish JSDoc
  /**
   * @namespace config
   * @type {Object}
   * @property {Array} projects - 現在進行中の研究項目
   * @property {Array} menuItems - メニュー項目
   * @property {Array} backgrounds - 背景画像
   * @property {Array} faculties - 研究活動の執行主体一覧
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
          return undefined;
        });
    }
  }

  return config;
};

export { getConfig };
