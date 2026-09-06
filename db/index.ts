import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import * as schema from './schema';

// Use the D1 type as the canonical DB type (same query API as libsql)
type Db = ReturnType<typeof drizzleD1<typeof schema>>;

// Dev singleton guard
const _g = globalThis as unknown as { _thcDevDb: Db | undefined };

async function getDevDb(): Promise<Db> {
  if (!_g._thcDevDb) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    // Dynamic imports keep @libsql out of the Cloudflare Workers bundle
    const [{ drizzle }, { createClient }] = await Promise.all([
      import('drizzle-orm/libsql'),
      import('@libsql/client/web'),
    ]);
    const client = createClient({
      url,
      ...(process.env.DATABASE_AUTH_TOKEN ? { authToken: process.env.DATABASE_AUTH_TOKEN } : {}),
    });
    _g._thcDevDb = drizzle(client, { schema }) as unknown as Db;
  }
  return _g._thcDevDb!;
}

export async function getDb(): Promise<Db> {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require('@opennextjs/cloudflare') as typeof import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return drizzleD1((env as any).DB, { schema });
  }
  return getDevDb();
}

export async function enableForeignKeys() {
  // D1 handles FK constraints natively; only needed for local libsql
  if (process.env.NODE_ENV !== 'production') {
    const { sql } = await import('drizzle-orm');
    const db = await getDevDb();
    await db.run(sql`PRAGMA foreign_keys = ON`);
  }
}
