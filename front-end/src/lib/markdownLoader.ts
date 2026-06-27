/**
 * Utility to load markdown content dynamically based on slug.
 */

/**
 * Replaces {PLACEHOLDER} tokens using JSON data first, then VITE_ env vars.
 */
function interpolate(
  content: string,
  data: Record<string, unknown> = {}
): string {
  return content.replace(/\{([A-Z0-9_]+)\}/g, (match, key) => {
    if (key in data) return String(data[key]);
    const value = import.meta.env[`VITE_${key}`];
    return value !== undefined ? String(value) : match;
  });
}

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
}

const markdownModules = import.meta.glob('../../content/**/*.md', {
  query: '?raw',
  import: 'default',
});

const jsonModules = import.meta.glob('../../content/**/*.json', {
  import: 'default',
});

async function loadOptionalModule<T>(
  modules: Record<string, () => Promise<unknown>>,
  paths: string[]
): Promise<T | null> {
  for (const path of paths) {
    const loader = modules[path];
    if (!loader) continue;

    return (await loader()) as T;
  }

  return null;
}

/**
 * Loads markdown content from the appropriate content directory.
 * Looks for translated content first at content/{lang}/..., then falls back
 * to the default English content tree.
 */
export async function loadMarkdownContent(
  documentSlug: string,
  categorySlug: string,
  categoryType: 'service' | 'government',
  language = 'en'
): Promise<MarkdownContent> {
  try {
    const dir = categoryType === 'government' ? 'government' : 'services';
    const localizedPrefix = `../../content/${language}/${dir}/${categorySlug}/${documentSlug}`;
    const defaultPrefix = `../../content/${dir}/${categorySlug}/${documentSlug}`;

    const data =
      (await loadOptionalModule<Record<string, unknown>>(jsonModules, [
        `${localizedPrefix}.json`,
        `${defaultPrefix}.json`,
      ])) ?? {};

    const rawContent = await loadOptionalModule<string>(markdownModules, [
      `${localizedPrefix}.md`,
      `${defaultPrefix}.md`,
    ]);

    if (!rawContent) {
      throw new Error(`Document not found: ${documentSlug}`);
    }

    const content = interpolate(rawContent, data);

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/^>\s*/, '').trim()
      : undefined;

    return { content, title, description, data };
  } catch (error) {
    console.error(
      `Failed to load markdown content for document: ${documentSlug}`,
      error
    );
    throw new Error(`Document not found: ${documentSlug}`);
  }
}
