/* study description and informed consent */
const study_info = `
  <div class='study-description'>
  <h1>研究説明書</h1>

  <p>以下の説明をお読みいただき，本研究へご協力いただける方は研究参加への同意にチェックマークを入れてお進みください。研究への参加を中止される場合はEscキーでフルスクリーンモードを解除してブラウザを閉じてください。</p>

  <h2>①研究の目的</h2>
  <p>人が今まさに行おうとしていた行動を途中でやめることは心理学において抑制と呼ばれています。この研究は，人の抑制の個人差を調べるより良い方法を開発することを目的としています。</p>

  <h2>②研究の方法</strong></h2>
  <p> この研究では，Webブラウザ上で（1）簡単なアンケートおよび（2）画面の表示に従ってキーを押す課題に取り組んでいただきます。個人によって異なりますが所要時間は15分程度です。

  <h2>③研究に伴う危険性及び不利益について</h2>
  <p>キー押し課題では，モニターを見続けることで目の疲れや肩こりなどの一時的な疲労やストレスを感じる可能性がありますが，身体や精神に長く続く影響が生じる心配はありません。また，万が一負担や不快感などを感じる場合は，あなたの意思で研究への参加をいつでも中止することができます。中止に伴う不利益は一切生じませんが，中止した場合には謝礼をお支払いすることはできません。

  <h2>④研究結果の使われ方</h2>
  <p>研究の結果は将来，学術論文や学会発表などを通じ公表される可能性があります。また，本研究は研究の透明性を高める観点から研究で取得したデータを研究公開用のサイト（https://osf.io/）で公開します。このデータは研究参加者にランダムなIDを付与した上で公開しますので，あなた個人を特定する情報が公になることは一切ありません。

  <h2>⑤個人情報とデータの取り扱い</h2>
  <p>キー押しの課題ではキー押しの反応の有無と反応に要した時間が取得されます。また，アンケート調査では選択された回答が記録され，そのほかにアクセスしているブラウザの種類や画面の解像度等の情報が記録されますが，データは全て匿名で扱われます。研究データは本研究の関係者以外がアクセスできないサーバー上に保管されます。研究期間終了後，5年間保管された後に破棄されます。研究公開用サイトで公開するデータについては，5年目以降も公開を続けるものとします。</p>

  <h2>⑥研究協力の自由及び同意の撤回について</h2>
  <p>研究へ参加するかどうかはあなたの自由な意思で決めることができ，研究への参加は強制されるものではありません。研究へ参加しないことによってあなたが不利益をこうむることは一切ありません。データは匿名で記録される関係で，研究終了後は同意を撤回できないことをご了承ください。</p>

  <h2>⑦実験の途中終了について</h2>
  <p>実験課題の指示に従っていないと考えられる反応が検出された場合に，実験が途中で終了することがあります。この場合には謝礼をお支払いすることはできませんのでご了承ください。また，終了するまでに得られたデータは記録されます。実験の中止基準等に関する質問についてはお答えできません。これらについて，ご了承いただける方のみご参加ください。</p>

  <h2>研究の問い合わせ先</h2>
  <p>本研究の内容に関してご意⾒・ご質問などがございましたら，研究責任者にお尋ね下さい。<br><br>
  連絡先： 愛知学院大学心理学部心理学科 小野島昂洋<br>
  E-mail: onoshima.t@gmail.com
  </div>`;

const ic = {
  type: jsPsychSurvey,
  survey_json: {
    showQuestionNumbers: false,
    completeText: '次へ',
    elements:
      [
        {
          type: 'html',
          html: study_info,
        },
        {
          type: 'radiogroup',
          title: '研究参加への同意の確認',
          name: 'informed_consent',
          choices: [
            '同意する',
            '同意しない'
          ],
          isRequired: true
        }
      ]
  }
}

// exit experiment
const exit = {
  type: jsPsychHtmlKeyboardResponse,
  choices: 'NO_KEYS',
  stimulus: function () {
    document.getElementById("jspsych-content").style.transform = "scale(1)";
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'auto';

    return `
    <p>実験を終了します。</p>
    <p>Escキーを押すとフルスクリーンモードが解除されます
    `;
  }
};

const if_exit = {
  timeline: [exit],
  conditional_function: function() {
    let informed_consent = jsPsych.data.get().last(1).values()[0];
    if (informed_consent.response.informed_consent == '同意しない') {
      return true;
    } else {
      return false;
    }
  }
}

/* data pipe initial*/
const save_init = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: exp_id_init,
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};

const ic_procedure = {
  timeline: [ic, if_exit, save_init],
  randomize_order: false,
};
timeline.push(ic_procedure);

