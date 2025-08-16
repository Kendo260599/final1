import lunar from './lunar.mjs';
import parseDateParts from './parseDateParts.mjs';
const { solarToLunar } = lunar;

const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const CHI_THANG = ['Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi','Tý','Sửu'];

function jdFromDate(dd, mm, yy){
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  return jd;
}

function parseBirth(birth){
  if(!birth) throw new Error('birth required');
  const [datePart,timePart='00:00'] = birth.trim().split('T');
  const { year, month, day } = parseDateParts(datePart);
  const hourRaw = parseInt(timePart.split(':')[0],10);
  const hour = Number.isFinite(hourRaw)?hourRaw:0;
  return {year,month,day,hour};
}

export function computeCanChiAndStars(birth){
  const {year,month,day,hour} = parseBirth(birth);
  const lunarDate = solarToLunar({day,month,year});
  const yearStem = (lunarDate.year + 6) % 10;
  const monthCanIdx = (yearStem*2 + lunarDate.month + 1) % 10;
  const monthChi = CHI_THANG[lunarDate.month-1];
  const monthCanChi = `${CAN[monthCanIdx]} ${monthChi}`;

  const jd = jdFromDate(day,month,year);
  const dayCanIdx = (jd + 9) % 10;
  const dayChiIdx = (jd + 1) % 12;
  const dayCanChi = `${CAN[dayCanIdx]} ${CHI[dayChiIdx]}`;

  const hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const hourCanIdx = (dayCanIdx*2 + hourBranchIdx) % 10;
  const hourCanChi = `${CAN[hourCanIdx]} ${CHI[hourBranchIdx]}`;

  const cungMenhIdx = (lunarDate.month + hourBranchIdx) % 12;
  const cungMenh = CHI[cungMenhIdx];

  const stars = {
    'Tử Vi': CHI[cungMenhIdx],
    'Thiên Phủ': CHI[(cungMenhIdx + 6) % 12]
  };

  return {
    canChi:{month:monthCanChi, day:dayCanChi, hour:hourCanChi},
    stars,
    cungMenh
  };
}

export default { computeCanChiAndStars };
