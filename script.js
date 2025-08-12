/* ====== Danh sách Phường/Xã mới (95 đơn vị) tách theo Tỉnh ====== */
/* 55 đơn vị thuộc Đồng Nai (theo thứ tự bạn cung cấp: 1..15, 24..63) */
const DN_WARDS_2025 = [
  // Đồng Nai
  'Phường Trấn Biên','Phường Biên Hòa','Phường Tam Hiệp','Phường Long Bình','Phường Hố Nai','Phường Trảng Dài','Phường Long Hưng','Phường Phước Tân','Phường Tam Phước','Phường Tân Triều',
  'Phường Long Khánh','Phường Bảo Vinh','Phường Xuân Lập','Phường Hàng Gòn','Phường Bình Lộc',
  'Xã Trị An','Xã Tân An','Xã Phú Lý',
  'Xã Trảng Bom','Xã An Viễn','Xã Bàu Hàm','Xã Bình Minh','Xã Hưng Thịnh',
  'Xã Dầu Giây','Xã Gia Kiệm','Xã Thống Nhất',
  'Xã La Ngà','Xã Định Quán','Xã Phú Hòa','Xã Thanh Sơn','Xã Phú Vinh',
  'Xã Tân Phú','Xã Phú Lâm','Xã Tà Lài','Xã Nam Cát Tiên','Xã Đak Lua',
  'Xã Xuân Lộc','Xã Xuân Hòa','Xã Xuân Phú','Xã Xuân Thành','Xã Xuân Định','Xã Xuân Bắc',
  'Xã Cẩm Mỹ','Xã Sông Ray','Xã Xuân Đông','Xã Xuân Quế','Xã Xuân Đường',
  'Xã Long Thành','Xã Phước Thái','Xã Long Phước','Xã Bình An','Xã An Phước',
  'Xã Nhơn Trạch','Xã Đại Phước','Xã Phước An'
];

/* 40 đơn vị thuộc Bình Phước (16..23, 64..95) */
const BP_WARDS_2025 = [
  'Phường Bình Phước','Phường Đồng Xoài','Phường Phước Bình','Phường Phước Long','Phường Bình Long','Phường An Lộc','Phường Minh Hưng','Phường Chơn Thành',
  'Xã Nha Bích','Xã Tân Quan','Xã Tân Hưng','Xã Tân Khai','Xã Minh Đức',
  'Xã Lộc Thành','Xã Lộc Ninh','Xã Lộc Hưng','Xã Lộc Tấn','Xã Lộc Thạnh','Xã Lộc Quang',
  'Xã Tân Tiến','Xã Thiện Hưng','Xã Hưng Phước','Xã Phú Nghĩa','Xã Đa Kia','Xã Đăk Ơ','Xã Bù Gia Mập',
  'Xã Bình Tân','Xã Long Hà','Xã Phú Riềng','Xã Phú Trung',
  'Xã Thuận Lợi','Xã Đồng Tâm','Xã Tân Lợi','Xã Đồng Phú',
  'Xã Phước Sơn','Xã Nghĩa Trung','Xã Bù Đăng','Xã Thọ Sơn','Xã Đak Nhau','Xã Bom Bo'
];

