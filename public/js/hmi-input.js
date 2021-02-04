const slider1 = document.getElementById('range1');
const output1 = document.getElementById('range1-value');
const slider2 = document.getElementById('range2');
const output2 = document.getElementById('range2-value');
const button = document.getElementById('btn');

// Mengubah isi elemen output dengan nilai default
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;

// Mengubah isi elemen output ketika input diberikan pada elemen slider
slider1.oninput = function () {
  output1.innerHTML = this.value;
};

slider2.oninput = function () {
  output2.innerHTML = this.value;
};

button.onclick = function () {
  const topic1 = slider1.id;
  client.publish(topic1, slider1.value, { retain: true });
  console.log('Published', topic1, slider1.value);

  const topic2 = slider2.id;
  client.publish(topic2, slider2.value, { retain: true });
  console.log('Published', topic2, slider2.value);
};
