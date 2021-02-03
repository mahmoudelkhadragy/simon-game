export enum COLORS {
  red,
  green,
  blue,
  yellow,
}

export const START_COUNT = 2;

export const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
