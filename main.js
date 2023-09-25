// 変数の初期化
let isRunning = false;
let startTime;
let intervalId;

// スタートボタンが連続して押されないようにするためのフラグ
let isStartButtonEnabled = true;

// 初期表示のストップウォッチ内容
const initialStopwatchText = "0 : 0 : 0 : 0";

// 初期状態でスタートボタンを無効にする
document.getElementById("startButton").disabled = false;
document.getElementById("stopButton").disabled = true;
document.getElementById("resetButton").disabled = true;

// ストップウォッチを更新する関数
function updateStopwatch() {
    if (isRunning) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const formattedTime = formatTime(elapsedTime);
        // テキストコンテンツを設定
        const timeParts = formattedTime.split(' : ');
        const timePartElements = document.querySelectorAll('.time-part');

        timePartElements.forEach((element, index) => {
            element.textContent = timeParts[index];
        });
    }
}

// ミリ秒をフォーマットする関数
function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(1, "0");
    const minutes = date.getUTCMinutes().toString().padStart(1, "0");
    const seconds = date.getUTCSeconds().toString().padStart(1, "0");
    const millisecondsStr = date.getUTCMilliseconds().toString().charAt(0);
    return `${hours} : ${minutes} : ${seconds} : ${millisecondsStr}`;
}

// スタートボタンをクリックしたときの処理
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (startTime || 0);
        intervalId = setInterval(updateStopwatch, 100);
        document.querySelectorAll('.time-part').forEach((element) => {
            element.textContent = "0";
        });
        document.getElementById("startButton").textContent = "スタート";
        document.getElementById("startButton").disabled = true;
        document.getElementById("stopButton").disabled = false;
        document.getElementById("resetButton").disabled = false;
        isStartButtonEnabled = false;
    }
}

// ストップボタンをクリックしたときの処理
function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        document.getElementById("startButton").textContent = "スタート";
        document.getElementById("startButton").disabled = false;
        document.getElementById("stopButton").disabled = true;
        document.getElementById("resetButton").disabled = false;
        isStartButtonEnabled = true;
    }
}

// リセットボタンをクリックしたときの処理
function resetStopwatch() {
    stopStopwatch();
    document.querySelectorAll('.time-part').forEach((element) => {
        element.textContent = "0";
    });
    startTime = undefined; // リセット時にstartTimeもリセット
    // 初期状態でスタートボタンを無効にする
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
}

// スタートボタンの連続クリックを防ぐ
document.getElementById("startButton").addEventListener("click", function() {
    if (!isStartButtonEnabled) {
        return;
    }
    startStopwatch();
});

// ストップボタンをクリックしたときの処理
document.getElementById("stopButton").addEventListener("click", function() {
    startStopwatch();
    stopStopwatch();
});

// リセットボタンをクリックしたときの処理
document.getElementById("resetButton").addEventListener("click", function() {
    resetStopwatch();
});
