# erf_dev

## これは何か
Webサービス開発の中でも、**データベース設計を先行させた継続的な開発のサイクル**を始めるときの、  
最初のサイクルを構築する手間を無くすことを目標としたスケルトンプロジェクトです。  

データベースはRDB（既定ではMySQL）です。  
RDBを使った新しいWebサービスを構築するには、まずこのプロジェクトをダウンロードすること、  
そして、
1. ER図を描く。 
1. サーバーサイドのAPIを作るコーディング。  
1. クライアントサイドのWebユーザーインターフェースを作るコーディング。  
1. 動作のテスト。

だけで済みます。1.から4.は手軽に何度でも繰り返すことができます。  
最も重要なのは**ER図を描くことが出発点となっている**ところです。  
この仕組みを実現する必要最低限のコードを、ごく僅かなサンプルコードと共に提供します。

### 補足
最初の1行で「継続的な開発のサイクル」と表現しました。開発を進めると、間違いなく同じプロセスを繰り返すことが必要になります。  

Webアプリを作るにはまず、データベースを設計し、アプリケーションからそのデータベースを利用し、データを保存したり保存されたデータを取得するコードを書くでしょう。  
その後データベースには変更が加えられ、アプリケーションの処理も修正されます。  
その後またデータベースは変更され、アプリケーションも修正されます。  
その後また変更、修正がされます。 その後また変更、修正がされます。 その後また変更、修正がされます。  

この繰り返しはWebサービス開発そのものであり、決して無くせない繰り返しです。  
そしてこのことがER図を描くことを出発点としたサイクルの利点となります。
### チュートリアル

[チュートリアルを是非実行してください。すぐに動かせます。](./Tutorial.md)

## なぜ良いのか

（私が構築したのははるか昔なので詳しくありませんが）RubyOnRailsのようなアプリケーションサーバーでは、まずModelsクラスを定義し、そのコードを元にデータベースに対して自動的に`CREATE TABLE`等のSQL発行がなされます。  
このアプローチは最初の１回目だけは素早く構築できるでしょう。しかしER図そのものとER図によるテーブル設計を軽視したアプローチで、上述の開発サイクルを幾度となく繰り返すとテーブル構成を把握することはできなくなるはずです。  
それとは逆にER図を描くことを手順の先頭に置いた開発サイクルでは常にER図を見てテーブル構成を把握しながらアプリケーションを書くことになります。開発者の頭にあるのはER図とアプリケーションコードだけです。  
また、ER図からモデルクラスが自動的に生成される仕組みになっていれば、ER図は管理しなければならないドキュメントではなくアプリケーションソースコードの一部となります。同時に（当然のことですが）正確で有用なドキュメントとしても働きます。

## 使い方
### 【Step1】  
ER_DiagramフォルダにはMySQL Workbenchのファイルであるmwbファイルが入っています。  
monorailsというサンプルデータベースで、少ないテーブルとリレーションが定義済みです。  
MySQLWorkbenchの機能によってER図を描き、自動でSQLを生成し、データベースにテーブルを作成します。  
[Step2に繋げるためには詳しい使い方を読んでください。](./tools/ER_Diagram.md)

### 【Step2】  
KailsにはKoajsを元にしたRailsライクなフレームワークであるKailsが入っています。  
sequelize-autoによってmonorailsデータベースからmodelsクラスを自動で生成します。  
Kailsを起動すると、modelsクラスから自動的にリレーションの定義（動的な定義）をします。  
あとはKailsのcontrollerを作成するだけです。  
[Step1で作ったテーブル設計から実際にモデルクラスを生成して開発に着手する方法は詳しい使い方を読んでください。](./tools/Kails.md)

### 【Step3】  
React-appにはブラウザで動くWebアプリとして最低限のReactアプリケーションが入っています。  
実のところReact-appは一切使わず、Kails内のejsだけでWebアプリを作ることも可能です。  
ですがReact-appとしてクライアントアプリケーションを分離することで、KailsはDBからAPIまでのアプリケーションサーバーに、React-appはGUIクライアントにそれぞれ専念できます。  
非情な疎結合で、既存のフルスタック型のフレームワークとは異なった新しいアプローチです。  
これはER図先行型開発とは無関係です。また、VueJSなど別のWebアプリケーションフレームワークと置き換えて開発することも当然できるでしょう。  
私はReactJSが好きなのでこれを使います。  
[いくつかの注意事項があるので詳しい使い方を読んでください。](./tools/React-app.md)

