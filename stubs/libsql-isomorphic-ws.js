// Stub for @libsql/isomorphic-ws in the Cloudflare Workers (workerd) environment.
// WebSocket is a built-in global in workerd, so we just re-export it.
// This code is only reached if the libsql dev path is somehow invoked,
// which cannot happen in production (guarded by NODE_ENV === 'production').
export const WebSocket = globalThis.WebSocket;
