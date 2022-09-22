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
   * @typedef {Object} project - 進行中（参加者募集中）のプロジェクト
   * @property {String} title - 研究主題
   * @property {String} url - 研究内容へのリンク
   * @property {String} image - 研究内容を表すの画像
   * @property {String} downloadTitle - ファイルをダウンロードする際のファイル名
   */

  /**
   * @typedef {Object} backgrounds - HPの背景画像
   * @property {String} lazyload - lazyload機能を使う場合の画像（オプション）
   * @property {String} normal - 背景画像
   */

  /**
   * @typedef {Object} award - イベントの情報
   * @property {String} year - 年
   * @property {String} text - 内容
   * @property {String} url - 詳しい情報へのリンク（オプション）
   */

  /**
   * @typedef {Object} graduate - 毎年の卒業生
   * @property {String} year - 卒業年度
   * @property {String} undergrad - 学部生
   * @property {String} grad - 院生
   */

  /**
   * @typedef {Object} other - その他の情報
   * @property {String} title - タイトル
   * @property {String} content - 内容
   */

  /**
   * @typedef {Object} member
   * @property {String} name - メンバー名
   * @property {String} position - 役職（先生，学年）
   * @property {String} image - メンバーの写真
   * @property {String} intro - メンバーの紹介文（先生しか）
   * @property {String} interest - 関心分野
   * @property {Object.<other>} others - その他
   * @property {String} tutor - 指導教員
   */

  /**
   * @typedef {Object} obog - Old Boys/ Old Girls
   * @property {String} name - メンバー名
   * @property {String} position - 役職（先生，学年）
   * @property {String} image - メンバーの写真
   * @property {String} intro - メンバーの紹介文（先生しか）
   * @property {Object} interest - 関心分野
   * @property {String} others - その他
   */

  /**
   * @typedef {Object} faculty - 研究活動の執行主体
   * @property {String} name - 主体の名前
   * @property {String} english - 英語名
   * @property {String} avatar - 画像
   * @property {String} email - メールアドレス
   * @property {String} link - ページへのリンク
   */

  /**
   * @typedef {Object} menuItem - メニューの項目
   * @property {String} name - 項目の名前
   * @property {String} english - 項目の英語名
   * @property {String} url - 項目のリンク
   * @property {String} show - 項目を表示するかしないか
   */

  /**
   * @typedef {Object} paper - 論文
   * @property {String} title - 論文のタイトル
   * @property {String} url - 論文へのリンク
   */

  /**
   * @typedef {Array} affiliate - 発達心理学研究室の出身・所属メンバーの論文
   * @property {String} name - 名前
   * @property {Array.<paper>} papers - 論文リスト
   */

  /**
   * @typedef {Array.<paper>} bachelor - 学部生の論文
   */

  /**
   * @typedef {Array.<paper>} master - 修士の論文
   */

  /**
   * @typedef {Array.<paper>} doctor - 博士の論文
   */

  /**
   * @namespace config - 設定ファイル
   * @type {Object}
   * @property {Array.<project>} projects - 現在進行中の研究項目
   * @property {Object.<backgrounds>} backgrounds - 背景画像
   * @property {Array.<award>} awards - 「研究室の話題」
   * @property {Array.<graduate>} graduates - 「卒業生の進路」
   * @property {Array.<member>} members - 「メンバー紹介」
   * @property {Array.<obog>} obogs - 「卒業したメンバー」
   * @property {Array.<faculty>} faculties - 研究活動の執行主体一覧
   * @property {Array.<menuItem>} menuItems - メニュー項目
   * @property {Array.<affiliate>} affiliates - 発達心理学研究室の出身・所属メンバーの論文
   * @property {Array.<bachelor>} bachelors - 学部生の論文
   * @property {Array.<master>} masters - 修士生の論文
   * @property {Array.<doctor>} doctors - 博士生の論文
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
      console.log("Loading fallback config...");
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
