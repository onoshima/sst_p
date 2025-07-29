/* instructions */
const instructions = {
  type: jsPsychInstructions,
  pages: [
    '<p>実験にご参加いただきありがとうございます。</p>',
    `<img id="stimulus" src="img/fixation.png" width=150px>
    <p>実験が始まると画面中央に「十字マーク」が表示されます。マークを注視してください。</p>`,
    `<img id="stimulus" src="img/left_arrow.png" width=300px>
    <p>続いて同じ位置に「左向きの矢印」もしくは</p>`,
    `<img id="stimulus" src="img/right_arrow.png" width=300px>
    <p>「右向きの矢印」が表示されます。</p>`,
    `<img id="stimulus" src="img/left_arrow.png" width=300px>
    <p>「左向きの矢印」が表示されたら<br><strong>Fキーをなるべく早く</strong>押してください。`,
    `<img id="stimulus" src="img/right_arrow.png" width=300px>
    <p>「右向きの矢印」が表示されたら<br><strong>Jキーをなるべく早く</strong>押してください。`,
    `<img id="stimulus" src="img/cross.png" width=300px>
    <p>たまに矢印に続いて赤色の「バツ印」が表示されます。<br>
    この場合は<strong>何も押さない</strong>でください。</p>`,
    `<p>バツ印が表示されるのを<strong>待つことはやめてください</strong>。あなたに取り組んで欲しいことは，矢印が出たら対応する方向のキーを可能な限り早く押しつつ，<strong>バツ印が表示された場合にはキーを押さない</strong>ようにすることです。</p>
    <p>`,
    'それでは練習に取り組んでみましょう。'
  ],
  button_label_next: "次へ",
  button_label_previous: "戻る",
  show_clickable_nav: true,
  css_classes: ['instruction']
};
timeline.push(instructions);

const ready = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' '],
  stimulus: `
  <div class="interval">
  <p>左手の人差し指を<strong>Fキー</strong>，右手の人差し指を<strong>Jキー</strong>の上に乗せてください。</p>
  <p>スペースキーを押すと実験が始まります。
  `,
  on_start: function(){
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'none';
  }
};
timeline.push(ready);

/* parameters */
let counter = 0;
let block_counter = 1;
let practice_counter = 1;
let practice_finished = false;
const num_trials_per_block = 40; //40;
const num_block = 5;
const num_trials_practice = 24;
const max_rt = 2000;
const fixation_duration = 500;
const longest_stop_signal_delay = max_rt - fixation_duration - 50;
let total_num = num_trials_per_block * num_block;
let stop_signal_delay = 100; // initial value of practice block
let stop_signal_delay_initial = 300; // initial value of test block
let stopNum_criterion_finishPractice = 2;  // 1 when debugging -1
let accuracy_criterion_finishPractice = 0.75;  // 0.75 when debugging -1

const fixation_size = 100;  // 1cm
const go_stimuli = ['right', 'left'];
const trials_array = ['go', 'go', 'go', 'stop'];
const right_arrow_path = 'img/right_arrow.png';
const left_arrow_path = 'img/left_arrow.png';
const stop_signal_path = 'img/cross.png';

function random_iti() {
  let iti = jsPsych.randomization.sampleExponential(0.002) + 500;
  return iti
}

/* define stimuli array for practice */

let practice_stimuli = jsPsych.randomization.factorial(
  {
    stimulus: go_stimuli,
    trial: trials_array,
  },
  num_trials_practice / 8
);
practice_stimuli.map((x) => (x['block'] = 'practice'));
for (let i = 0; i < practice_stimuli.length; i++) {
  if (practice_stimuli[i].stimulus == 'right') {
    practice_stimuli[i].correct_key = 'j';
    practice_stimuli[i].stimulus_path = right_arrow_path;
  } else {
    practice_stimuli[i].correct_key = 'f';
    practice_stimuli[i].stimulus_path = left_arrow_path;
  }
  if (practice_stimuli[i].trial == 'go') {
    practice_stimuli[i].stop_signal_start = max_rt;
  } else { // stop trials
    practice_stimuli[i].stop_signal_start = fixation_duration;
  }
  practice_stimuli[i].iti = random_iti();
};

/* define stimuli array for test */

let test_stimuli_all = [];
for (let j = 1; j < num_block + 1; j++) {
  let test_stimuli_block = jsPsych.randomization.factorial(
    {
      stimulus: go_stimuli,
      trial: trials_array,
    },
    num_trials_per_block / 8
  );
  test_stimuli_block.map((x) => (x['block'] = j));
  test_stimuli_all = test_stimuli_all.concat(test_stimuli_block);
}