/* ====== Issues (50+) – giữ nguyên từ bản trước ====== */
const ISSUES = [
  {id:'hospital',cat:'Ngoại cảnh',label:'Đối diện/gần Bệnh viện',impact:'Âm khí, ảnh hưởng sức khỏe.',remedy:'Cây xanh, ánh sáng ấm, rèm dày; bình phong; cân nhắc Bát Quái lồi.'},
  {id:'cemetery',cat:'Ngoại cảnh',label:'Gần nghĩa trang/nhà tang lễ',impact:'Âm khí nặng, khó tụ tài.',remedy:'Hàng rào kín, cây tán dày, đèn ấm; hạn chế cửa nhìn thẳng.'},
  {id:'crematorium',cat:'Ngoại cảnh',label:'Gần lò hỏa táng',impact:'Ám khí, bất an.',remedy:'Che chắn mạnh (cây, tường), nước + đá cân bằng.'},
  {id:'temple',cat:'Ngoại cảnh',label:'Đối diện Chùa',impact:'Khí tĩnh/âm, giảm tài khí.',remedy:'Quan Công gần cửa, chuông gió kim loại.'},
  {id:'church',cat:'Ngoại cảnh',label:'Đối diện Nhà thờ',impact:'Khí tĩnh, giờ lễ ồn.',remedy:'Bình phong, rèm dày, dùng cửa phụ.'},
  {id:'school',cat:'Ngoại cảnh',label:'Đối diện Trường học',impact:'Ồn, khí động mạnh.',remedy:'Vách ngăn, rèm cách âm.'},
  {id:'market',cat:'Ngoại cảnh',label:'Sát chợ/siêu thị ồn',impact:'Khí tạp.',remedy:'Cửa 2 lớp, cây “lọc khí”.'},
  {id:'gas',cat:'Ngoại cảnh',label:'Gần trạm xăng/kho gas',impact:'Hỏa khí, nguy cơ cháy nổ.',remedy:'Khoảng cách an toàn, tường chống cháy.'},
  {id:'transformer',cat:'Ngoại cảnh',label:'Gần trạm biến áp',impact:'Từ trường, ồn.',remedy:'Lùi cổng/cửa, tường đặc, cây cao.'},
  {id:'pylon',cat:'Ngoại cảnh',label:'Cột điện trước cổng',impact:'Sát khí, cản khí.',remedy:'Lùi cổng, cây cao, bình phong.'},
  {id:'bts',cat:'Ngoại cảnh',label:'Cột BTS/anten',impact:'Từ trường, thị giác xấu.',remedy:'Che chắn cây, mái.'},
  {id:'deadend',cat:'Ngoại cảnh',label:'Hẻm cụt',impact:'Khí bí, đọng xấu.',remedy:'Đèn sáng, cây/đá/nước đầu nhà.'},
  {id:'T_cross',cat:'Ngoại cảnh',label:'Ngã ba chữ T đâm thẳng',impact:'Trực sát.',remedy:'Bình phong, bậc cấp gãy dòng.'},
  {id:'Y_cross',cat:'Ngoại cảnh',label:'Ngã ba chữ Y',impact:'Khí loạn.',remedy:'Cổng kín, hiên che, cây đệm.'},
  {id:'crossroad',cat:'Ngoại cảnh',label:'Ngã tư lớn/cao tốc',impact:'Khí động mạnh, bụi.',remedy:'Lam chắn gió, kính cách âm.'},
  {id:'curve_blade',cat:'Ngoại cảnh',label:'Đường cong “lưỡi đao”',impact:'Hình sát chém.',remedy:'Bình phong, tường cong mềm.'},
  {id:'rail',cat:'Ngoại cảnh',label:'Sát đường tàu',impact:'Rung, ồn, xung khí.',remedy:'Chống ồn/rung, công năng ngủ lùi sâu.'},
  {id:'underbridge',cat:'Ngoại cảnh',label:'Dưới chân cầu',impact:'Thiếu sáng, áp lực.',remedy:'Tăng sáng, màu ấm.'},
  {id:'slope',cat:'Ngoại cảnh',label:'Đường dốc trước nhà',impact:'Khí trượt khó tụ.',remedy:'Bậc thềm, bồn cây bậc cấp.'},
  {id:'lowfloor',cat:'Ngoại cảnh',label:'Nền thấp hơn đường',impact:'Ngập, khí xấu tràn.',remedy:'Nâng cốt nền, rãnh thoát nước.'},
  {id:'highfloor',cat:'Ngoại cảnh',label:'Nền quá cao',impact:'Khó dẫn khí, dốc nguy.',remedy:'Bậc thoải, tiểu cảnh mềm.'},
  {id:'sharpcorner',cat:'Ngoại cảnh',label:'Góc nhọn chĩa vào',impact:'Hình sát đâm.',remedy:'Cây/bình phong che.'},
  {id:'river_back',cat:'Ngoại cảnh',label:'Sông/hồ phía sau',impact:'Thủy sau nhà bất ổn.',remedy:'Hàng rào, cây, hạn chế cửa lớn.'},
  {id:'polluted',cat:'Ngoại cảnh',label:'Mương/cống ô nhiễm',impact:'Uế khí.',remedy:'Che kín, xử lý mùi.'},
  {id:'streetlight',cat:'Ngoại cảnh',label:'Đèn đường rọi cửa',impact:'Quang sát.',remedy:'Rèm dày, lam che.'},
  // … (các mục nhóm Lô đất, Cửa-khí, Kết cấu, Bếp, WC/Ngủ, Bàn thờ, Khác) đã đủ tổng 50+ ở bản trước
  {id:'lot_triangle',cat:'Lô đất',label:'Đất hình tam giác',impact:'Khó tụ tài.',remedy:'Cắt góc/tiểu cảnh.'},
  {id:'door_back',cat:'Cửa & khí',label:'Cửa trước thẳng cửa sau',impact:'Thoát khí.',remedy:'Bình phong, đổi lệch cửa.'},
  {id:'beam_over',cat:'Kết cấu',label:'Xà ngang đè giường',impact:'Áp khí.',remedy:'Trần giả/đổi vị trí.'},
  {id:'sink_stove',cat:'Bếp',label:'Bồn rửa sát/đối bếp',impact:'Thủy–Hỏa xung.',remedy:'Cách 60–80cm, vật trung gian.'},
  {id:'wc_center',cat:'WC/Ngủ',label:'WC trung cung',impact:'Uế giữa nhà.',remedy:'Dời vị trí.'},
    {id:'altar_back_wc',cat:'Bàn thờ',label:'Bàn thờ tựa WC',impact:'Uế sát.',remedy:'Cách tường kỹ thuật/di dời.'},
  {id:'lot_L',cat:'Lô đất',label:'Đất hình chữ L',impact:'Khuyết góc, khí phân tán.',remedy:'Xây bù góc, làm sân vườn cân bằng.'},
  {id:'lot_trapezoid',cat:'Lô đất',label:'Đầu to đuôi nhỏ',impact:'Tài tán về sau.',remedy:'Tường rào, cây chắn phía sau.'},
  {id:'lot_front_narrow',cat:'Lô đất',label:'Mặt tiền hẹp, hậu rộng',impact:'Khó đón khí.',remedy:'Mở rộng cổng, dẫn khí.'},
  {id:'lot_cut_road',cat:'Lô đất',label:'Đường cắt ngang lô',impact:'Khí chia đôi.',remedy:'Hàng rào kín, bố trí lối đi lệch.'},
  {id:'door_stair',cat:'Cửa & khí',label:'Cửa chính thẳng cầu thang',impact:'Khí xộc thẳng lên trên.',remedy:'Bình phong, chiếu nghỉ.'},
  {id:'door_corner',cat:'Cửa & khí',label:'Cửa chính đặt góc xiên',impact:'Khí vào không ổn định.',remedy:'Sửa cửa vuông, che chắn.'},
  {id:'door_wc',cat:'Cửa & khí',label:'Cửa chính đối cửa WC',impact:'Uế khí xộc vào.',remedy:'Đổi hướng cửa, bình phong.'},
  {id:'door_pillar',cat:'Cửa & khí',label:'Cửa bị cột đâm vào',impact:'Trực sát.',remedy:'Bố trí cây, gương Bát Quái.'},
  {id:'pillar_center',cat:'Kết cấu',label:'Cột giữa nhà',impact:'Cản trở lưu thông khí.',remedy:'Che cột, bố trí nội thất hợp lý.'},
  {id:'stair_center',cat:'Kết cấu',label:'Cầu thang giữa nhà',impact:'Khí xoáy, hao tài.',remedy:'Tiểu cảnh, chắn gió chân thang.'},
  {id:'split_floor',cat:'Kết cấu',label:'Sàn nhà nứt tách',impact:'Khí suy, thấm nước.',remedy:'Sửa chữa, lát lại.'},
  {id:'roof_leak',cat:'Kết cấu',label:'Mái dột',impact:'Thủy khí xấu, hư hại.',remedy:'Chống thấm, thay ngói.'},
  {id:'stove_beam',cat:'Bếp',label:'Bếp dưới xà',impact:'Áp khí, hao tài.',remedy:'Làm trần giả, dời bếp.'},
  {id:'stove_door',cat:'Bếp',label:'Bếp nhìn thẳng cửa',impact:'Thoát khí, mất lộc.',remedy:'Đổi hướng bếp, rèm che.'},
  {id:'stove_window',cat:'Bếp',label:'Bếp dưới cửa sổ',impact:'Gió dập lửa, tán khí.',remedy:'Đổi vị trí, che kín.'},
  {id:'wc_above_kitchen',cat:'WC/Ngủ',label:'WC trên bếp',impact:'Uế khí xuống bếp.',remedy:'Không đặt, hoặc chống thấm tốt.'},
  {id:'wc_above_bed',cat:'WC/Ngủ',label:'WC trên phòng ngủ',impact:'Ảnh hưởng sức khỏe.',remedy:'Dời WC hoặc giường.'},
  {id:'bed_mirror',cat:'WC/Ngủ',label:'Giường đối gương',impact:'Nhiễu khí, mất ngủ.',remedy:'Che gương hoặc đổi hướng.'},
  {id:'bed_window',cat:'WC/Ngủ',label:'Giường sát cửa sổ',impact:'Khí lạnh, thiếu an toàn.',remedy:'Kê giường tránh cửa, rèm dày.'},
  {id:'altar_under_beam',cat:'Bàn thờ',label:'Bàn thờ dưới xà',impact:'Áp sát, bất kính.',remedy:'Làm trần che, dời bàn thờ.'},
  {id:'altar_window',cat:'Bàn thờ',label:'Bàn thờ trước cửa sổ',impact:'Gió tán hương.',remedy:'Đóng kín, đổi vị trí.'},
  {id:'mirror_door',cat:'Khác',label:'Gương chiếu thẳng cửa',impact:'Tán khí, giật mình.',remedy:'Đặt lệch, che gương.'},
  {id:'clock_dead',cat:'Khác',label:'Đồng hồ chết',impact:'Trì trệ thời vận.',remedy:'Sửa hoặc bỏ đồng hồ.'},
  {id:'tree_dry',cat:'Khác',label:'Cây khô trước nhà',impact:'Âm khí, xui rủi.',remedy:'Chặt bỏ, trồng cây mới.'}
];

