// Server-only: Node's process module must never enter a browser/Studio bundle.
import process from 'node:process';

const noopClient = Object.freeze({
  enabled: false,
  async create() {}
});
let cachedClient;
let cachedConfig;

/** Lazily load the SDK; absent credentials never initiate a request. */
export async function getWriteClient() {
  try {
    if (typeof window !== 'undefined') return noopClient;
    const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) return noopClient;

    const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    // This project has no existing dataset fallback. Never guess a destination.
    const dataset = process.env.SANITY_SUBMISSIONS_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
    if (!projectId || !dataset) {
      console.error('[forms] save failed: Sanity project or dataset is not configured');
      return noopClient;
    }

    if (!cachedClient || cachedConfig.projectId !== projectId ||
        cachedConfig.dataset !== dataset || cachedConfig.token !== token) {
      const {createClient} = await import('@sanity/client');
      cachedClient = createClient({
        projectId,
        dataset,
        token,
        apiVersion: '2024-01-01',
        useCdn: false,
        timeout: 3000,
        maxRetries: 0
      });
      cachedConfig = {projectId, dataset, token};
    }

    const client = cachedClient;
    return {enabled: true, create: document => client.create(document)};
  } catch {
    // SDK errors can contain request details. Never log the error or credentials.
    console.error('[forms] save failed');
    return noopClient;
  }
}
