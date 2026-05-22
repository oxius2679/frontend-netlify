// === MÓDULO DE IA SIMPLE ===
window.AIAssistant = {
  estimateTime(task) {
    const text = (task.name + ' ' + (task.description || '')).toLowerCase();
    let hours = 1;
    if (text.includes('api')) hours += 4;
    if (text.includes('dashboard')) hours += 3;
    if (text.includes('diseño')) hours += 2;
    if (text.includes('integrar')) hours += 2;
    if (text.includes('backend')) hours += 3;
    return hours;
  }
};

// === MODELO ML BÁSICO (TensorFlow.js) ===
window.predictTaskDuration = async function (task) {
  if (!window.durationModel) {
    console.warn('⚠️ Modelo no entrenado, usando predicción heurística');
    return 0;
  }
  const input = tf.tensor2d([
    [task.name.length / 10, (task.description || '').length / 50, task.priority === 'alta' ? 1 : 0]
  ]);
  const output = window.durationModel.predict(input);
  const value = (await output.data())[0];
  input.dispose(); output.dispose();
  return Math.max(1, Math.round(value));
};

window.trainDurationModel = async function () {
  console.log('🚀 Entrenando modelo ML con datos simulados...');
  const xs = tf.tensor2d([[1, 0, 0], [5, 2, 1], [3, 1, 0], [4, 3, 1]]);
  const ys = tf.tensor2d([[2], [6], [3], [7]]);
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  await model.fit(xs, ys, { epochs: 50 });
  window.durationModel = model;
  console.log('✅ Modelo ML entrenado y listo');
};
