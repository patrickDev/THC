import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Guard against hot-reload creating multiple connections in dev
const globalForDb = globalThis as unknown as {
  _thcDbClient: ReturnType<typeof createClient> | undefined;
};

function createDbClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');

  const authToken = process.env.DATABASE_AUTH_TOKEN;

  return createClient({
    url,
    // Only pass authToken when it is present (Turso prod); local file mode ignores it
    ...(authToken ? { authToken } : {}),
  });
}

const client = globalForDb._thcDbClient ?? createDbClient();

if (process.env.NODE_ENV !== 'production') {
  globalForDb._thcDbClient = client;
}

export const db = drizzle(client, { schema });

// Enable foreign key enforcement — SQLite does NOT do this by default
export async function enableForeignKeys() {
  await client.execute('PRAGMA foreign_keys = ON');
}
