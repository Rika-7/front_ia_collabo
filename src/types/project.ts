export interface Project {
  project_id: number;
  project_title: string;
  research_field: string;
  budget: string;
  application_deadline: string;
  preferred_researcher_level: string;
  types_to_register: string;
  project_status: number;
  company_user_id: number;
}

export interface ProjectsResponse {
  status: string;
  projects: Project[];
  total: number;
}
