function parseBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function ArticleContent({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="flex flex-col gap-6 text-body-lg text-ink/80">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="text-h4 font-bold text-ink">
              {block.replace(/^###\s+/, "")}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="text-h3 font-bold text-ink">
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
