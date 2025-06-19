// Crie um arquivo app/utils/markdown.ts
export function stripMarkdown(markdown: string): string {
  return markdown
    // Remove headers
    .replace(/#{1,6}\s+/g, '')
    // Remove bold **text** e __text__
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    // Remove italic *text* e _text_
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove code blocks ```code``` e `code`
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/>\s+/g, '')
    // Remove listas - e *
    .replace(/^\s*[-*+]\s+/gm, '')
    // Remove quebras de linha extras
    .replace(/\n+/g, ' ')
    // Remove espaços extras
    .replace(/\s+/g, ' ')
    .trim();
}