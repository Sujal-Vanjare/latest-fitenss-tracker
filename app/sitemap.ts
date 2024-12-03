import { siteConfig } from "@/config/site";
import { getAllExercises } from "@/data/fetchExercises";
import type { MetadataRoute } from "next";
import slugify from "slugify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exercises = await getAllExercises();

  // Flatten the data into an array of exercises
  const allExercises = Object.values(exercises).flat();

  // Map each exercise to its corresponding sitemap entry
  const exercisePages = allExercises.map((exercise: Exercise) => {
    const categorySlug = slugify(exercise.category_name, { lower: true });
    const exerciseSlug = slugify(exercise.name, { lower: true });
    const href = `/workout/${categorySlug}/${exerciseSlug}`;

    return {
      url: `${siteConfig.url}${href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/body-weight`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...exercisePages];
}
