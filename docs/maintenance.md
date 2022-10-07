# Maintenance Manual for development.hiroshima-u.ac.jp

## 目録

[toc]

## お勧めコードエディター

広大はサーバー上のファイルを編集できるウェッブエディターを提供したが，自動補足などの機能を使えるよう，こちらは Microsoft 社開発した無料エディター [Visual Studio Code](https://code.visualstudio.com/download) (以下，VS Code or VSC) をお勧めします。

### Visual Studio Codeを日本語化する

Visual Studio Code はデフォルトでメニューなどの表示言語が英語になっていますが，拡張機能パック「日本語言語パック」によって表示言語を日本語に切り替えられます。詳しい手順を[こちら](https://www.javadrive.jp/vscode/install/index4.html)に参照してください。

#### `Extensions` パネルを開く

 VS Code の一番左のパネルに，`積み木`アイコンをクリックしてください。
![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image1.png){:title="図1 Extensions パネルを開く"}

#### `Japanese Language Pack` をインストールする

`Japanese Language Pack` をキーワードとして検索して，`Install` をクリックしてください。
![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image3.png)

#### 言語を切り替える

画面右下に表示した `Change Language and Restart` ボタンをクリックして，VS Code を再起動させてください。
    ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image4.png)

## 配置ファイルを編集する

Web サイトに掲載していた内容は，二つの配置ファイル (`main.yml`, `research.yml`) を編集することで簡単に変えられます。HTML ファイルの直接的な操作をほぼなくなり，メンテナンス難易度を大幅下げる機能となります。

### 配置ファイルのパスを特定する

配置ファイルでは，サーバーの `configs > main.yml` と `configs > research.yml` に居ます。

![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image5.png)![Graphical user interface, text, application, email Description automatically generated](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image6.png)

### サーバーに配置ファイルをダウンロードする

### VS Code で配置ファイルを編集する

#### 配置ファイルの内容

##### main.yml

こちらの配置ファイルは，発達研現在行っている研究プロジェクト，HPのバックグラウンド画像，研究室の話題，メンバー紹介，卒業生の進路，メニュー項目の内容を含めています。

| セクション名 | Webコンポーネント    | スクリーンショット                                       |
| ---------------- | ------------------------ | ------------------------------------------------------------ |
| projects[^1]     | 研究プロジェクト         | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image7.png) |
| backgrounds      | HPのバックグラウンド画像 | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image8.png) |
| awards           | 研究室の話題             | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image9.png) |
| graduates        | 卒業生の進路             | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image10.png) |
| members          | メンバー紹介             | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image11.png) |
| obogs            | OB・OG                   | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image12.png) |
| faculties        | 研究活動を行う主体       | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image13.png) |
| menuItems        | メニュー項目             | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image14.png) |

##### research.yml

こちらの配置ファイルは，発達研の研究論文を含めています。

| セクション名 | Webコンポーネント                              | スクリーンショット                                           |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------ |
| affiliates   | 発達心理学研究室の出身・所属メンバーの主要論文 | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image15.png) |
| bachelors    | 過去のメンバーの卒業論文                       | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image16.png) |
| masters      | 過去のメンバーの修士論文                       | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image17.png) |
| doctors      | 過去のメンバーの博士論文                       | ![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image18.png) |

#### 符号と意味

内容更新は大体コピペー作業になりますが，[こちら](https://magazine.rubyist.net/articles/0009/0009-YAML.html)に YAML の書き方が身につけられます。

#### 編集の時に注意しなければいけないこと

##### インデントのスペース数厳守

半角スペースのインデントを使うしかデータの階層構造を認識できないので，必ずスペース数を前文と一致してください。（<span style="color:red;font-weight:bold">Tabも全角スペースも使えません</span>ようご注意ください）

VS Codeを使うと，普通自動的にインデントを補足しますのでお勧めします。

![Text Description automatically generated with low confidence](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image19.png)

![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image20.png)

##### 内容に英文字コロン `:` がある時，必ずテキストを英文字の引用符 `""` で囲む

英符号コロン `:` では，`key: value`  構造として認識するとエラーになります。

ですので，コロン `:` をテキスト内容として入力する時に，その行の内容を引用符 `""` で囲んでください。

![](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image21.png)

[こちら](http://www.yamllint.com/)で配置ファイルにエラーがあるかどうかをチェックできます。

## 学内サーバーに最新の配置ファイルをアップロードする

編集済んだ配置ファイルを，学内サーバーにアップロードするか，内容をペーストしてセーブするか，どちらでも構いません。

## 内容はアップデートしましたのを確認する

ブラウザーで発達研HPを開いてください。

内容がアップデートされていない場合は，5秒ぐらいを待って再読み込みしてください。

3-5回再読み込みしても内容はアップデートされていない場合， <kbd>F12</kbd> キーを押して，コンソール欄にエラーがあるかどうかを確認してください。

![Graphical user interface, application, Word Description automatically generated](https://raw.githubusercontent.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp/master/docs/img/image22.png)

## 添付

### Source Code Repository on GitHub

<https://github.com/development-psychology-hiroshima/v2.development.hiroshima-u.ac.jp>

### Vue3 日本語版ドキュメント

<https://v3.ja.vuejs.org/guide/introduction.html>

[^1]: projects 欄は，indexページにいて，研究内容が変わった時に表示します。
