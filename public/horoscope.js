export async function calculateHoroscope(birth, gender){
  const yearMatch=(birth||'').match(/\d{4}/);
  const year=yearMatch?parseInt(yearMatch[0],10):NaN;
  if(!year) return { error: 'Ngày sinh không hợp lệ' };
  const CAN=['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  const CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  const ELEMENT=['Kim','Thủy','Mộc','Hỏa','Thổ'];
  const canIdx=(year+6)%10;
  const chiIdx=(year+8)%12;
  const element=ELEMENT[Math.floor(canIdx/2)];
  const result={
    namCanChi:`${CAN[canIdx]} ${CHI[chiIdx]}`,
    nguHanh:element,
    cuc:`${element} cục`
  };
  try{
    const res=await fetch(`./api/horoscope?birth=${encodeURIComponent(birth)}&gender=${encodeURIComponent(gender)}`);
    if(res.ok){
      const data=await res.json();
      Object.assign(result,data);
    }
  }catch(err){ /* optional API */ }
  return result;
}

export async function fetchChart(name){
  const res=await fetch(`./api/chart?name=${encodeURIComponent(name)}`);
  return await res.json();
}
