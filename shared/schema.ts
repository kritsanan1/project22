import { pgTable, text, serial, integer, boolean, timestamp, json, decimal, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// ============================================================================
// USER MANAGEMENT & AUTHENTICATION
// ============================================================================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  googleId: text("google_id").unique(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  isEmailVerified: boolean("is_email_verified").default(false),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  company: text("company"),
  website: text("website"),
  bio: text("bio"),
  timezone: text("timezone").default("UTC"),
  language: text("language").default("en"),
  preferences: json("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// SUBSCRIPTION & PAYMENT MANAGEMENT
// ============================================================================

export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // Basic, Premium, Business, Enterprise
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  billingInterval: text("billing_interval").notNull(), // monthly, yearly
  features: json("features").notNull(), // Array of feature objects
  maxSocialAccounts: integer("max_social_accounts").default(3),
  maxPostsPerMonth: integer("max_posts_per_month").default(100),
  maxTeamMembers: integer("max_team_members").default(1),
  aiTokensPerMonth: integer("ai_tokens_per_month").default(10000),
  hasAnalytics: boolean("has_analytics").default(false),
  hasAutomation: boolean("has_automation").default(false),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: uuid("plan_id").notNull().references(() => subscriptionPlans.id),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeCustomerId: text("stripe_customer_id"),
  status: text("status").notNull(), // active, canceled, past_due, etc
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  canceledAt: timestamp("canceled_at"),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paymentHistory = pgTable("payment_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  subscriptionId: uuid("subscription_id").references(() => userSubscriptions.id),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("usd"),
  status: text("status").notNull(), // succeeded, failed, pending
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// SOCIAL MEDIA ACCOUNT MANAGEMENT
// ============================================================================

export const socialAccounts = pgTable("social_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  platform: text("platform").notNull(), // twitter, linkedin, instagram, etc
  platformUserId: text("platform_user_id").notNull(),
  username: text("username").notNull(),
  displayName: text("display_name"),
  profileImage: text("profile_image"),
  accessToken: text("access_token"), // Encrypted
  refreshToken: text("refresh_token"), // Encrypted
  tokenExpiresAt: timestamp("token_expires_at"),
  ayrshareProfileKey: text("ayrshare_profile_key"),
  isActive: boolean("is_active").default(true),
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// CONTENT & POST MANAGEMENT
// ============================================================================

export const contentCategories = pgTable("content_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").default("#8B9B7D"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: uuid("category_id").references(() => contentCategories.id),
  title: text("title"),
  content: text("content").notNull(),
  status: text("status").notNull().default("draft"), // draft, scheduled, published, failed
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  platforms: json("platforms").notNull(), // Array of platform names
  mediaUrls: json("media_urls").default([]),
  hashtags: json("hashtags").default([]),
  ayrsharePostId: text("ayrshare_post_id"),
  aiGenerated: boolean("ai_generated").default(false),
  aiPrompt: text("ai_prompt"),
  engagement: json("engagement").default({}), // likes, shares, comments, etc
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const postAnalytics = pgTable("post_analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  platform: text("platform").notNull(),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  comments: integer("comments").default(0),
  clicks: integer("clicks").default(0),
  saves: integer("saves").default(0),
  engagementRate: decimal("engagement_rate", { precision: 5, scale: 4 }).default("0"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// ============================================================================
// MEDIA LIBRARY
// ============================================================================

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  altText: text("alt_text"),
  tags: json("tags").default([]),
  metadata: json("metadata").default({}),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// ============================================================================
// AI CONTENT GENERATION
// ============================================================================

export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text("type").notNull(), // text, hashtags, image_description, etc
  prompt: text("prompt").notNull(),
  result: text("result").notNull(),
  model: text("model").default("gemini-1.5-flash"),
  tokensUsed: integer("tokens_used").default(0),
  temperature: decimal("temperature", { precision: 3, scale: 2 }).default("0.7"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentTemplates = pgTable("content_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }), // null for system templates
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // promotional, educational, engaging, etc
  template: text("template").notNull(),
  variables: json("variables").default([]),
  isPublic: boolean("is_public").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// TEAM COLLABORATION
// ============================================================================

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  settings: json("settings").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text("role").notNull().default("member"), // owner, admin, editor, viewer
  permissions: json("permissions").default([]),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const postApprovals = pgTable("post_approvals", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  requestedById: uuid("requested_by_id").notNull().references(() => users.id),
  reviewerId: uuid("reviewer_id").references(() => users.id),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  feedback: text("feedback"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// WORKFLOW AUTOMATION (N8N Integration)
// ============================================================================

export const workflows = pgTable("workflows", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  description: text("description"),
  n8nWorkflowId: text("n8n_workflow_id").unique(),
  trigger: text("trigger").notNull(), // schedule, webhook, manual, etc
  configuration: json("configuration").notNull(),
  isActive: boolean("is_active").default(false),
  lastExecuted: timestamp("last_executed"),
  executionCount: integer("execution_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workflowExecutions = pgTable("workflow_executions", {
  id: uuid("id").primaryKey().defaultRandom(),
  workflowId: uuid("workflow_id").notNull().references(() => workflows.id, { onDelete: 'cascade' }),
  n8nExecutionId: text("n8n_execution_id"),
  status: text("status").notNull(), // success, error, running, waiting
  startedAt: timestamp("started_at").defaultNow(),
  finishedAt: timestamp("finished_at"),
  data: json("data").default({}),
  error: text("error"),
});

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

export const analyticsReports = pgTable("analytics_reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportType: text("report_type").notNull(), // daily, weekly, monthly, custom
  dateRange: json("date_range").notNull(), // {start: date, end: date}
  metrics: json("metrics").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

// ============================================================================
// SYSTEM TABLES
// ============================================================================

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull().unique(),
  permissions: json("permissions").default([]),
  lastUsedAt: timestamp("last_used_at"),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  action: text("action").notNull(),
  resource: text("resource").notNull(),
  resourceId: uuid("resource_id"),
  metadata: json("metadata").default({}),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// MOBILE PERFORMANCE TRACKING
// ============================================================================

export const mobileAnalytics = pgTable("mobile_analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }),
  url: text("url").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  deviceType: text("device_type").notNull(), // mobile, tablet, desktop
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  userAgent: text("user_agent"),
  connectionType: text("connection_type"), // 4g, wifi, slow-2g, etc
  performanceScore: integer("performance_score"),
  accessibilityScore: integer("accessibility_score"),
  bestPracticesScore: integer("best_practices_score"),
  seoScore: integer("seo_score"),
  pwaScore: integer("pwa_score"),
  firstContentfulPaint: decimal("first_contentful_paint", { precision: 8, scale: 2 }),
  largestContentfulPaint: decimal("largest_contentful_paint", { precision: 8, scale: 2 }),
  cumulativeLayoutShift: decimal("cumulative_layout_shift", { precision: 6, scale: 4 }),
  speedIndex: decimal("speed_index", { precision: 8, scale: 2 }),
  opportunities: json("opportunities").default([]),
});

export const lighthouseAudits = pgTable("lighthouse_audits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }),
  url: text("url").notNull(),
  strategy: text("strategy").notNull(), // mobile, desktop
  timestamp: timestamp("timestamp").defaultNow(),
  performanceScore: integer("performance_score"),
  accessibilityScore: integer("accessibility_score"),
  bestPracticesScore: integer("best_practices_score"),
  seoScore: integer("seo_score"),
  pwaScore: integer("pwa_score"),
  firstContentfulPaint: decimal("first_contentful_paint", { precision: 8, scale: 2 }),
  largestContentfulPaint: decimal("largest_contentful_paint", { precision: 8, scale: 2 }),
  cumulativeLayoutShift: decimal("cumulative_layout_shift", { precision: 6, scale: 4 }),
  speedIndex: decimal("speed_index", { precision: 8, scale: 2 }),
  opportunities: json("opportunities").default([]),
  diagnostics: json("diagnostics").default([]),
});

export const pageViews = pgTable("page_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  path: text("path").notNull(),
  title: text("title"),
  timestamp: timestamp("timestamp").defaultNow(),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  deviceType: text("device_type"),
  screenResolution: text("screen_resolution"),
  sessionId: text("session_id"),
});

// ============================================================================
// SCHEMA EXPORTS
// ============================================================================

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions);
export const insertSocialAccountSchema = createInsertSchema(socialAccounts);
export const insertWorkflowSchema = createInsertSchema(workflows);
export const insertMobileAnalyticsSchema = createInsertSchema(mobileAnalytics);
export const insertLighthouseAuditSchema = createInsertSchema(lighthouseAudits);
export const insertPageViewSchema = createInsertSchema(pageViews);

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type SocialAccount = typeof socialAccounts.$inferSelect;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type Workflow = typeof workflows.$inferSelect;
export type MobileAnalytics = typeof mobileAnalytics.$inferSelect;
export type InsertMobileAnalytics = typeof mobileAnalytics.$inferInsert;
export type LighthouseAudit = typeof lighthouseAudits.$inferSelect;
export type InsertLighthouseAudit = typeof lighthouseAudits.$inferInsert;
export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;
