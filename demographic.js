// 79 - 18 + 1 = 62
const age_list = Array.from({length: 62}, (_, i) => 18 + i)
age_list.push('80以上');
age_list.push('答えない');

const demographic = {
  type: jsPsychSurvey,
  survey_json: {
    showQuestionNumbers: false,
    title: '最後に以下の質問にお答えください',
    completeText: '終了',
    pageNextText: '次へ',
    pagePrevText: '戻る',
    pages: [
      {
        elements: [
          {
            type: 'radiogroup',
            title: '性別',
            name: 'gender',
            choices: ['男性', '女性', 'その他', '答えない'],
            isRequired: true
          },
          {
            type: 'dropdown',
            title: '年齢',
            name: 'age',
            choices: age_list,
            isRequired: true
          },
          {
            type: 'radiogroup',
            title: '利き手',
            name: 'dominant_hand',
            choices: ['右利き', '左利き', '両利き', '答えない'],
            isRequired: true
          },
          {
            type: 'radiogroup',
            title: 'この実験に用いた機器',
            name: 'device',
            choices: ['デスクトップPC', 'ノートPC', 'その他', '答えない'],
            isRequired: true
          },
          {
            type: 'radiogroup',
            title: '実験中に何か問題が生じましたか',
            name: 'trouble',
            choices: ['なかった', '軽微な問題', '重大な問題'],
            isRequired: true
          },
          {
            type: 'comment',
            title: '上の質問で「軽微な問題」か「重大な問題」を選択した方は，生じた問題をなるべく詳しく記入してください。',
            name: 'trouble_content',
            rows: 2,
            autoGrow: true,
            isRequired: false
          }
        ]
      }
    ],
  },
  on_start: function () {
    // カーソル表示
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'auto';
    // resizeを戻す
    document.getElementById("jspsych-content").style.transform = "scale(1)";
  }
};

timeline.push(demographic);
