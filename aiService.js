// AI service stub - original AI functionality removed.
function analyze(payload) {
  return { message: 'AI disabled', payloadPresent: !!payload };
}
function horoscope(birth, gender) {
  return { message: 'Horoscope AI disabled', birth, gender };
}
module.exports = { analyze, horoscope };
