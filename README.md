## \[ 載せ替え手順 ]

- 以下のコマンドを実行して NestJS アプリのディレクトリと基本の雛形を生成

```bash
nx generate @nrwl/nest:application <nest-app-name> --frontendProject <front-app-name>
```

※上記コマンドで生成することで、プロキシの設定ファイルに自動で追記してくれる。（あとで直接編集も可能なため、コマンドでの生成は別に必須ではない）

- 生成されたディレクトリ配下の src を convert

- 必要なパッケージをインストール

- エイリアスの解消 ( 設定方法の模索か、全てのファイル指定を相対パスでしていするか。shared 配下は勝手に通してくれそう )

- 以下のコマンドで実行

```bash
nx serve <nest-app-name>
```

\[ todo ]

- エイリアスを通す

- 必要なパッケージのインストール

\[ 参考 URL ]

- [Nx を使ってモノレポで Next.js+NestJS+TypeScript+Open API generator なアプリを作る](https://qiita.com/UHNaKZ/items/ba95938ae1df97d4697a)

- [React Nx Tutorial - Step 8: Create Libs](https://nx.dev/react-tutorial/08-create-libs)
