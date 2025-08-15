const EARTHLY_BRANCHES=["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const TRIGRAMS=["Càn","Khảm","Cấn","Chấn","Tốn","Ly","Khôn","Đoài"];
let orientationHandler=null;
const degNormalize=x=>{x=x%360;return x<0?x+360:x;};
export function degreeToDirection(deg){
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
  const branchIndex=Math.round(show/15)%EARTHLY_BRANCHES.length;
  const trigramIndex=Math.round(show/45)%TRIGRAMS.length;
  document.getElementById('compass-branch').textContent=EARTHLY_BRANCHES[branchIndex];
  document.getElementById('compass-trigram').textContent=TRIGRAMS[trigramIndex];
  document.getElementById('needle').style.transform=`translate(-50%,-100%) rotate(${show}deg)`;
}
export async function startCompass(){
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
    window.addEventListener('deviceorientation', orientationHandler, {passive:true});
    status.textContent='Đang đo… giữ máy song song mặt đất & lắc hình số 8 để hiệu chuẩn.';
  }catch(err){ status.textContent='Lỗi la bàn: '+(err.message||err); }
}
export function stopCompass(){
  if(orientationHandler){ window.removeEventListener('deviceorientation', orientationHandler, {passive:true}); orientationHandler=null; }
  document.getElementById('compass-status').textContent='Đã dừng.';
}
export function applyCompassToDirection(){
  const deg=parseFloat(document.getElementById('compass-deg').textContent);
  if(isNaN(deg)) return alert('Chưa có dữ liệu la bàn.');
  document.getElementById('huong-nha').value=degreeToDirection(deg);
  alert('Đã gán hướng nhà = '+degreeToDirection(deg));
}
