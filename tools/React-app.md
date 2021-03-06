# 【Step3】 クライアントサイドの処理を作る
【Step2】でデータベースを読み書きするWebAPIのエンドポイントが作れたら、今度はそれを利用するクライアントを開発します。ER図先行の開発サイクルではサーバーサイドで完結しているのですが、モダン開発プロセスを全てカバーするためにReact-appの構築も説明します。ReactはWebブラウザ用ですが、せっかくWebAPIのエンドポイントができたのでiOS,Android用のネイティブアプリをクライアントとして開発することも当然できます。必要に応じてクライアント開発のプロジェクトは増やすと良いでしょう。

【Step2】でNodeJSはインストールできているはずなので、`/react-app/`に移動して
```
npm i
```
を実行し、React-appに必要なライブラリをダウンロードしておきます。
```
npm start
```
を行うと http://localhost:3001/ でReact-appのサーバーが起動します。アプリケーションサーバーとは別にGUIのためだけにサーバーを起動するのが無駄に感じるかもしれませんが、役割が別なのでサービス全体の構成を考えた時に決して悪い構成ではないはずです。しかしこのために本番環境の設定は少し工夫が必要になります（[プロキシ設定について](./KnowHow.md#proxy)）。

ReactJSでのWebアプリ開発方法はネット上にたくさんの情報があるため、必ずそちらも参照してください（[React開発](https://www.google.com/search?q=React+Webapp+Development)）。

[＞ Topに戻る](../README.md)
