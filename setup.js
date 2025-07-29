/* initialize jsPsych */
const jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

/* create timeline */
const timeline = [];


/* set participant id and block order */
const participant_id = jsPsych.randomization.randomID(10);
const filename = `${participant_id}.csv`;
const exp_id = 'hhdvS9h2hr2h';
const exp_id_init = '3bRqKXdh7Yio';
const study_code = '52';
const code = jsPsych.randomization.randomInt(1000, 9999);

jsPsych.data.addProperties({
  participant_id: participant_id,
  code: code,
  study_id: study_code,
});

/* preload images */
const preload = {
  type: jsPsychPreload,
  images: [
    'img/left_arrow.png', 'img/right_arrow.png', 'img/cross.png',
    'img/edgeBrowserZoom.png', 'img/chromeBrowserZoom.png'
  ]
}
timeline.push(preload);

const setbrowerZoom = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="width700">
  <p>実験にご参加いただきありがとうございます。</p>
  <p>画面に表示される内容の大きさを揃えるためにウェブブラウザのズームを100%に調整してください。お使いのブラウザの右上の「•••」もしくは「︙」のアイコンをクリックしてズームの箇所を<strong>100%</strong>に設定するようお願いします（実験にはGoogle ChromeもしくはMicrosoft Edgeのいずれかのブラウザから参加できます）。</p>
  <p><strong>Google Chrome</strong>を使用している場合<br>
  <img src='img/chromeBrowserZoom.png' width=700px>
  </p>
  <p><strong>Microsoft Edge</strong>を使用している場合<br>
    <img src='img/edgeBrowserZoom.png' width=700px>
  <p>
  <p>設定を終えたらEnterキーを押して，次に進んでください。</p>
  </div>`,
  choices: 'enter'
}
timeline.push(setbrowerZoom);

const notice_forcequit = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="width700">
  <p>実験開始前のお知らせ</p>
  <p><ol>
  <li>実験開始前に画面の表示サイズの調整を行いますので，手元にクレジットカード（もしくは，運転免許証，マイナンバーカード，交通系ICカード等）を用意しておいてください（サイズ調整が目的ですので縦53.98mm×横85.60mmのカードであれば何でもかまいません）。</li>
  <li>実験中に指示を逸脱する取り組みが検出された場合には，実験は途中で終了します。その場合には謝礼をお支払いすることはできません。また，実験の途中終了についてのお問い合わせにはお答えできませんので，あらかじめご了承ください。</li>
  </ol></p>
  <p>上記2点に同意いただける方のみ，Enterキーを押して次に進んでください。</p>
  </div>`,
  choices: 'enter'
}
timeline.push(notice_forcequit);

const enter_fullscreen = {
  type: jsPsychFullscreen,
  message:`
  <p>実験はフルスクリーンモードで行います。</p>
  <p>ボタンを押すとフルスクリーンモードに切り替わります。</p>
  `,
  button_label: '進む',
  fullscreen_mode: true
}
timeline.push(enter_fullscreen);

/* browser check */
const browsers_list = ['chrome', 'edge-chromium'];
const browser_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    is_targetBrowser = browsers_list.includes(data.browser);
    is_nonMobile = data.mobile === false;
    return is_targetBrowser && is_nonMobile
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return `
      <p>スマートフォンやタブレットからは参加できません。</p>
      <p>デスクトップPCもしくはノートPCからご参加ください。</p>
      <p>（Escキーでフルスクリーンモードを終了できます）</p>'
      `;
    } else if(!browsers_list.includes(data.browser)){
      return `
      <p>この実験はGoogle Chrome もしくは Microsoft Edge（Chromium版）でのみ参加できます。</p>
      <p>（Escキーでフルスクリーンモードを終了できます）</p>
      `
    }
  },
  on_finish: function(data) {
    data.screen_width = window.screen.width;
    data.screen_height = window.screen.height;
    data.devicePixelRatio = window.devicePixelRatio;
  }
};
timeline.push(browser_check);


