export interface Task {
  id: number;
  title: string;
  type: string;
}
export type TaskFilter = "all" | "todo" | "done";