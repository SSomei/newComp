// コンポジションを作成するスクリプトです。コンポジションを選択した状態でスクリプトを使用すると「コンポ n」とコンポジション名を指定してから選択したコンポジションと同じ設定で作成します。
// 何も選択されていない状態では通常通り新規コンポジションを作成します。

(function (newComp) {
    // アクティブなアイテム
    var activeComp = app.project.activeItem;
    var items = app.project.items;

    // コンポジションが選択されているかどうか判定する
    if (activeComp && (activeComp instanceof CompItem))
    {
        var Comps_length = app.project.items.length;
        var i;
        var c_num = 1;

        // すべてのコンポジションを読み込む
        for (i = 1; i <= Comps_length; i++)
        {
            // コンポジション以外を弾く
            if (app.project.item(i) && (app.project.item(i) instanceof CompItem))
            {
                var c_name = app.project.item(i).name;
                // 「コンポ n」だけ通す
                if (c_name.match(/^コンポ\s[1-9]\d*|0+$/))
                {
                    c_num = c_num + 1;
                }
            }
        }

        // コンポジションを作成して変数に返し値を保存
        var myComp = items.addComp(
            'コンポ ' + String(c_num),
            activeComp.width,
            activeComp.height,
            activeComp.pixelAspect,
            activeComp.duration,
            activeComp.frameRate
        );

        // 作成したコンポジションをビューワーで開く
        myComp.openInViewer();
    } else {
        // コンポジションを作成する
        app.executeCommand(2000);
    }
})(this);