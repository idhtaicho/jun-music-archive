# 殉 -jun | Music Archive

ブルーゴシックのデザインで、Visual KeiカバーとオリジナルのAI歌唱デモを紹介する静的サイトです。

## 現在の内容

- deadman「盲目の羽根と星を手に」カバー（TikTok）
- the GazettE「PLEDGE」カバー（TikTokリンク）
- 「哀の花」AI歌唱デモ（約45秒のMP3）
- カバー／オリジナル、アーティストでの絞り込み
- スマートフォン向けレイアウト

## 公開

GitHubの Settings → Pages → Deploy from a branch → main / (root) を選択して保存します。
index.html、privacy.html、画像・音源・CSS・JS・JSONファイルを同じリポジトリに配置してください。
HTMLだけでは画像・試聴・曲一覧は動きません。閲覧は公開URLまたはローカルHTTPサーバーから行います。

## 曲の更新

archive.json の配列を編集します。カテゴリは cover または original です。
TikTokの通常URLは埋め込み読み込みボタン、短縮URLはTikTokへのリンクとして表示します。
曲名・アーティスト名は自動的にHTMLとして解釈しません。

## 接続が必要な機能

投票サービス、専用の交流サービス、TikTok公式APIによる定期取得は未接続です。
投票の集計やコメント保存をこの静的サイトだけで行うことはできません。
実サービスを設定した後、settings.json の voteUrl / communityUrl にHTTPS URLを設定できます。
接続時にはprivacy.htmlもサービスの実際のデータ取扱いに合わせて更新してください。
APIの秘密鍵やアクセストークンをこの公開リポジトリに保存しないでください。

## 公式資料

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://developers.tiktok.com/docs/en/display-api-get-started

## 素材

元の提供ZIPのデザイン素材と試聴音源を使用しています。オープンソースライセンスや素材の再配布許諾は付与していません。
