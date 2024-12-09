"use server";

import { db } from "@/server/db";
import {
  commit,
  project,
  selectedProject,
  type NewProject,
} from "@/server/db/schema";
import { getUserId } from "../helpers";
import { and, eq, isNull } from "drizzle-orm";
import { pollCommits } from "../github/getCommits";
import { indexGithubRepo } from "../github/githubLoader";

export async function createProject(data: Omit<NewProject, "userId">) {
  const userId = await getUserId();
  return await db
    .insert(project)
    .values({ ...data, userId: userId })
    .returning();
  // if (currentProject.length === 0 || !currentProject[0]) throw new Error();
  // await pollCommits({ project: currentProject[0] });
  // await indexGithubRepo({ project: currentProject[0] });
}

export async function getUserProjects({ userId }: { userId: string }) {
  return await db
    .select()
    .from(project)
    .where(and(eq(project.userId, userId), isNull(project.deletedAt)));
}

export async function getProcessedCommits({
  projectId,
}: {
  projectId: string;
}) {
  return await db.select().from(commit).where(eq(commit.projectId, projectId));
}

export async function getOneProject({ projectId }: { projectId: string }) {
  return await db.query.project.findFirst({
    where: (table, { eq }) => eq(table.id, projectId),
  });
}

export async function deleteProject({ projectId }: { projectId: string }) {
  const userId = await getUserId();
  await db.delete(project).where(eq(project.id, projectId));
}

export async function archiveProject({ projectId }: { projectId: string }) {
  const userId = await getUserId();
  await db
    .update(project)
    .set({ deletedAt: new Date() })
    .where(eq(project.id, projectId));
  await db
    .delete(selectedProject)
    .where(
      and(
        eq(selectedProject.projectId, projectId),
        eq(selectedProject.userId, userId),
      ),
    );
}
