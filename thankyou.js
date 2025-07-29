/* data pipe */
const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: exp_id,
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};
timeline.push(save_data);

/* display verification code */
const thankyou = {
  type: jsPsychSurvey,
  survey_json: {
    showQuestionNumbers: false,
    completeText: '実験を終了する',
    elements:[
      {
        type: 'html',
        html: `
          <div class="width700">
          <p>本日は研究にご参加いただきありがとうございました。</p>
          
          <p>研究参加の報告用コードは <strong>${code}`+`${study_code}</strong> です。<br>
          ランサーズのページより参加報告をしてください。</p>
          <p>「実験を終了する」ボタンを押すと研究を終了します。コードは再表示されませんので正確にメモをするようお願いします。また，このページをスマートフォン等のカメラで写真に撮って保存するようにしてください（トラブルが生じた際に用います）。</p>
          </div>
          `
      },
      {
        type: 'radiogroup',
        title: '以下をご確認の上，チェックしてください。',
        choices: ['報告用コードを正確にメモし，画面の写真も撮りました。'],
        isRequired: true,
      }
    ]
  },
  on_start: function() {
    document.getElementById("jspsych-content").style.transform = "scale(1)";
    // カーソル表示
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'auto';
  }
}
timeline.push(thankyou);

const exit_fullscreen = {
  type: jsPsychFullscreen,
  delay_after: 0,
  fullscreen_mode: false,
};
timeline.push(exit_fullscreen);

const end_of_experiment = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <p>実験にご参加いただきありがとうございました。</p><p>画面を閉じてください</p>`,
  choices: 'NO_KEYS'
};
timeline.push(end_of_experiment);