for (let i = 0; i < test_stimuli_all.length; i++) {
  if (test_stimuli_all[i].stimulus == 'right') {
    test_stimuli_all[i].correct_key = 'j';
    test_stimuli_all[i].stimulus_path = right_arrow_path;
  } else {
    test_stimuli_all[i].correct_key = 'f';
    test_stimuli_all[i].stimulus_path = left_arrow_path;
  }
  if (test_stimuli_all[i].trial == 'go') {
    test_stimuli_all[i].stop_signal_start = max_rt;
  } else { // stop trial
    test_stimuli_all[i].stop_signal_start = fixation_duration;
  }
  test_stimuli_all[i].iti = random_iti();
}

const fixation = {
  obj_type: 'cross',
  line_length: fixation_size,
  line_width: 10,
  show_end_time: fixation_duration,
};

const stimulus_go = {
  obj_type: 'image',
  file: jsPsych.timelineVariable('stimulus_path'),
  image_width: 300,
  show_start_time: fixation_duration,
  show_end_time: function () {
    return jsPsych.timelineVariable('stop_signal_start') + stop_signal_delay;
  },
};

const stimulus_stop = {
  obj_type: 'image',
  file: 'img/cross.png',
  image_width: 300,
  show_start_time: function () {
    return jsPsych.timelineVariable('stop_signal_start') + stop_signal_delay;
  },
};

/* define test trials */
var test = {
  type: jsPsychPsychophysics,
  stimuli: [fixation, stimulus_go, stimulus_stop],
  choices: ['f', 'j'],
  canvas_width: 1200,  // 12cm
  canvas_height: 600,  // 6cm
  background_color: '#FFFFFF',
  trial_duration: max_rt,
  post_trial_gap: jsPsych.timelineVariable('iti'),
  on_finish: function (data) {
    if (data.rt == null) {
      data.rt_from_onset = null;
    } else {
      data.rt_from_onset = data.rt - fixation_duration;
    }
    data.stimulus = jsPsych.timelineVariable('stimulus');
    data.trial = jsPsych.timelineVariable('trial');
    data.block = jsPsych.timelineVariable('block');
    //console.log(data);

    if (jsPsych.timelineVariable('trial') == 'stop') {
      data.stop_signal_delay = stop_signal_delay;

      // tracking procedure
      if (!data.response) {  // no response is correct
        stop_signal_delay = stop_signal_delay + 50;
        if (stop_signal_delay > longest_stop_signal_delay) {
          stop_signal_delay = longest_stop_signal_delay;
        }
        data.correct = true;
      } else {
        stop_signal_delay = stop_signal_delay - 50;
        if (stop_signal_delay <= 50) {
          stop_signal_delay = 50;
        }
        data.correct = false;
      }
    } else {  // go trial
      if (jsPsych.pluginAPI.compareKeys(data.response, jsPsych.timelineVariable('correct_key'))) {
        data.correct = true;
      } else {
        data.correct = false;
      }
    }
    data.practice_block = practice_counter;
    counter += 1;
    // console.log(counter);
  },
};

// cancel experiment
let does_force_quit = false;

const forceQuit = {
  type: jsPsychHtmlKeyboardResponse,
  choices: 'NO_KEYS',
  stimulus: function () {
    document.getElementById("jspsych-content").style.transform = "scale(1)";
    let content_wrapper = document.querySelector('.jspsych-content-wrapper');
    content_wrapper.style.cursor = 'auto';
    return `
    <p>課題の指示を逸脱する反応が検出されたため，実験を途中で終了します。</p>
    <p>Escキーを押すとフルスクリーンモードが解除されます。<br>
    ブラウザを閉じてください。</p>
    `;
  }
};

const save_dropout = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "dwnSeB1VPQ7Q",
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};

const forceQuit_if = {
  timeline: [save_dropout, forceQuit],
  conditional_function: function() {
    let last_block = jsPsych.data.get().filter({
      block: block_counter,
    });
    // criterion 1: too fast reaction time
    let rt_avg = last_block.select('rt_from_onset').mean();
    let is_tooFast = rt_avg < 200;

    // criterion 2: too inaccurate for go trials
    let num_trials_go = last_block.filter({trial: 'go'}).count();
    let num_trials_go_correct = last_block.filter({trial: 'go', correct: true}).count();
    let is_tooInaacurate = (num_trials_go_correct / num_trials_go) < .70;

    // criterion 3: no successful stops
    let num_successful_stops = last_block.filter({trial:'stop', correct: true}).count();
    let no_successful_stops = num_successful_stops == 0;

    // criterion 4: no go responses
    let num_go_omission = last_block.filter({trial: 'go', response: null}).count();
    let no_go_responses = (num_go_omission / num_trials_go) > .80;

    if (is_tooFast && is_tooInaacurate && no_successful_stops) {
      does_force_quit = true;
    } else if (no_go_responses) {
      does_force_quit = true;
    }

    if (does_force_quit)
      return true;
    else {
      return false;
    }
  }
};


