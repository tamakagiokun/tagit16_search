const apiKey = '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';

// メッセージ送信ボタンが押されたときに呼び出される関数
function sendMessage() {
    // 各入力フィールドの値を取得
    const userInput = document.getElementById('name').value;
    const userImput = document.getElementById('budget').value;

    // APIに送信するメッセージを構築
    const message = `合計${userImput}円以内で${userInput}のグッズを教えて。グッズの名前と値段、URLを実際にアクセスできるものだけ教えて。会話文などほかの情報はいらないよ。`;

    // ペイロードを作成
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
