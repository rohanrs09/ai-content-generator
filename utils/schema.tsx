// In utils/schema.ts
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Existing AIOutput table
export const AIOutput = pgTable('ai_output', {
  id: serial('id').primaryKey(),
  formData: text('form_data'),
  aiResponse: text('ai_response'),
  templateSlug: text('template_slug'),
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Add a new table for user subscription data
export const userSubscriptions = pgTable('user_subscriptions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email'),
  plan: text('plan').default('free'),
  creditLimit: integer('credit_limit').default(10000),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
  nextBillingDate: timestamp('next_billing_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});