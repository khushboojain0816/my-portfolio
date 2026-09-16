export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  sortOrder: number;
};
