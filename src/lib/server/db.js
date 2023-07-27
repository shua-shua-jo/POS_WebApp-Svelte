import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import {
	DB_USER_HOST,
	DB_USER_PASSWORD,
	DB_USER_USERNAME,
	DB_ADMIN_HOST,
	DB_ADMIN_PASSWORD,
	DB_ADMIN_USERNAME
} from '$env/static/private';

const user_connection = connect({
	host: DB_USER_HOST,
	username: DB_USER_USERNAME,
	password: DB_USER_PASSWORD
});

const admin_connection = connect({
	host: DB_ADMIN_HOST,
	username: DB_ADMIN_USERNAME,
	password: DB_ADMIN_PASSWORD
});

export const db_user = drizzle(user_connection);
export const db_admin = drizzle(admin_connection);
