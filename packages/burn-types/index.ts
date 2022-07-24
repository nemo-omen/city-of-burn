type Entity = {
  id: string;
  name: string;
  desctiption: string;
};

type Actor = Entity & {
  life: number;
  strength: number;
  intelligence: number;
};

export type {
  Entity,
  Actor,
};