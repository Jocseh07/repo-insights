"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { project, type NewProject, type Project } from "../db/schema";
import { getUserId } from "./helpers";

export const createProject = async (data: Omit<NewProject, "userId">) => {
  const userId = await getUserId();
  return await db
    .insert(project)
    .values({ ...data, userId })
    .returning();
};

export const getProjects = async () => {
  const userId = await getUserId();
  return await db.query.project.findMany({
    where: eq(project.userId, userId),
  });
};

export const getProject = async ({ repoId }: { repoId: number }) => {
  return await db.query.project.findFirst({
    where: eq(project.repoId, repoId),
  });
};

export const deleteProject = async ({ repoId }: { repoId: number }) => {
  return await db.delete(project).where(eq(project.repoId, repoId));
};

export const updateProject = async ({
  repoId,
  data,
}: {
  repoId: number;
  data: Partial<Project>;
}) => {
  return await db.update(project).set(data).where(eq(project.repoId, repoId));
};

export const checkProjectExists = async ({
  repoId,
}: {
  repoId: number | undefined;
}) => {
  if (!repoId) return false;
  const userId = await getUserId();
  const projectExists = await db.query.project.findFirst({
    where: and(eq(project.repoId, repoId), eq(project.userId, userId)),
  });
  return !!projectExists;
};
