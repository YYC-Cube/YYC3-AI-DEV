/**
 * @file: persistence.ts
 * @description: 工作流持久化 — localStorage 存档 + 恢复
 */
import { EDICT_STAGES } from "./edict-protocol";
import { DYNASTY_HONORS } from "./honors";

interface PersistedTask {
  id: string;
  title: string;
  currentStage: number;
  completedAt?: string;
  honorName?: string;
}

const TASKS_KEY = "yyc3:dynasty:tasks";

export function saveTask(task: PersistedTask): void {
  try {
    const tasks = loadTasks();
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx >= 0) tasks[idx] = task;
    else tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks.slice(-50)));
  } catch {}
}

export function loadTasks(): PersistedTask[] {
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY) ?? "[]");
  } catch { return []; }
}

export function createTaskRecord(edictId: string, title: string): PersistedTask {
  return { id: edictId, title, currentStage: 1 };
}

export function advanceTask(edictId: string, toCompleted = false): void {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === edictId);
  if (!task) return;
  if (toCompleted) {
    task.currentStage = EDICT_STAGES.length;
    task.completedAt = new Date().toISOString();
    const honor = DYNASTY_HONORS[Math.floor(Math.random() * 3)];
    task.honorName = honor?.name;
  } else {
    task.currentStage = Math.min(task.currentStage + 1, EDICT_STAGES.length);
  }
  saveTask(task);
}

export function getTaskHistory(): PersistedTask[] {
  return loadTasks()
    .filter(t => t.completedAt)
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""));
}

export function getActiveTaskCount(): number {
  return loadTasks().filter(t => !t.completedAt).length;
}
