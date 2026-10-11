import fs from "node:fs";
import path from "node:path";
import type { Language } from "@/components/site-header";
import { typeset } from "./typography";

export type Block = { kind: "paragraph" | "quote"; text: string };
export type Section = { id: string; heading: string; blocks: Block[] };
export type PageContent = { meta: Record<string, string>; sections: Section[] };

const contentDir = path.join(process.cwd(), "content");

// Reads content/<language>/<page>.md — see content/README.md for the format.
export function readPage(language: Language, page: string): PageContent {
  const source = fs.readFileSync(path.join(contentDir, language, `${page}.md`), "utf8").replace(/\r\n/g, "\n");
  const withoutComments = source.replace(/<!--[\s\S]*?-->/g, "");
  const frontmatter = withoutComments.match(/^---\n([\s\S]*?)\n---\n/);

  const meta: Record<string, string> = {};
  for (const line of frontmatter?.[1].split("\n") ?? []) {
    const separator = line.indexOf(":");
    if (separator > 0) meta[line.slice(0, separator).trim()] = typeset(line.slice(separator + 1).trim());
  }

  const body = frontmatter ? withoutComments.slice(frontmatter[0].length) : withoutComments;
  const sections: Section[] = [];
  for (const chunk of body.split(/^## /m).slice(1)) {
    const [headingLine, ...rest] = chunk.split("\n");
    const idMatch = headingLine.match(/\{#([^}]+)\}\s*$/);
    const blocks = rest
      .join("\n")
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block): Block => block.startsWith(">")
        ? { kind: "quote", text: typeset(block.replace(/^>\s?/gm, "")) }
        : { kind: "paragraph", text: typeset(block) });
    sections.push({
      id: idMatch?.[1] ?? "",
      heading: typeset(headingLine.replace(/\{#[^}]+\}\s*$/, "").trim()),
      blocks,
    });
  }

  return { meta, sections };
}

export function section(page: PageContent, id: string): Section {
  const found = page.sections.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`Missing section {#${id}} in content`);
  return found;
}
