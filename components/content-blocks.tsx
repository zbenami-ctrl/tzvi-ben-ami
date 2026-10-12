import type { Block } from "@/lib/pages";

// Ties the last three words of a paragraph together, so it never ends on a line of one or two words.
export function keepLastWords(text: string) {
  return text.replace(/ (\S+) (\S+)\s*$/, "\u00a0$1\u00a0$2");
}

export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) =>
    block.kind === "quote"
      ? <blockquote className="pull-quote" key={index}>{keepLastWords(block.text)}</blockquote>
      : <p key={index}>{keepLastWords(block.text)}</p>,
  );
}

// Shows the first paragraphs, folds the rest behind a "read more" toggle, and keeps quotes visible after it.
export function FoldedBlocks({ blocks, visible = 2, label }: { blocks: Block[]; visible?: number; label: string }) {
  const paragraphs = blocks.filter((block) => block.kind === "paragraph");
  const quotes = blocks.filter((block) => block.kind === "quote");
  const folded = paragraphs.slice(visible);
  return (
    <>
      <ContentBlocks blocks={paragraphs.slice(0, visible)} />
      {folded.length > 0 && (
        <details className="read-more">
          <summary>{label}</summary>
          <ContentBlocks blocks={folded} />
        </details>
      )}
      <ContentBlocks blocks={quotes} />
    </>
  );
}
