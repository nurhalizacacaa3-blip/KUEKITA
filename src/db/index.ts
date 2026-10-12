import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const rawDatabaseUrl = process.env.DATABASE_URL || '';
const hasValidDatabaseUrl = Boolean(rawDatabaseUrl) && !rawDatabaseUrl.includes('placeholder');

if (hasValidDatabaseUrl) {
  neonConfig.fetchConnectionCache = true;
}

export const db = hasValidDatabaseUrl
  ? drizzle(neon(rawDatabaseUrl), { schema })
  : null;
