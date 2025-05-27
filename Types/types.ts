function keys<T extends object>(data: T): Array<keyof T> {
  return Object.keys(data) as Array<keyof T>
}

function getByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

//------------
type ValueOf<T> = T[keyof T];

const Color = {
  RED: 'red',
  GREEN: 'green'
} as const;

type Color = ValueOf<typeof Color>;

const color: Color = ...
//------------

type VoidFn = () => void;