/* ====== La bàn số ====== */
let compassActive=false, orientationHandler=null;
const degNormalize=x=>{x=x%360; return x<0?x+360:x;};
function degreeToDirection(deg){
  const d=degNormalize(deg);
  if(d>=337.5||d<22.5) return 'Bắc';
  if(d<67.5) return 'Đông Bắc';
  if(d<112.5) return 'Đông';
  if(d<157.5) return 'Đông Nam';
  if(d<202.5) return 'Nam';
  if(d<247.5) return 'Tây Nam';
  if(d<292.5) return 'Tây';
  return 'Tây Bắc';
}
function updateCompassUI(deg){
  const offset=parseFloat(document.getElementById('compass-offset').value||'0')||0;
  const show=degNormalize(deg+offset);
  document.getElementById('compass-deg').textContent=show.toFixed(0);
  document.getElementById('compass-dir').textContent=degreeToDirection(show);
  document.getElementById('needle').style.transform=`translate(-50%,-100%) rotate(${show}deg)`;
}
async function startCompass(){
  const status=document.getElementById('compass-status');
  try{
    if(!('DeviceOrientationEvent' in window)){ status.textContent='Thiết bị không hỗ trợ la bàn.'; return; }
    if(typeof DeviceOrientationEvent.requestPermission==='function'){
      const perm=await DeviceOrientationEvent.requestPermission();
      if(perm!=='granted'){ status.textContent='Chưa được cấp quyền cảm biến.'; return; }
    }
    orientationHandler=e=>{
      let heading=null;
      if(typeof e.webkitCompassHeading==='number'&&!isNaN(e.webkitCompassHeading)){ heading=e.webkitCompassHeading; }
      else if(typeof e.alpha==='number'){ heading=360 - e.alpha; }
      if(heading!=null) updateCompassUI(heading);
    };
    window.addEventListener('deviceorientation',orientationHandler,true);
    compassActive=true; status.textContent='Đang đo… giữ máy song song mặt đất & lắc hình số 8 để hiệu chuẩn.';
  }catch(err){ status.textContent='Lỗi la bàn: '+(err.message||err); }
}
function stopCompass(){
  if(orientationHandler){ window.removeEventListener('deviceorientation',orientationHandler,true); orientationHandler=null; }
  compassActive=false; document.getElementById('compass-status').textContent='Đã dừng.';
}
function applyCompassToDirection(){
  const deg=parseFloat(document.getElementById('compass-deg').textContent);
  if(isNaN(deg)) return alert('Chưa có dữ liệu la bàn.');
  document.getElementById('huong-nha').value=degreeToDirection(deg);
  alert('Đã gán hướng nhà = '+degreeToDirection(deg));
}

