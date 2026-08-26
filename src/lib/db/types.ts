export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus = "draft" | "published";

export interface DbProject {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  overview: string | null;
  category_id: string | null;
  video_url: string | null;
  video_storage_path: string | null;
  thumbnail_url: string | null;
  thumbnail_storage_path: string | null;
  duration: string | null;
  editing_style: string | null;
  challenge: string | null;
  result_summary: string | null;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface DbProjectService {
  id: string;
  project_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface DbProjectDeliverable {
  id: string;
  project_id: string;
  item: string;
  sort_order: number;
  created_at: string;
}

export interface DbProjectApproach {
  id: string;
  project_id: string;
  pacing_and_structure: string | null;
  b_roll_and_visuals: string | null;
  sound_and_color: string | null;
  retention_tactics: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectCardItem {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  category_id: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  editing_style: string | null;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  published_at: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface FullProjectWithRelations extends DbProject {
  category?: DbCategory | null;
  services: DbProjectService[];
  deliverables: DbProjectDeliverable[];
  approach: DbProjectApproach | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  short_description: string;
  overview: string;
  category_id: string;
  video_url: string;
  video_storage_path?: string;
  thumbnail_url: string;
  thumbnail_storage_path?: string;
  duration: string;
  editing_style: string;
  challenge: string;
  result_summary: string;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
  services: string[];
  deliverables: string[];
  approach: {
    pacing_and_structure: string;
    b_roll_and_visuals: string;
    sound_and_color: string;
    retention_tactics: string;
  };
}
