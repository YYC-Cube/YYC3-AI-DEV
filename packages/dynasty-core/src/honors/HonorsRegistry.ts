/**
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @License  : Apache-2.0
 * @Homepage : https://matrix.yyc3.top
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import { DYNASTY_HONORS } from '../protocol/DynastyTypes'
import type { DynastyHonor, DynastyAgentID, HonorRarity } from '../protocol/DynastyTypes'

export class HonorsRegistry {
  private honors: Map<string, DynastyHonor> = new Map();

  constructor() {
    for (const honor of DYNASTY_HONORS) {
      this.honors.set(honor.id, honor);
    }
  }

  getAll(): DynastyHonor[] {
    return [...this.honors.values()];
  }

  getById(id: string): DynastyHonor | undefined {
    return this.honors.get(id);
  }

  getByRarity(rarity: HonorRarity): DynastyHonor[] {
    return this.getAll().filter(h => h.rarity === rarity);
  }

  getByAgent(agentId: DynastyAgentID): DynastyHonor[] {
    return this.getAll().filter(h => h.granted_to?.includes(agentId));
  }

  getEligibleForAgent(agentId: DynastyAgentID): DynastyHonor[] {
    return this.getAll().filter(h => !h.granted_to?.includes(agentId));
  }

  getRarityLabel(rarity: HonorRarity): string {
    const labels: Record<HonorRarity, string> = {
      1: '普通',
      2: '优良',
      3: '稀有',
      4: '史诗',
      5: '传说',
      6: '神话',
    };
    return labels[rarity];
  }

  getSize(): number {
    return this.honors.size;
  }
}
