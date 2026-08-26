import { MetadataRoute } from "next";
import { getAllPublishedProjects } from "@/lib/db/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://muhammaddaniyal.com";

  const staticPages = [
    "",
    "/work",
    "/services",
    "/about",
    "/process",
    "/reviews",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const publishedProjects = await getAllPublishedProjects();

  const projectPages = publishedProjects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project.updated_at || project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
