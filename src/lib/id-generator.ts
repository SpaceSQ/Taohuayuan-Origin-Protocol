// src/lib/id-generator.ts

/**
 * 校验码权重矩阵 (1-20位的逻辑位置)
 */
const WEIGHTS = [
  3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 
  43, 47, 53, 59, 61, 67, 71, 73               
];

/**
 * 生成 2 位大写字母的校验码
 */
export function generateS2CheckSum(part1: string, part2: string): string {
  const rawString = (part1 + part2).toUpperCase();
  if (rawString.length !== 20) {
      return "XY"; // 降级容错
  }

  let sum = 0;
  for (let i = 0; i < 20; i++) {
      const char = rawString[i];
      const value = parseInt(char, 36); 
      sum += (isNaN(value) ? 0 : value) * WEIGHTS[i];
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index1 = sum % 26;                 
  const index2 = Math.floor(sum / 26) % 26; 

  return alphabet[index1] + alphabet[index2];
}

/**
 * 生成符合桃花源规范的 22 位 S2-DID
 * 格式: [Class 1位] + [Attr 5位] + [Date 6位] + [Checksum 2位] + [Serial 8位]
 * 例如: DTAOHU260410XY12345678
 */
export function generateIdentity(classType: 'D' | 'V' | 'I', attrCode: string = 'TAOHU'): string {
  const dateStr = new Date().toISOString().slice(2,10).replace(/-/g, ''); // 6位日期，如 260410
  const randomSerial = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8位随机序列
  
  const part1 = `${classType}${attrCode.slice(0,5).padEnd(5, '0')}${dateStr}`; // 1+5+6 = 12位
  const part2 = randomSerial; // 8位
  
  const checkSum = generateS2CheckSum(part1, part2); // 2位
  
  return `${part1}${checkSum}${part2}`; // 总共 22 位
}