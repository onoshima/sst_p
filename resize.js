/* resize */
let message_resize_again = '';
let scale_factor_avg = 1;

const intro_resize = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' '],
  stimulus: `
  <p>実験開始前に画面の表示サイズの調整を行います。</p>
  <p>手元にクレジットカード（もしくは，運転免許証，マイナンバーカード，交通系ICカード等）を用意してください。<br>
  （サイズ調整が目的ですので縦53.98mm×横85.60mmのカードであれば何でもかまいません。）</p>
  <p>スペースキーを押すと次に進みます。</p>
  `
};
timeline.push(intro_resize);


const resize_first = {
  type: jsPsychResize,
  item_width: 8.560,  // cm
  item_height: 5.389, // cm
  starting_size: 100,
  button_label: '調整終了',
  prompt: function () {
    return `
      <div class="resize">` + message_resize_again + `
        <p>1回目の画面サイズの調整を行います。四角の右下の角をドラッグして，クレジットカード（もしくは，運転免許証，マイナンバーカード，交通系ICカード等）と同じ大きさになるように調整してください。調整を終了してから次に進んでください。</p>
      </div>
      `
  },
  pixels_per_unit: 100, // 100pxで1cm
  on_start: function () {
    document.getElementById("jspsych-content").style.transform = "scale(1)";
  }
};

const resize_second = {
  type: jsPsychResize,
  item_width: 8.560,  // cm
  item_height: 5.389, // cm
  button_label: '調整終了',
  starting_size: 500,
  prompt: `
  <div class="resize">
  <p>2回目の画面サイズの調整を行います。四角の右下の角をドラッグして，クレジットカード（もしくは，運転免許証，マイナンバーカード，交通系ICカード等）と同じ大きさになるように調整してください。調整を終了してから次に進んでください。
  </p></div>
  `,
  pixels_per_unit: 100, // 100pxで1cm
  on_start: function () {
    document.getElementById("jspsych-content").style.transform = "scale(1)";
  }
};

const loop_resize = {
  timeline: [resize_first, resize_second],
  loop_function: function() {
    scale_factors = jsPsych.data.get().last(2).select('scale_factor').values;
    if (Math.abs(scale_factors[0] - scale_factors[1]) > .05) {
      message_resize_again = '<p><strong class="resize-alert">画面サイズの調整に失敗しました。クレジットカード等と同じサイズになるように，できるだけ正確に調整してください。</strong><p>';
      return true
    } else {
      scale_factor_avg = (scale_factors[0] + scale_factors[1]) / 2;
      document.getElementById("jspsych-content").style.transform = "scale(" + scale_factor_avg + ")";
      false
    }
  }
}
timeline.push(loop_resize);
