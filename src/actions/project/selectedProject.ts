"use server";

import { db } from "@/server/db";
import { getUserId } from "../helpers";
import { selectedProject, user } from "@/server/db/schema";

export async function getSelectedProjectId({ userId }: { userId: string }) {
  const selectedProject = await getSelectedProject({ userId });
  return selectedProject?.id;
}

export async function getSelectedProject({ userId }: { userId: string }) {
  const currentSelectedProject = await db.query.selectedProject.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
    with: {
      project: true,
    },
  });
  return currentSelectedProject?.project;
}

export async function setSelectedProject(projectId: string) {
  const userId = await getUserId();
  await db
    .insert(selectedProject)
    .values({
      projectId,
      userId,
    })
    .onConflictDoUpdate({ target: selectedProject.userId, set: { projectId } });
}
