export const ISSUES = [
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

export const ISSUE_DETECTORS = {
  lot_triangle: inputs => {
    const poly = inputs.polygon || [];
    return poly.length === 3;
  },
    lot_L: inputs => {
    const poly = inputs.polygon || [];
    if (poly.length < 5) return false;
    const area = Math.abs(
      poly.reduce((acc, p, i) => {
        const q = poly[(i + 1) % poly.length];
        return acc + p.x * q.y - q.x * p.y;
      }, 0)
    ) / 2;
    const xs = poly.map(p => p.x);
    const ys = poly.map(p => p.y);
    const box = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
    return area < box * 0.9;
  },
  lot_trapezoid: inputs => {
    const poly = inputs.polygon || [];
    if (poly.length !== 4) return false;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const front = dist(poly[0], poly[1]);
    const back = dist(poly[2], poly[3]);
    return Math.abs(front - back) > 1;
  },
  lot_front_narrow: inputs => {
    const poly = inputs.polygon || [];
    if (poly.length !== 4) return false;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const front = dist(poly[0], poly[1]);
    const back = dist(poly[2], poly[3]);
    return front < back;
  },
  door_back: inputs => {
    const f = inputs.entrance;
    const b = inputs.backDoor;
    if (!f || !b) return false;
    return f.x === b.x || f.y === b.y;
  },
  door_stair: inputs => {
    const d = inputs.entrance;
    const s = inputs.stair;
    if (!d || !s) return false;
    const dx = Math.abs(d.x - s.x);
    const dy = Math.abs(d.y - s.y);
    return dx < 10 || dy < 10;
      },
  door_wc: inputs => {
    const d = inputs.entrance;
    const w = inputs.wc;
    if (!d || !w) return false;
    const dx = Math.abs(d.x - w.x);
    const dy = Math.abs(d.y - w.y);
    return dx < 10 || dy < 10;
  }
};

ISSUES.forEach(issue => {
  if (!ISSUE_DETECTORS[issue.id]) {
    ISSUE_DETECTORS[issue.id] = inputs => Boolean(inputs[issue.id]);
  }
});

export function detectIssues(inputs = {}) {
  if (!inputs || Object.keys(inputs).length === 0) {
    console.warn('Thiếu dữ liệu đầu vào để phân tích phong thủy');
    return [];
  }
  ISSUES.forEach(issue => {
    const fn = ISSUE_DETECTORS[issue.id];
    if (fn && fn(inputs)) ids.push(issue.id);
  });
    const fn = ISSUE_DETECTORS[issue.id];
    try {
      if (fn && fn(inputs)) ids.push(issue.id);
    } catch {
      /* ignore detector errors */
    }
  });
  const problems = [];
  const solutions = [];
  ids.forEach(id => {
    const it = ISSUES.find(i => i.id === id);
    if (it) {
      problems.push(`${it.label}: ${it.impact}`);
      solutions.push(`Hóa giải: ${it.remedy}`);
    }
  });
  return { ids, problems, solutions };
}
