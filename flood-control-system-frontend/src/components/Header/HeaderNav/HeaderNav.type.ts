export type TPage = {
  name: string;
  path: string;
  subpages?: TSubpage[];
};

export type TSubpage = {
  name: string;
  path?: string;
};