/* ====== Phong thủy cốt lõi: cung mệnh, bát trạch, cảnh báo ====== */
function parseDateParts(s){ if(!s||typeof s!=='string') throw new Error('Ngày sinh không hợp lệ'); s=s.trim(); const sep=s.includes('-')?'-':(s.includes('/')?'/':null); if(!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/"'); const a=s.split(sep).map(x=>parseInt(x,10)); if(a.length!==3||a.some(isNaN)) throw new Error('Định dạng ngày không đúng'); if(a[0]>31) return {year:a[0],month:a[1],day:a[2]}; return {year:a[2],month:a[1],day:a[0]}; }
function calculateNumerology(birth){
  const {year,month,day}=parseDateParts(birth);
  const sumDigits=n=>n.toString().split('').reduce((a,b)=>a+parseInt(b,10),0);
  let total=sumDigits(day)+sumDigits(month)+sumDigits(year);
  while(total>9 && total!==11 && total!==22 && total!==33){ total=sumDigits(total); }
  const meanings={
    1:'Lãnh đạo, độc lập, tiên phong.',
    2:'Hài hòa, hợp tác.',
    3:'Sáng tạo, lạc quan.',
    4:'Kỷ luật, nền tảng vững.',
    5:'Tự do, thay đổi.',
    6:'Trách nhiệm, yêu thương.',
    7:'Tri thức, phân tích.',
    8:'Tham vọng, thành công vật chất.',
    9:'Nhân đạo, lý tưởng.',
    11:'Trực giác mạnh, tâm linh.',
    22:'Kiến tạo lớn, thực tế.',
    33:'Phụng sự vô điều kiện.'
  };
  return {number:total,meaning:meanings[total]||''};
}
function getEffectiveBirthYear(b){ const {year,month,day}=parseDateParts(b); if(month<3||(month===3&&day<=13)) return year-1; return year; }
const MALE_START=1921, FEMALE_START=1922;
const MALE_SEQ=['Đoài','Càn','Khôn','Tốn','Chấn','Khôn','Khảm','Ly','Cấn']; const FEMALE_SEQ=['Cấn','Khảm','Ly','Tốn','Chấn','Khôn','Càn','Đoài','Cấn']; const mod9=n=>((n%9)+9)%9;
function getCungMenh(birth,gender){
  const eff=getEffectiveBirthYear(birth);
  const idx=mod9(eff-(gender==='nam'?MALE_START:FEMALE_START));
  const cung=(gender==='nam'?MALE_SEQ:FEMALE_SEQ)[idx];
  const info={'Càn':{nguyenTo:'Kim',huong:'Tây Bắc'},'Khôn':{nguyenTo:'Thổ',huong:'Tây Nam'},'Cấn':{nguyenTo:'Thổ',huong:'Đông Bắc'},'Chấn':{nguyenTo:'Mộc',huong:'Đông'},'Tốn':{nguyenTo:'Mộc',huong:'Đông Nam'},'Ly':{nguyenTo:'Hỏa',huong:'Nam'},'Khảm':{nguyenTo:'Thủy',huong:'Bắc'},'Đoài':{nguyenTo:'Kim',huong:'Tây'}}[cung];
  const nhom=['Khảm','Ly','Chấn','Tốn'].includes(cung)?'Đông Tứ Trạch':'Tây Tứ Trạch';
  return {effectiveYear:eff,cung,nhomTrach:nhom,...info};
}
function getBatTrachForCung(cung){
  const C={good:{'Sinh Khí':{ten:'Sinh Khí',loai:'good',y:'Tài lộc, thăng tiến.'},'Thiên Y':{ten:'Thiên Y',loai:'good',y:'Sức khỏe, quý nhân.'},'Diên Niên':{ten:'Diên Niên',loai:'good',y:'Hòa thuận.'},'Phục Vị':{ten:'Phục Vị',loai:'good',y:'Ổn định, học hành.'}},
           bad:{'Tuyệt Mệnh':{ten:'Tuyệt Mệnh',loai:'bad',y:'Nặng nhất.'},'Ngũ Quỷ':{ten:'Ngũ Quỷ',loai:'bad',y:'Thị phi.'},'Lục Sát':{ten:'Lục Sát',loai:'bad',y:'Kiện tụng.'},'Họa Hại':{ten:'Họa Hại',loai:'bad',y:'Xui xẻo.'}}};
  const B={'Khảm':{'Đông Nam':C.good['Sinh Khí'],'Đông':C.good['Thiên Y'],'Nam':C.good['Diên Niên'],'Bắc':C.good['Phục Vị'],'Tây Nam':C.bad['Tuyệt Mệnh'],'Đông Bắc':C.bad['Ngũ Quỷ'],'Tây Bắc':C.bad['Lục Sát'],'Tây':C.bad['Họa Hại']},
           'Ly':{'Đông':C.good['Sinh Khí'],'Đông Nam':C.good['Thiên Y'],'Bắc':C.good['Diên Niên'],'Nam':C.good['Phục Vị'],'Tây Bắc':C.bad['Tuyệt Mệnh'],'Tây':C.bad['Ngũ Quỷ'],'Tây Nam':C.bad['Lục Sát'],'Đông Bắc':C.bad['Họa Hại']},
           'Chấn':{'Nam':C.good['Sinh Khí'],'Bắc':C.good['Thiên Y'],'Đông Nam':C.good['Diên Niên'],'Đông':C.good['Phục Vị'],'Tây':C.bad['Tuyệt Mệnh'],'Tây Bắc':C.bad['Ngũ Quỷ'],'Đông Bắc':C.bad['Lục Sát'],'Tây Nam':C.bad['Họa Hại']},
           'Tốn':{'Bắc':C.good['Sinh Khí'],'Nam':C.good['Thiên Y'],'Đông':C.good['Diên Niên'],'Đông Nam':C.good['Phục Vị'],'Đông Bắc':C.bad['Tuyệt Mệnh'],'Tây Nam':C.bad['Ngũ Quỷ'],'Tây':C.bad['Lục Sát'],'Tây Bắc':C.bad['Họa Hại']},
           'Càn':{'Tây':C.good['Sinh Khí'],'Đông Bắc':C.good['Thiên Y'],'Tây Nam':C.good['Diên Niên'],'Tây Bắc':C.good['Phục Vị'],'Nam':C.bad['Tuyệt Mệnh'],'Đông':C.bad['Ngũ Quỷ'],'Bắc':C.bad['Lục Sát'],'Đông Nam':C.bad['Họa Hại']},
           'Khôn':{'Đông Bắc':C.good['Sinh Khí'],'Tây':C.good['Thiên Y'],'Tây Bắc':C.good['Diên Niên'],'Tây Nam':C.good['Phục Vị'],'Bắc':C.bad['Tuyệt Mệnh'],'Đông Nam':C.bad['Ngũ Quỷ'],'Nam':C.bad['Lục Sát'],'Đông':C.bad['Họa Hại']},
           'Cấn':{'Tây Nam':C.good['Sinh Khí'],'Tây Bắc':C.good['Thiên Y'],'Tây':C.good['Diên Niên'],'Đông Bắc':C.good['Phục Vị'],'Đông Nam':C.bad['Tuyệt Mệnh'],'Bắc':C.bad['Ngũ Quỷ'],'Đông':C.bad['Lục Sát'],'Nam':C.bad['Họa Hại']},
           'Đoài':{'Tây Bắc':C.good['Sinh Khí'],'Tây Nam':C.good['Thiên Y'],'Đông Bắc':C.good['Diên Niên'],'Tây':C.good['Phục Vị'],'Đông':C.bad['Tuyệt Mệnh'],'Nam':C.bad['Ngũ Quỷ'],'Đông Nam':C.bad['Lục Sát'],'Bắc':C.bad['Họa Hại']}};
  return B[cung];
}
function analyzeHouseDirection(cung,huong){ const t=getBatTrachForCung(cung); const all=Object.entries(t).map(([h,i])=>({huong:h,...i})); return {selected:t[huong],goods:all.filter(i=>i.loai==='good'),bads:all.filter(i=>i.loai==='bad')}; }
const ZODIAC=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']; const idxZ=y=>((y-4)%12+12)%12; const nameZ=y=>ZODIAC[idxZ(y)];
const TTG=[{group:['Thân','Tý','Thìn'],tamTai:['Dần','Mão','Thìn']},{group:['Dần','Ngọ','Tuất'],tamTai:['Thân','Dậu','Tuất']},{group:['Hợi','Mão','Mùi'],tamTai:['Tỵ','Ngọ','Mùi']},{group:['Tỵ','Dậu','Sửu'],tamTai:['Hợi','Tý','Sửu']}];
function tuoiMu(eff,year){return year-eff+1}
function checkKimLau(t){let r=t%9;if(r===0)r=9;const m={1:'Kim Lâu Thân',3:'Kim Lâu Thê',6:'Kim Lâu Tử',8:'Kim Lâu Lục Súc'};return {isKimLau:[1,3,6,8].includes(r),type:m[r]||null}}
function checkHoangOc(t){const lb=['Nhất Cát','Nhì Nghi','Tam Địa Sát','Tứ Tấn Tài','Ngũ Thọ Tử','Lục Hoang Ốc'];const m=t%6;const i=(m===0)?5:m-1;const n=lb[i];return {name:n,isBad:['Tam Địa Sát','Ngũ Thọ Tử','Lục Hoang Ốc'].includes(n)}}
function checkTamTai(ownerYear,year){const o=nameZ(ownerYear),c=nameZ(year),g=TTG.find(x=>x.group.includes(o));return {isTamTai:g?g.tamTai.includes(c):false,yearChi:c}}
function checkXungTuoi(ownerYear,year){const opp=(idxZ(ownerYear)+6)%12;return {isXung:idxZ(year)===opp,opp:ZODIAC[opp],yearChi:nameZ(year)}}
function elemYear(y){const s=((y-4)%10+10)%10; if(s===0||s===1)return'Mộc'; if(s===2||s===3)return'Hỏa'; if(s===4||s===5)return'Thổ'; if(s===6||s===7)return'Kim'; return'Thủy';}
const KHAC={'Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim','Kim':'Mộc'};
function elemConflict(a,b){return a&&b&&(KHAC[a]===b||KHAC[b]===a)}
function evaluateBuildTime(birth,gender,year,month){
  const cung=getCungMenh(birth,gender); const age=tuoiMu(cung.effectiveYear,year);
  const kl=checkKimLau(age), ho=checkHoangOc(age), tt=checkTamTai(cung.effectiveYear,year), x=checkXungTuoi(cung.effectiveYear,year);
  const yE=elemYear(year), mE=[null,'Thủy',null,'Hỏa','Thổ','Kim','Mộc',null,'Hỏa','Thổ','Kim','Mộc','Thủy'][month]||null;
  const warnings=[]; if(kl.isKimLau)warnings.push(`Phạm Kim Lâu (${kl.type}).`); if(ho.isBad)warnings.push(`Phạm Hoang Ốc (${ho.name}).`); if(tt.isTamTai)warnings.push(`Phạm Tam Tai (${tt.yearChi}).`); if(x.isXung)warnings.push(`Xung tuổi với năm ${year} (đối xung ${x.opp}).`); if(elemConflict(cung.nguyenTo,yE))warnings.push(`Cung (${cung.nguyenTo}) khắc Ngũ hành năm (${yE}).`);
  const monthWarnings=[]; if(elemConflict(cung.nguyenTo,mE))monthWarnings.push(`Tháng ${month} xung ngũ hành (${mE}) với Cung (${cung.nguyenTo}).`);
  return {cung,ageMu:age,yearElement:yE,monthElement:mE,warnings,monthWarnings};
}

/* ====== UI: Wards theo tỉnh, Issues, La bàn, Lưu hồ sơ ====== */
function populateWardsForProvince(){
  const prov=document.getElementById('bd-province').value;
  const sel=document.getElementById('bd-ward');
  const wards=(prov==='Đồng Nai'?DN_WARDS_2025:BP_WARDS_2025);
  const opts=wards.map(w=>`<option value="${w}">${w}</option>`);
  opts.push('<option value="__other__">Khác (nhập tay)</option>');
  sel.innerHTML=opts.join('');
  sel.value=wards[0]||'__other__';
  document.getElementById('ward-custom-wrap').style.display = (sel.value==='__other__')?'block':'none';
  document.getElementById('bd-full-address').textContent = composeFullAddress();
}
function currentWardValue(){
  const v=document.getElementById('bd-ward').value;
  if(v==='__other__') return document.getElementById('bd-ward-custom').value.trim();
  return v;
}
function composeFullAddress(){
  const prov=document.getElementById('bd-province').value;
  const ward=currentWardValue();
  const huyen=document.getElementById('bd-huyen').value.trim(); // tùy chọn
  const detail=document.getElementById('bd-address-detail').value.trim();
  const parts=[]; if(detail)parts.push(detail); if(ward)parts.push(ward); if(huyen)parts.push(huyen); parts.push(prov);
  return parts.join(', ');
}
function renderIssues(filter=''){
  const wrap=document.getElementById('issues-container'); if(!wrap) return;
  const f=(filter||'').toLowerCase();
  const list=ISSUES.filter(i=> (i.cat+' '+i.label).toLowerCase().includes(f));
  wrap.innerHTML=list.map(i=>`<label class="issue-item"><input type="checkbox" name="issue" value="${i.id}"><span><strong>[${i.cat}]</strong> ${i.label}</span></label>`).join('');
}
function getSelectedIssues(){ return Array.from(document.querySelectorAll('input[name="issue"]:checked')).map(el=>el.value); }
function checkSiteIssues(ids){
  const problems=[],solutions=[]; const map=new Map(ISSUES.map(i=>[i.id,i]));
  ids.forEach(id=>{ const it=map.get(id); if(it){problems.push(`${it.label}: ${it.impact}`); solutions.push(`Hóa giải: ${it.remedy}`);} });
  return {problems,solutions};
}

const STORAGE_KEY='ptpro_profiles_wards2025';
const getProfiles=()=>JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
const setProfiles=a=>localStorage.setItem(STORAGE_KEY,JSON.stringify(a));
const uuid=()=> (crypto?.randomUUID ? crypto.randomUUID() : 'id_'+Date.now()+Math.random().toString(16).slice(2));
function normalizePhone(p){ p=(p||'').replace(/[^\d+]/g,'').trim(); if(p.startsWith('+84'))return p; if(p.startsWith('0')&&p.length>=9)return '+84'+p.slice(1); return p; }
function isValidPhone(p){ p=normalizePhone(p); const vn=/^\+?84(3|5|7|8|9)\d{8}$/; const g=/^\+?\d{8,13}$/; return vn.test(p)||g.test(p); }

function gatherInputs(){
  const name=document.getElementById('kh-ten').value.trim();
  const phone=document.getElementById('kh-phone').value.trim();
  const birth=document.getElementById('ngay-sinh').value.trim();
  const gender=document.getElementById('gioi-tinh').value;
  const huong=document.getElementById('huong-nha').value;
  const yearX=parseInt(document.getElementById('nam-xay').value,10);
  const monthX=parseInt(document.getElementById('thang-xay').value,10);

  const province=document.getElementById('bd-province').value;
  const ward=currentWardValue();
  const huyen=document.getElementById('bd-huyen').value.trim();
  const to=document.getElementById('bd-to').value.trim();
  const thua=document.getElementById('bd-thua').value.trim();
  const price=parseFloat(document.getElementById('bd-price').value)||0;
  const detail=document.getElementById('bd-address-detail').value.trim();
  const note=document.getElementById('bd-note').value.trim();
  const issueIds=getSelectedIssues();

  const fullAddr=composeFullAddress();
  document.getElementById('bd-full-address').textContent=fullAddr||'—';

  const bds={province,ward,huyen,to,thua,addressDetail:detail,fullAddress:fullAddr,price,note};
  return {name,phone,birth,gender,huong,yearX,monthX,bds,issueIds};
}

async function renderResult(R,i){
  const dir=analyzeHouseDirection(R.cung.cung,i.huong);
  const site=checkSiteIssues(i.issueIds);
  const num=calculateNumerology(i.birth);
  let html='';
  html+=`<div class="ket-luan"><div><span class="badge">Cung mệnh</span> <strong>${R.cung.cung}</strong> — Ngũ hành: <strong>${R.cung.nguyenTo}</strong> — Nhóm: <strong>${R.cung.nhomTrach}</strong></div><div><span class="badge">Thần số học</span> <strong>${num.number}</strong> — ${num.meaning}</div></div>`;
  html+=`<h3 class="block-title">Hướng nhà: ${i.huong} <span class="tag ${dir.selected?.loai||'warn'}">${dir.selected?.ten||'—'}</span></h3>`;
  if(dir.selected){
    const adv = dir.selected.loai==='good'
      ? ['Ưu tiên cửa/ban công hướng này.','Bếp/giường/bàn thờ/bàn làm việc xoay về 1 trong 4 hướng tốt.','Giữ lối vào thông thoáng.']
      : ['Bình phong/hiên/bậc tam cấp để “bẻ” dòng khí xấu.','Bố trí “tọa hung – hướng cát”.','Cân nhắc Bát Quái lồi.','Tăng cây xanh/ánh sáng.'];
    html+=`<p><em>Ý nghĩa:</em> ${dir.selected.y}</p><ul class="clean">`+adv.map(a=>`<li>${a}</li>`).join('')+`</ul>`;
  }
  if(dir.goods.length){
    const pr={'Sinh Khí':1,'Thiên Y':2,'Diên Niên':3,'Phục Vị':4};
    const g=[...dir.goods].sort((a,b)=>(pr[a.ten]||9)-(pr[b.ten]||9));
    html+=`<p><strong>4 hướng tốt nên ưu tiên:</strong></p><ul class="clean">`+g.map(x=>`<li><span class="good">${x.huong}</span> — ${x.ten}: ${x.y}</li>`).join('')+`</ul>`;
  }
  html+=`<hr/><h3 class="block-title">Năm/Tháng xây</h3>`;
  html+=`<p>Tuổi mụ: <strong>${R.ageMu}</strong> — Ngũ hành năm: <strong>${R.yearElement}</strong>${R.monthElement?` — Ngũ hành tháng: <strong>${R.monthElement}</strong>`:''}</p>`;
  if(R.warnings.length===0) html+=`<p class="good">Năm ${i.yearX}: Không thấy cảnh báo lớn.</p>`; else html+=`<ul class="clean">`+R.warnings.map(w=>`<li class="bad">${w}</li>`).join('')+`</ul>`;
  if(R.monthWarnings.length===0) html+=`<p class="good">Tháng ${i.monthX}: Không thấy cảnh báo lớn.</p>`; else html+=`<ul class="clean">`+R.monthWarnings.map(w=>`<li class="warn">${w}</li>`).join('')+`</ul>`;

  html+=`<hr/><h3 class="block-title">Môi trường & lỗi phong thủy</h3>`;
  if(site.problems.length===0) html+=`<p class="good">Không phát hiện lỗi đã chọn.</p>`;
  else{ html+=`<p><strong>Vấn đề:</strong></p><ul class="clean">`+site.problems.map(p=>`<li class="bad">${p}</li>`).join('')+`</ul>`;
        html+=`<p><strong>Hóa giải:</strong></p><ul class="clean">`+site.solutions.map(s=>`<li>${s}</li>`).join('')+`</ul>`; }

  html+=`<hr/><h3 class="block-title">Thông tin bất động sản</h3>`;
  html+=`<p><strong>Địa chỉ:</strong> ${i.bds.fullAddress||'—'}</p>`;
  html+=`<p><strong>Tờ/Thửa:</strong> ${i.bds.to||'—'} / ${i.bds.thua||'—'}</p>`;
  html+=`<p><strong>Giá:</strong> ${i.bds.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(i.bds.price):'—'}</p>`;
  html+=`<p><strong>Ghi chú:</strong> ${i.bds.note||'—'}</p>`;
  html+=`<hr/><h3 class="block-title">Phân tích AI</h3><div id="ai-analysis"><em>Đang phân tích…</em></div>`;
  document.getElementById('result-content').innerHTML=html;
  try {
    const ai = await getAiAnalysis({input:i, result:R});
    document.getElementById('ai-analysis').textContent = ai.text || 'Không có phản hồi';
  } catch(err) {
    document.getElementById('ai-analysis').textContent = 'Lỗi AI: ' + (err.message || err);
  }
}

async function getAiAnalysis(payload){
  const res = await fetch('/api/ai-analyze', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('Network error');
  return res.json();
}

function saveProfile(currentResult){
  const i=gatherInputs();
  if(!i.name) return alert('Vui lòng nhập họ tên.');
  if(!i.phone) return alert('Vui lòng nhập SĐT.');
  if(!isValidPhone(i.phone)) return alert('SĐT chưa đúng định dạng.');
  if(!i.birth) return alert('Vui lòng nhập ngày sinh.');
  if(!i.yearX||i.yearX<1900||i.yearX>2099) return alert('Năm xây không hợp lệ.');
  if(!i.monthX||i.monthX<1||i.monthX>12) return alert('Tháng xây không hợp lệ.');
  const R=currentResult||evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
  const numerology=calculateNumerology(i.birth);
  const list=getProfiles(); const phoneKey=normalizePhone(i.phone); const idx=list.findIndex(p=>p.customer.phoneKey===phoneKey);
  const profile={
    id:idx>=0?list[idx].id:uuid(),
    createdAt:idx>=0?list[idx].createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString(),
    customer:{name:i.name,phone:i.phone,phoneKey},
    input:{birth:i.birth,gender:i.gender,huong:i.huong,year:i.yearX,month:i.monthX,issueIds:i.issueIds},
    bds:i.bds,
    result:{...R,numerology},
    summary:{cung:R.cung.cung,menh:R.cung.nguyenTo,nhom:R.cung.nhomTrach,dir:i.huong,fullAddress:i.bds.fullAddress,to:i.bds.to,thua:i.bds.thua,price:i.bds.price,issues:i.issueIds.length,numerology:numerology.number}
  };
  if(idx>=0) list[idx]=profile; else list.unshift(profile);
  setProfiles(list); renderProfiles(); alert('Đã lưu hồ sơ.');
}

function renderProfiles(filter=''){
  const tbody=document.getElementById('profiles-tbody');
  const list=getProfiles().filter(p=> (p.customer.name+' '+p.customer.phone).toLowerCase().includes((filter||'').toLowerCase()) );
  const fmt=s=>new Date(s).toLocaleString();
  tbody.innerHTML=list.map(p=>`
    <tr data-id="${p.id}">
      <td>${p.customer.name}</td>
      <td>${p.customer.phone}</td>
      <td>${p.summary.cung} (${p.summary.menh})</td>
      <td>${p.summary.numerology||''}</td>
      <td>${p.summary.dir}</td>
      <td>${p.summary.fullAddress||''}</td>
      <td>${(p.summary.to||'')}${p.summary.thua?(' / '+p.summary.thua):''}</td>
      <td>${p.summary.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(p.summary.price):''}</td>
      <td>${p.summary.issues||0}</td>
      <td>${fmt(p.createdAt)}</td>
      <td class="row-actions"><button class="view">Xem</button><button class="delete">Xóa</button></td>
    </tr>`).join('');
  
}

function exportCSV(){
  const rows=getProfiles(); if(rows.length===0) return alert('Chưa có dữ liệu để xuất.');
  const header=['id','name','phone','birth','gender','huong','year','month','cung','menh','nhom','numerology','address','ward','huyen','province','to','thua','price','issues','note','createdAt'];
  const csv=[header.join(',')];
  rows.forEach(p=>{
    const b=p.bds||{};
    const r=[p.id,`"${(p.customer.name||'').replace(/"/g,'""')}"`,p.customer.phone,p.input.birth,p.input.gender,p.input.huong,p.input.year,p.input.month,
      p.result?.cung?.cung||'',p.result?.cung?.nguyenTo||'',p.result?.cung?.nhomTrach||'',p.result?.numerology?.number||'',
      b.fullAddress||'',b.ward||'',b.huyen||'',b.province||'',b.to||'',b.thua||'',b.price||'',(p.input.issueIds||[]).length,(b.note||'').replace(/,/g,';'),p.createdAt];
    csv.push(r.join(','));
  });
  const blob=new Blob([csv.join('\n')],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='ho_so_khach_bds.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ====== Vẽ đa giác nền nhà ====== */
const polygonPoints=[];
let centerPoint=null, entrancePoint=null;
let northRotation=0;
let dragTarget=null, mode='add';
let canvas=null, ctx=null;

function getMousePos(evt){
  const rect=canvas.getBoundingClientRect();
  return {x:evt.clientX-rect.left,y:evt.clientY-rect.top};
}

function hitTest(pos){
  const r=6;
  for(let i=0;i<polygonPoints.length;i++){
    const p=polygonPoints[i];
    if(Math.hypot(p.x-pos.x,p.y-pos.y)<r) return {type:'poly',index:i};
  }
  if(centerPoint&&Math.hypot(centerPoint.x-pos.x,centerPoint.y-pos.y)<r) return {type:'center'};
  if(entrancePoint&&Math.hypot(entrancePoint.x-pos.x,entrancePoint.y-pos.y)<r) return {type:'entrance'};
  return null;
}

function draw(){
  if(!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate(northRotation*Math.PI/180);
  ctx.translate(-canvas.width/2,-canvas.height/2);

  if(polygonPoints.length>1){
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x,polygonPoints[0].y);
    for(let i=1;i<polygonPoints.length;i++) ctx.lineTo(polygonPoints[i].x,polygonPoints[i].y);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle='#000';
  polygonPoints.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fill();
  });

  if(centerPoint){
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.arc(centerPoint.x,centerPoint.y,5,0,Math.PI*2);
    ctx.fill();
  }
  if(entrancePoint){
    ctx.fillStyle='blue';
    ctx.beginPath();
    ctx.arc(entrancePoint.x,entrancePoint.y,5,0,Math.PI*2);
    ctx.fill();
  }

  ctx.restore();
}

/* ====== Vẽ lên ảnh ====== */
let drawCanvas, drawCtx, drawImg, drawEnabled=false, drawing=false, currentPath=[], paths=[];
function initCanvasDrawing(){
  drawCanvas=document.getElementById('canvas');
  if(!drawCanvas) return;
  drawCtx=drawCanvas.getContext('2d');
  drawImg=new Image();

  document.getElementById('fileInput').addEventListener('change',e=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{ drawImg.onload=()=>{
        const maxW=document.getElementById('draw-section').clientWidth||window.innerWidth;
        const scale=Math.min(maxW/drawImg.width,1);
        drawCanvas.width=drawImg.width*scale;
        drawCanvas.height=drawImg.height*scale;
        redrawCanvas();
      }; drawImg.src=ev.target.result; };
    reader.readAsDataURL(file);
  });

  document.getElementById('btn-start-draw').addEventListener('click',()=>{drawEnabled=true;});
  document.getElementById('btn-finish-draw').addEventListener('click',()=>{drawEnabled=false; drawing=false;});
  document.getElementById('btn-undo').addEventListener('click',()=>{paths.pop(); redrawCanvas();});
  document.getElementById('btn-clear').addEventListener('click',()=>{paths=[]; currentPath=[]; redrawCanvas();});

  const getPos=e=>{
    const rect=drawCanvas.getBoundingClientRect();
    return {x:(e.clientX-rect.left), y:(e.clientY-rect.top)};
  };

  const start=e=>{ if(!drawEnabled) return; drawing=true; currentPath=[getPos(e)]; };
  const move=e=>{ if(!drawing) return; currentPath.push(getPos(e)); redrawCanvas(); };
  const end=()=>{ if(drawing){ paths.push(currentPath); drawing=false; currentPath=[]; redrawCanvas(); } };

  drawCanvas.addEventListener('mousedown',start);
  drawCanvas.addEventListener('mousemove',move);
  drawCanvas.addEventListener('mouseup',end);
  drawCanvas.addEventListener('mouseleave',end);
  drawCanvas.addEventListener('touchstart',e=>{start(e.touches[0]);});
  drawCanvas.addEventListener('touchmove',e=>{move(e.touches[0]); e.preventDefault();});
  drawCanvas.addEventListener('touchend',end);
}

function redrawCanvas(){
  if(!drawCtx) return;
  drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);
  if(drawImg&&drawImg.complete) drawCtx.drawImage(drawImg,0,0,drawCanvas.width,drawCanvas.height);
  drawCtx.lineWidth=2; drawCtx.strokeStyle='red'; drawCtx.lineJoin='round'; drawCtx.lineCap='round';
  const all=[...paths]; if(currentPath.length) all.push(currentPath);
  all.forEach(path=>{ if(path.length){ drawCtx.beginPath(); drawCtx.moveTo(path[0].x,path[0].y); for(let i=1;i<path.length;i++) drawCtx.lineTo(path[i].x,path[i].y); drawCtx.stroke(); }});
}

/* ====== Sự kiện UI ====== */
document.addEventListener('DOMContentLoaded', ()=>{
    initCanvasDrawing();
  // Province -> Wards
  document.getElementById('bd-province').addEventListener('change',populateWardsForProvince);
  populateWardsForProvince();

  document.getElementById('bd-ward').addEventListener('change',e=>{
    document.getElementById('ward-custom-wrap').style.display = (e.target.value==='__other__')?'block':'none';
    document.getElementById('bd-full-address').textContent = composeFullAddress();
  });
  ['bd-ward-custom','bd-huyen','bd-address-detail','bd-to','bd-thua','bd-price','bd-note'].forEach(id=>{
    const el=document.getElementById(id); el.addEventListener('input',()=>{ document.getElementById('bd-full-address').textContent=composeFullAddress(); });
  });
  document.getElementById('btn-save-ward').addEventListener('click',()=>{
    const prov=document.getElementById('bd-province').value;
    const custom=document.getElementById('bd-ward-custom').value.trim();
    if(!custom) return alert('Nhập tên phường/xã.');
    // Lưu bổ sung tạm thời vào danh sách của tỉnh hiện tại
    if(prov==='Đồng Nai') DN_WARDS_2025.push(custom); else BP_WARDS_2025.push(custom);
    populateWardsForProvince();
    document.getElementById('bd-ward').value=custom;
    document.getElementById('ward-custom-wrap').style.display='none';
    document.getElementById('bd-full-address').textContent=composeFullAddress();
    alert('Đã lưu phường/xã mới vào danh sách cục bộ.');
  });

  // Issues
  renderIssues(); document.getElementById('issues-search').addEventListener('input',e=>renderIssues(e.target.value));

  // Compass
  document.getElementById('btn-compass-start').addEventListener('click',startCompass);
  document.getElementById('btn-compass-stop').addEventListener('click',stopCompass);
  document.getElementById('btn-compass-apply').addEventListener('click',applyCompassToDirection);

   // Canvas polygon
  canvas=document.getElementById('fengCanvas');
  if(canvas){
    ctx=canvas.getContext('2d');
    draw();
    canvas.addEventListener('mousedown',e=>{
      const pos=getMousePos(e);
      if(mode==='center'){ centerPoint=pos; mode='add'; draw(); return; }
      if(mode==='entrance'){ entrancePoint=pos; mode='add'; draw(); return; }
      const hit=hitTest(pos);
      if(hit) dragTarget=hit; else { polygonPoints.push(pos); draw(); }
    });
    canvas.addEventListener('mousemove',e=>{
      if(!dragTarget) return;
      const pos=getMousePos(e);
      if(dragTarget.type==='poly') polygonPoints[dragTarget.index]=pos;
      else if(dragTarget.type==='center') centerPoint=pos;
      else if(dragTarget.type==='entrance') entrancePoint=pos;
      draw();
    });
    const endDrag=()=>{dragTarget=null;};
    canvas.addEventListener('mouseup',endDrag);
    canvas.addEventListener('mouseleave',endDrag);
    document.getElementById('btn-set-center').addEventListener('click',()=>{mode='center';});
    document.getElementById('btn-set-entrance').addEventListener('click',()=>{mode='entrance';});
    document.getElementById('northAngle').addEventListener('input',e=>{
      northRotation=parseFloat(e.target.value)||0;
      const dial=document.querySelector('.dial');
      if(dial) dial.style.transform=`rotate(${northRotation}deg)`;
      draw();
    });
  }

  // Profiles
  renderProfiles();
  document.getElementById('profiles-search').addEventListener('input',e=>renderProfiles(e.target.value));

  // Analyze
  document.getElementById('btn-analyze').addEventListener('click',async()=>{
    try{
      const i=gatherInputs();
      if(!i.birth) return alert('Vui lòng nhập ngày sinh.');
      if(!i.yearX||i.yearX<1900||i.yearX>2099) return alert('Năm xây không hợp lệ.');
      if(!i.monthX||i.monthX<1||i.monthX>12) return alert('Tháng xây không hợp lệ.');
      const R=evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
      await renderResult(R,i);
    }catch(err){ alert('Lỗi: '+(err.message||err)); }
  });

  // Save / Export
  document.getElementById('btn-save').addEventListener('click',()=>{ try{ saveProfile(); }catch(err){ alert('Lỗi: '+(err.message||err)); }});
  document.getElementById('btn-export').addEventListener('click',exportCSV);

  // Row actions
document.getElementById('profiles-tbody').addEventListener('click',e=>{
    const tr=e.target.closest('tr'); if(!tr) return; const id=tr.getAttribute('data-id');
    const list=getProfiles(); const p=list.find(x=>x.id===id); if(!p) return;
    if(e.target.classList.contains('view')){
      // fill form
      document.getElementById('kh-ten').value=p.customer.name;
      document.getElementById('kh-phone').value=p.customer.phone;
      document.getElementById('ngay-sinh').value=p.input.birth;
      document.getElementById('gioi-tinh').value=p.input.gender;
      document.getElementById('huong-nha').value=p.input.huong;
      document.getElementById('nam-xay').value=p.input.year;
      document.getElementById('thang-xay').value=p.input.month;

      document.getElementById('bd-province').value=p.bds.province||'Đồng Nai';
      populateWardsForProvince();
      const wards=(p.bds.province==='Bình Phước'?BP_WARDS_2025:DN_WARDS_2025);
      if(wards.includes(p.bds.ward)){ document.getElementById('bd-ward').value=p.bds.ward; document.getElementById('ward-custom-wrap').style.display='none'; }
      else { document.getElementById('bd-ward').value='__other__'; document.getElementById('ward-custom-wrap').style.display='block'; document.getElementById('bd-ward-custom').value=p.bds.ward||''; }
      document.getElementById('bd-huyen').value=p.bds.huyen||'';
      document.getElementById('bd-to').value=p.bds.to||'';
      document.getElementById('bd-thua').value=p.bds.thua||'';
      document.getElementById('bd-address-detail').value=p.bds.addressDetail||'';
      document.getElementById('bd-price').value=p.bds.price||'';
      document.getElementById('bd-note').value=p.bds.note||'';
      document.getElementById('bd-full-address').textContent=p.bds.fullAddress||'—';

      // tick lại issues
      renderIssues(document.getElementById('issues-search').value||'');
      const set=new Set(p.input.issueIds||[]);
      document.querySelectorAll('input[name="issue"]').forEach(cb=> cb.checked=set.has(cb.value));

      renderResult(p.result,{...p.input,bds:p.bds,issueIds:p.input.issueIds||[]});
      window.scrollTo({top:0,behavior:'smooth'});
    }
    if(e.target.classList.contains('delete')){
      if(confirm('Xóa hồ sơ này?')){ setProfiles(list.filter(x=>x.id!==id)); renderProfiles(document.getElementById('profiles-search').value); }
    }
  });
});

document.addEventListener('DOMContentLoaded',()=>{
  const root=document.querySelector('.page-enter');
  if(root) root.classList.remove('page-enter');
});