const rest = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' '],
  stimulus: function () {
    let last_block = jsPsych.data.get().filter({
      block: block_counter,
    });

    let go_last_block = last_block.filter({trial: 'go',});
    let num_omission_go = go_last_block.filter({ response: null }).count();
    
    let rt_avg = Math.round(go_last_block.select('rt_from_onset').mean());
    let progress = Math.round((counter / total_num) * 100);

    let stop_last_block = last_block.filter({trial: 'stop',});
    let num_stops = stop_last_block.count();
    let num_successful_stops = stop_last_block.filter({correct: true}).count();
    let successful_stop_percent = Math.round(num_successful_stops / num_stops * 100);
    
    return `
    <div class='interval'>
    <p>休憩です。全体の${progress}%が終わりました。</p>
    <p>この課題は，左向きの矢印が出たら<strong>Fキー</strong>，右向きの矢印が出たら<strong>Jキー</strong>を可能な限り早く押し，バツ印が表示された場合には<strong>キーを押さない</strong>ようにするものです。バツ印を待つことはしないようにしてください。</p>

    <p>キーを押すべき試行で，あなたの平均反応時間は<strong>${rt_avg}ミリ秒</strong>でした。キーを押すべき試行で，あなたは<strong>${num_omission_go}回</strong>キーを押しそこねました（この数字は0に近いほど望ましいです）。キー押しを止めるべき試行（バツ印の試行）で，あなたは<strong>${successful_stop_percent}%</strong>キー押しを止めました（課題を通じて難易度が変化しますので，50%に近い値をとることが想定されています）。
    <p>実験への参加を途中でやめたい場合にはEscキーでフルスクリーンモードを解除してブラウザを閉じてください。
    <p><strong>スペースキーを押すと実験を再開します。</strong></p>
    </div>`;
  },
  on_finish: function () {
    block_counter += 1;
  },
};

const rest_if = {
  timeline: [forceQuit_if, rest],
  conditional_function: function () {
    if (counter % num_trials_per_block == 0 && counter != total_num) {
      return true;
    } else {
      return false;
    }
  },
};

const practice_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' '],
  stimulus: function () {
    // go trials
    let go_trials = jsPsych.data.get().filter({
      block: 'practice',
      trial: 'go',
      practice_block: practice_counter
    });

    let accuracy_go = Math.round(go_trials.select('correct').mean());

    // stop trials
    let stop_trials = jsPsych.data.get().filter({
      block: 'practice',
      trial: 'stop',
      practice_block: practice_counter
    });

    let num_successful_stops = stop_trials.filter({correct: true}).count();
    let end_practice_message = 'もう少し練習を続けてみましょう。';

    if (num_successful_stops > stopNum_criterion_finishPractice && accuracy_go > accuracy_criterion_finishPractice) {
      practice_finished = true;
      end_practice_message = '練習試行を終了して，本番を開始します。';
    }

    practice_counter += 1;

    return `
    <div class='interval'>

    <p>この課題は，左向きの矢印が出たら<strong>Fキー</strong>，右向きの矢印が出たら<strong>Jキー</strong>を可能な限り早く押し，バツ印が表示された場合には<strong>キーを押さない</strong>ようにするものです。バツ印を待つことはしないようにしてください。</p>

    <p>実験への参加を途中でやめたい場合にはEscキーでフルスクリーンモードを解除してブラウザを閉じてください。
    <p><strong>${end_practice_message}</strong><br>スペースキーで再開します。</p>
    </div>`;
  }
};


/* define practice procedure */
const if_node_endPractice = {
  timeline: [practice_feedback],
  conditional_function: function() {
    if (!practice_finished & counter % num_trials_practice == 0)
      return true;
    else {
      return false;
    }
  }
};

const practice_block = {
  timeline: [test, if_node_endPractice],
  timeline_variables: practice_stimuli,
  repetitions: 1,
  randomize_order: true,
};

const loop_node = {
  timeline: [practice_block],
  loop_function: function () {
    if (!practice_finished) {
      return true;
    } else {
      counter = 0;  // reset counter before test trial
      stop_signal_delay = stop_signal_delay_initial // set initial value for test block
      practice_counter = null;
      return false;
    }
  },
};
timeline.push(loop_node);

/* define test procedure */

timeline.push(ready);
const test_procedure = {
  timeline: [test, rest_if],
  timeline_variables: test_stimuli_all,
  repetitions: 1,
  randomize_order: false
};
timeline.push(test_procedure);
