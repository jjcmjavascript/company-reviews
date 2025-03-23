export interface NumberIn {
  in: number[];
}

export interface StringIn {
  in: string[];
}

export interface StartsWith {
  startsWith: string;
  mode?: 'insensitive' | 'default';
}
