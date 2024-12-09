import { relations } from "drizzle-orm";
import {
  index,
  integer,
  json,
  pgTableCreator,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const createTable = pgTableCreator((name) => `repo-insight_${name}`);

const createdAt = timestamp("created_at").defaultNow();
const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdate(() => new Date());
const deletedAt = timestamp("deleted_at");

export const user = createTable(
  "user",
  {
    clerkId: text("id").notNull().primaryKey(),
    imageUrl: text("image_url"),
    email: text("email").notNull().unique(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    credits: integer("credits").notNull().default(150),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      emailIndex: index("user_email_idx").on(table.email),
    };
  },
);

export const userRelations = relations(user, ({ many }) => ({
  projects: many(project),
  questions: many(question),
}));

export const project = createTable(
  "project",
  {
    repoId: integer("repo_id").primaryKey().notNull(),
    repoName: text("repo_name").notNull(),
    repoOwner: text("repo_owner").notNull(),
    repoUrl: text("repo_url").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.clerkId, { onDelete: "cascade" }),

    createdAt,
    updatedAt,
    deletedAt,
  },
  (table) => {
    return {
      repoIdIndex: index("project_repo_id_idx").on(table.repoId),
    };
  },
);

export const projectRelations = relations(project, ({ many, one }) => ({
  sourceCodeEmbeddings: many(sourceCodeEmbedding),
  questions: many(question),
  user: one(user, {
    fields: [project.userId],
    references: [user.clerkId],
  }),
}));

export const sourceCodeEmbedding = createTable(
  "source_code_embedding",
  {
    id: text("id")
      .primaryKey()
      .$default(() => uuidv4()),
    summaryEmbedding: vector("summaryEmbedding", { dimensions: 768 }).notNull(),
    sourceCode: text("source_code").notNull(),
    fileName: text("file_name").notNull(),
    summary: text("summary").notNull(),
    projectId: integer("project_id")
      .notNull()
      .references(() => project.repoId, { onDelete: "no action" }),

    createdAt,
  },
  (table) => {
    return {
      idIndex: index("source_code_idx").on(table.id),
    };
  },
);

export const sourceCodeEmbeddingRelations = relations(
  sourceCodeEmbedding,
  ({ one }) => ({
    project: one(project, {
      fields: [sourceCodeEmbedding.projectId],
      references: [project.repoId],
    }),
  }),
);

export const question = createTable(
  "question",
  {
    id: text("id")
      .primaryKey()
      .$default(() => uuidv4()),
    projectId: integer("project_id")
      .notNull()
      .references(() => project.repoId, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.clerkId, { onDelete: "no action" }),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    fileReferences: json("file_references").notNull(),

    createdAt,
  },
  (table) => {
    return {
      idIndex: index("question_idx").on(table.id),
    };
  },
);

export const questionRelations = relations(question, ({ one }) => ({
  project: one(project, {
    fields: [question.projectId],
    references: [project.repoId],
  }),
  user: one(user, {
    fields: [question.userId],
    references: [user.clerkId],
  }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Project = typeof project.$inferSelect;
export type NewProject = typeof project.$inferInsert;

export type Question = typeof question.$inferSelect;
export type NewQuestion = typeof question.$inferInsert;

// export const commit = createTable(
//   "commit",
//   {
//     id: text("id")
//       .primaryKey()
//       .$default(() => uuidv4()),

//     projectId: text("project_id")
//       .notNull()
//       .references(() => project.id, { onDelete: "cascade" }),
//     commitMessage: text("commit_message").notNull(),
//     commitHash: text("commit_hash").notNull(),
//     commitAuthorName: text("commit_author_name").notNull(),
//     commitAuthorEmail: text("commit_author_email").notNull(),
//     commitAuthorAvatarUrl: text("commit_author_avatar_url").notNull(),
//     commitAuthorDate: text("commit_author_date").notNull(),
//     aiSummary: text("ai_summary"),

//     createdAt,
//     updatedAt,
//   },
//   (table) => {
//     return {
//       idIndex: index("commit_id_idx").on(table.id),
//     };
//   },
// );
