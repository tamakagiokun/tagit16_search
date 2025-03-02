const apiKey = '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';

// メッセージ送信ボタンが押されたときに呼び出される関数
function sendMessage() {
    // 各入力フィールドの値を取得
    const userInput = document.getElementById('name').value;
    const userImput = document.getElementById('budget').value;

    // APIに送信するメッセージを構築
    const message = `合計${userImput}円以内で${userInput}のグッズを教えて。グッズの名前と値段、URLを実際にアクセスできるものだけ教えて。会話文などほかの情報はいらないよ。`;

    // ペイロード作成
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: message }
        ],
        max_tokens: 4000
    };

    // APIリクエストを送信
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const output = data.choices[0].message.content;
        const formattedOutput = output.replace(/(.{100})/g, '$1\n'); // 回答を100字ごとに改行
        document.getElementById('response').textContent = output;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
