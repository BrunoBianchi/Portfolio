// components/markdown-preview.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

// Componente para renderizar headings com IDs (mesmo do post-screen)
const HeadingRenderer = ({ level, children, ...props }: any) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Função para criar slug do texto
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/[\s_-]+/g, '-') // Substitui espaços e underscores por hífens
      .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
  };

  // Limpar markdown do texto
  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic
      .replace(/`([^`]+)`/g, '$1')     // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links
  };

  const textContent = typeof children === 'string' ? children : 
    React.Children.toArray(children).join('');
  
  const cleanedText = cleanMarkdown(textContent);
  const id = slugify(cleanedText);

  return (
    <Tag id={id} className="scroll-mt-20" {...props}>
      {children}
    </Tag>
  );
};

export function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className={`prose prose-base max-w-none ${className}`}>
        <p className="text-gray-500 italic">Preview will appear here as you type...</p>
      </div>
    );
  }

  return (
    <div className={`prose prose-base max-w-none prose-headings:scroll-mt-20 ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <HeadingRenderer level={1} {...props} />,
          h2: (props) => <HeadingRenderer level={2} {...props} />,
          h3: (props) => <HeadingRenderer level={3} {...props} />,
          h4: (props) => <HeadingRenderer level={4} {...props} />,
          h5: (props) => <HeadingRenderer level={5} {...props} />,
          h6: (props) => <HeadingRenderer level={6} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
