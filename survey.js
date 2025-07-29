const intro_survey = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
      <p>これからあなた自身についての質問にいくつか答えていただきます。</p>
      `,
  choices: ['enter'],
  prompt: 'Enterキーを押すと次の画面に進みます。',
  on_start: function () {
    // カーソル表示
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'auto';
    // resizeを戻す
    document.getElementById("jspsych-content").style.transform = "scale(1)";
  },
};
timeline.push(intro_survey);

// surveyJSでrowOrder: 'random'にしてもうまく機能しなかったので
// jsPsychの機能で項目順をランダマイズした
const sc_items = jsPsych.randomization.repeat(
  [
    { text: '悪いクセをやめられない', value: 'SC_SC_1' },
    { text: 'だらけてしまう', value: 'SC_SC_2' },
    { text: '場にそぐわないことを言ってしまう', value: 'SC_SC_3' },
    { text: '自分にとってよくないことでも，楽しければやってしまう', value: 'SC_SC_4' },
    { text: '自分にとってよくない誘いは，断る', value: 'SC_SC_5' },
    { text: 'もっと自制心があればよいのにと思う', value: 'SC_SC_6' },
    { text: '誘惑に負けない', value: 'SC_SC_7' },
    { text: '自分に厳しい人だと言われる ', value: 'SC_SC_8' },
    { text: '集中力がない', value: 'SC_SC_9' },
    { text: '先のことを考えて，計画的に行動する ', value: 'SC_SC_10' },
    { text: 'よくないことと知りつつ，やめられない時がある', value: 'SC_SC_11' },
    { text: '他にどういう方法があるか，よく考えずに行動してしまう', value: 'SC_SC_12' },
    { text: '趣味や娯楽のせいで，やるべきことがそっちのけになることがある', value: 'SC_SC_13' },
  ],
  1
);

const upps_items = jsPsych.randomization.repeat(
  [
    {
      text: 'たいていの場合，私は物事を最後までやり抜くことが好きである',
      value: 'UPPS_lackPerseverance_1',
    },
    { text: 'たいていの場合，私は慎重に，意図的に思考している', value: 'UPPS_lackPremeditation_2' },
    {
      text: 'とても機嫌が良い時には，私は問題になりそうな状況に陥りがちである',
      value: 'UPPS_posUrgency_3',
    },
    {
      text: 'やり残しの課題を終えないと，私は本当に気がすまない',
      value: 'UPPS_lackPerseverance_4',
    },
    {
      text: '私は，物事を行う前に立ち止まって考えることが好きだ',
      value: 'UPPS_lackPremeditation_5',
    },
    {
      text: '気分が悪い時には，その時の気分を良くするために，後になって後悔するようなことを，私はしばしばやってしまう',
      value: 'UPPS_negUrgency_6',
    },
    { text: '一度何かに取りかかったら，私はやめるのは嫌だ', value: 'UPPS_lackPerseverance_7' },
    {
      text: '気分が悪い時には，ときどき，たとえ気分をさらに悪くするようなことであっても，私はその時にしていることがやめられない気がする',
      value: 'UPPS_negUrgency_8',
    },
    { text: '私は，リスクをおかすことが本当に楽しい', value: 'UPPS_sensationSeeking_9' },
    { text: 'とても機嫌が良い時には，私は自制心を失う傾向がある', value: 'UPPS_posUrgency_10' },
    { text: '私は，一度始めたことは終わらせる', value: 'UPPS_lackPerseverance_11' },
    {
      text: '私は，物事に対して合理的で「理にかなった」アプローチに価値をおき，そのアプローチに従う傾向がある',
      value: 'UPPS_lackPremeditation_12',
    },
    {
      text: '気分を害した時には，私はしばしば軽はずみな行動をしてしまう',
      value: 'UPPS_negUrgency_13',
    },
    {
      text: 'たとえ少し恐ろしくて型破りなものであったとしても，私は新しくてワクワクさせてくれるような経験と感覚を歓迎する',
      value: 'UPPS_sensationSeeking_14',
    },
    {
      text: '自分が拒絶されたと感じた時に，後になって自分が後悔するようなことを，私はしばしば口にしてしまうことがある',
      value: 'UPPS_negUrgency_15',
    },
    { text: '私は，飛行機の操縦を修得したいと思う', value: 'UPPS_sensationSeeking_16' },
    {
      text: 'とてもワクワクしている時に私がやってしまうことで，他の人たちはショックを受けたり，心配したりする',
      value: 'UPPS_posUrgency_17',
    },
    {
      text: '私は，高い山のゲレンデをすごい速さでスキーで滑る感覚を楽しめると思う',
      value: 'UPPS_sensationSeeking_18',
    },
    { text: '私は，普段，何かを行う前に慎重に考える', value: 'UPPS_lackPremeditation_19' },
    { text: 'とてもワクワクしている時には，私は考えないで行動する傾向がある', value: 'UPPS_posUrgency_20' },
    { text: 'この項目では「4.とても同意する」を選んでください。', value: 'DQ_DQ_1'}
  ],
  1
);

const abis_items = jsPsych.randomization.repeat(
  [
    {text: '私は，何も考えずに物事を進める', value: 'ABIS_motor_2'},
    {text: '私は，考えなしにものを言う', value: 'ABIS_motor_14'},
    {text: '私は，まったく『衝動的』に行動する', value: 'ABIS_motor_17'},
    {text: '私は，突然の衝動にかられて行動する', value: 'ABIS_motor_19'},
    {text: '私は，仕事の計画を入念に立てる', value: 'ABIS_nonPlan_1'},
    {text: '私は，前もって，十分に練った旅行計画を立てる', value: 'ABIS_nonPlan_7'},
    {text: '私は，雇用の安定のために画策する', value: 'ABIS_nonPlan_13'},
    {text: '私は，未来志向である', value: 'ABIS_nonPlan_30'},
    {text: '私は，『細部まで気を配る』ことがない', value: 'ABIS_attention_5'},
    {text: '私は，自制心がある', value: 'ABIS_attention_8'},
    {text: '私にとって，集中することは容易である', value: 'ABIS_attention_9'},
    {text: '私は，じっくりと考える', value: 'ABIS_attention_12'},
    {text: '私は，常に考え方が安定している', value: 'ABIS_attention_20'},
  ],
  1
);

const likert_5point = [
  { value: 1, text: '全くあてはまらない'},
  { value: 2, text: 'あてはまらない'},
  { value: 3, text: 'どちらともいえない'},
  { value: 4, text: 'あてはまる'},
  { value: 5, text: 'とてもあてはまる'},
];

const likert_4point = [
  { value: 1, text: '1.全く同意しない'},
  { value: 2, text: '2.やや同意しない'},
  { value: 3, text: '3.やや同意する'},
  { value: 4, text: '4.とても同意する'},
];

const likert_6point = [
  { value: 1, text: '全くあてはまらない'},
  { value: 2, text: 'あてはまらない'},
  { value: 3, text: 'ややあてはまらない'},
  { value: 4, text: 'ややあてはまる'},
  { value: 5, text: 'あてはまる'},
  { value: 6, text: 'まさにあてはまる'}
];

const survey = {
  type: jsPsychSurvey,
  survey_json: {
    showQuestionNumbers: false,
    title: 'あなた自身について教えてください',
    completeText: '終了',
    pageNextText: '次へ',
    pagePrevText: '戻る',
    pages: [
      {
        // セルフコントロール尺度
        elements: [
          {
            type: 'matrix',
            name: 'self_control',
            title: 'あなたについての質問①',
            titleLocation: 'top',
            description:
              '次のそれぞれの文について，あなたにもっともあてはまるものを1つ選んでください。',
            alternateRows: true,
            isAllRowRequired: true,
            rows: sc_items,
            columns: likert_5point,
          },
        ],
      },
      {
        elements: [
          {
            type: 'matrix',
            name: 'upps',
            title: 'あなたについての質問②',
            description:
              '以下に，人々の行動の仕方と考え方に関して述べられている多くの文があります。それぞれの文に対して，あなたがどれぐらい同意するか，同意しないか示してください。もし，あなたがとても同意する場合は4を，やや同意する場合は3を，やや同意しない場合は2を，全く同意しない場合は1を選択して下さい。以下のすべての文に対して同意するか，同意しないか必ず示してください。',
            alternateRows: true,
            isAllRowRequired: true,
            rows: upps_items,
            columns: likert_4point,
          },
        ]
      },
      {
        elements: [
          {
            type: 'matrix',
            name: 'abis',
            title: 'あなたについての質問③',
            description:
               '次のそれぞれの文について，あなたにもっともあてはまるものを1つ選んでください。',
            alternateRows: true,
            isAllRowRequired: true,
            rows: abis_items,
            columns: likert_6point,
          }
        ]
      },
    ],
  },
};

timeline.push(survey);
