import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UserSchema = pgTable('User', {
	id: uuid('id').defaultRandom().primaryKey(),
	email: varchar('email', {length: 128}).notNull(),
	name: varchar('name', {length: 128}).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});