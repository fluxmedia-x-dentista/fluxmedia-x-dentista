import { Fragment, type ReactNode } from "react";

/**
 * Minimal, safe Markdown renderer.
 *
 * Supports: ## / ### headings, paragraphs, "- " bullet lists, **bold** and
 * [links](https://…). Everything is produced as React elements, so stored
 * content can never inject HTML (no dangerouslySetInnerHTML anywhere).
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${index}`}>{token.slice(2, -2)}</strong>,
      );
    } else {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("(") + 1, -1);
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={`${keyPrefix}-a-${index}`}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>,
      );
    }

    lastIndex = match.index + token.length;
    index += 1;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const lines = (source ?? "").replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  let paragraph: string[] = [];
  let bullets: string[] = [];

  const flushParagraph = (key: string) => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (text) blocks.push(<p key={key}>{renderInline(text, key)}</p>);
  };

  const flushBullets = (key: string) => {
    if (bullets.length === 0) return;
    const items = [...bullets];
    bullets = [];
    blocks.push(
      <ul key={key}>
        {items.map((item, index) => (
          <li key={`${key}-${index}`}>
            {renderInline(item, `${key}-${index}`)}
          </li>
        ))}
      </ul>,
    );
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trimEnd();
    const key = `md-${lineIndex}`;

    if (line.startsWith("### ")) {
      flushParagraph(`${key}-p`);
      flushBullets(`${key}-u`);
      blocks.push(<h3 key={key}>{renderInline(line.slice(4), key)}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph(`${key}-p`);
      flushBullets(`${key}-u`);
      blocks.push(<h2 key={key}>{renderInline(line.slice(3), key)}</h2>);
      return;
    }

    if (/^[-•]\s+/.test(line.trimStart())) {
      flushParagraph(`${key}-p`);
      bullets.push(line.trimStart().replace(/^[-•]\s+/, ""));
      return;
    }

    if (line.trim() === "") {
      flushParagraph(`${key}-p`);
      flushBullets(`${key}-u`);
      return;
    }

    flushBullets(`${key}-u`);
    paragraph.push(line.trim());
  });

  flushParagraph("md-tail-p");
  flushBullets("md-tail-u");

  return (
    <div className="prose-fx max-w-none">
      {blocks.map((block, index) => (
        <Fragment key={index}>{block}</Fragment>
      ))}
    </div>
  );
}
