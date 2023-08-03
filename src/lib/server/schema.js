import { relations, sql } from 'drizzle-orm';
import {
	int,
	varchar,
	date,
	serial,
	boolean,
	mysqlTable,
	timestamp,
	char
} from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('usersTable', {
	id: serial('id').primaryKey(),
	first_name: varchar('first_name', { length: 60 }).notNull(),
	middle_name: varchar('middle_name', { length: 60 }).notNull(),
	last_name: varchar('last_name', { length: 60 }).notNull(),
	email: varchar('email', { length: 60 }).unique().notNull(),
	student_number: varchar('student_number', { length: 9 }).unique().notNull(),
	year_level: varchar('year_level', { length: 15 }).notNull(),
	is_scholar: boolean('is_scholar').notNull(),
	purpose: varchar('purpose', { length: 255 }).notNull(),
	payment_method: varchar('payment_method', { length: 10 }).notNull(),
	request_date: timestamp('request_date').default(sql`CURRENT_TIMESTAMP`),
	payment_date: timestamp('payment_date'),
	request_paid: boolean('request_paid').default(false),
	request_approved: boolean('request_approved').default(false),
	documents_approved: boolean('documents_approved').default(false),
	request_available: boolean('request_available').default(false),
	total_price: int('total_price').notNull()
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	requests: many(requestsTable)
}));

export const requestsTable = mysqlTable('requestsTable', {
	id: serial('id').primaryKey(),
	document: varchar('document', { length: 100 }).notNull(),
	price: int('price').notNull(),
	userId: int('userId').notNull()
});

export const requestsRelations = relations(requestsTable, ({ one }) => ({
	users: one(usersTable, {
		fields: [requestsTable.userId],
		references: [usersTable.id]
	})
}));

export const adminTable = mysqlTable('adminTable', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 60 }).notNull(),
	password: char('password', { length: 60 }).notNull()
});

export const requirementsTable = mysqlTable('requirementsTable', {
	id: serial('id').primaryKey(),
	upload_date: date('upload_date').notNull(),
	tcg_format: varchar('tcg_format', { length: 15 }),
	file_name: varchar('file_name', { length: 100 }),
	requirement_type: varchar('requirement_type', { length: 70 }),
	userId: int('userId').notNull()
});
