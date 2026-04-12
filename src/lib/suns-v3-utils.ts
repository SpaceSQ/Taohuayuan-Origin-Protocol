// src/lib/suns-v3-utils.ts

export const L1_DOMAINS = [
  // ...包含 GAME 和 MYTH 的所有八大域...
];

export const MAX_GRID_PER_AREA = 999;
export const ORIENTATION_COUNT = 9;

/**
 * 核心算法：计算 META 域的可用空间 (A区满转B区)
 */
export const calculateMetaAddress = (currentGlobalCount: number, selectedL2: string) => {
  const totalCapacityPerArea = ORIENTATION_COUNT * MAX_GRID_PER_AREA; // 8991
  const areaIndex = Math.floor(currentGlobalCount / totalCapacityPerArea);
  const areaCode = String.fromCharCode(65 + areaIndex); // 0->A, 1->B...
  
  const l3Number = (Math.floor(currentGlobalCount / ORIENTATION_COUNT) % MAX_GRID_PER_AREA) + 1;
  const l3Formatted = l3Number.toString().padStart(3, '0');

  // 例如 L4 = TAOHUAYUANTOWNA，校验码固定为 4
  const l4WithChecksum = `TAOHUAYUANTOWN${areaCode}4`;

  return { areaCode, l3Formatted, l4WithChecksum };
};

/**
 * 核心算法：计算房间内 1-9 空间的嵌套逻辑
 */
export const calculateSpaceAllocation = (agentIndex: number) => {
  if (agentIndex === 0) return { room: 1, space: 1 }; // 人类房东
  const room = Math.floor((agentIndex - 1) / 8) + 1;
  const space = ((agentIndex - 1) % 8) + 2;           // AI 预留位 (2-9)
  return { room, space };
};