## 感謝
### Kails, KoaJS について  
[Kailsとは（日本語）](https://blog.kotorel.com/2019/08/kails-an-open-source-project-of-nodejs-similar-to-rails-based-on-koa2.html)
（[cn](https://www.embbnux.com/2016/09/04/kails_with_koa2_like_ruby_on_rails/)
[en](https://developpaper.com/kails-an-open-source-project-of-nodejs-similar-to-rails-based-on-koa2/)）

NodeJSでアプリケーションサーバーを構築するにあたって、フレームワークを選定するのは気の滅入る作業です。  
Railsのようなフォルダ構成が好きなので`Sails`を使おうと思いましたが、大きすぎて自分好みにカスタマイズする方法が分からなかったので諦めました。`AdonisJS`も試しましたが同様にカスタマイズするよりは弄らずそのまま開発を始めるもののように感じました。（これらのフレームワークが悪いと言いたいのではなく、できるだけシンプルなフレームワークを求めていたので用途に合わなかったということです）。  
KoaJSはシンプルで良さそうでしたがフルスタックフレームワークでないので選択肢に上がっていませんでした。しかしドキュメント内に[Kails](https://github.com/embbnux/kails)というKoaJSを使ったシンプルな構成でRailsライクなフレームワークを実現しているプロジェクトを見つけました。実際ダウンロードして試してみたところ小さくまとまっておりカスタマイズしてみた感触もとても良かったので、非常にマイナーなフレームワークだとは思いつつもこれを使うことにしました。  
マイナーと言っても実態はKoaJSとその周辺ライブラリ、人気のあるサードパーティ製ライブラリを組み合わせたものなので十分に継続利用が可能だと思います。当リポジトリのKailsはER図先行開発のためにカスタマイズされたものです。

### MySQL Workbench について  
ER図を作るにはキーボードをタイピングするだけでは絶対できません。優れたGUIツールが必要です。Eclipseや他のツールにもER図作成機能はありますが、それらのツールの中でもMySQL Workbenchは優れたツールだと思います。

### Sequelize, Sequelize-auto について  
このアプローチを実現する最も大事なライブラリです。これらがなければER図からモデルクラスへの自動生成ができません。  
WebアプリケーションをER図先行で開発するアプローチで、最も悩むのがER図からモデルクラスの生成部分です。もしNodeJSでこれらのツールを見つけることができなければ、当リポジトリの作成も諦めていたはずです。

### 協力者求む
**ER図からシステム開発をする方法が好きな協力者が必要です。** 当リポジトリをダウンロードして実際に動かしてみるだけでも良いです。  
使い方がわからなければ質問してください。ドキュメントの充実が必要ですがそれには第三者の視点が必要です。  
また、当リポジトリの存在を誰かに広めたり、余裕があれば内容をより良くしてPRを出してみることもできます。  
ER図から始める手法に関する情報を知っていたら教えてくれるだけでも良いです。

## なぜやるのか
何かを継続して世に出し続け、世の中に良い影響を与えるまで成長させるには明確なビジョンとパッションが必要です。  
当リポジトリにおけるビジョンは、この世のシステム開発が全て、ER図先行型開発となること、それによって今以上に手軽に様々なサービスが高速で生み出され続ける世界です。難なくWebサービス開発ができれば、もっともっと面白いさまざまなWebサービスが生まれるはずです。世界中のエンジニアの人数と同じ数だけ、Webサービスが立ち上がることだって可能なはずです。  
決して、このリポジトリがその開発の中心となることを目指してはいません。このリポジトリが何者かに影響を与え、同じアプローチでより使いやすい開発フレームワークがいくつも作られ、それに関するドキュメントが世に溢れることが大事だと考えています。  

当リポジトリにおけるパッションは、ER図先行型開発の方が良いものであるという信念と、それにも関わらず、ER図先行型開発のサイクルの始め方がほとんど目につかない現状への憤りです。

（つまり、例えばシステム開発を行うためにGoogle検索すると必ずER図先行のアプローチがヒットし、そのための開発フレームワークがいくつもあってどれを使えば良いのか、みたいなTech記事がそこら中に溢れているような世界になれば、当リポジトリのパッションは失われたことになります。上述したような夢のようなビジョンが達成されたと言えないでしょうがその時はまた別のアイデアを別のリポジトリで提供することになるかもしれません。）

## License
[MIT](./LICENSE)

***

## Appendix
# How to Automatic generate "sequelize models" with All associations from MySQL Tables.
I'm looking for tool which can generate sequelize models automatic from already exists MySQL tables.  
So I found issues below, 
[https://github.com/sequelize/sequelize-auto/issues/34](https://github.com/sequelize/sequelize-auto/issues/34)
.
It's looks like the answer and I tried it.
But still had not usable all associations of tables. Then I extended some code like this [(./Kails/app/models/index.js)](./Kails/app/models/index.js).
It's works fine for models and there associations. (But some rules are needed. Table name, Column name, sequelize-auto configurations, etc.  This Repository has template of those.)