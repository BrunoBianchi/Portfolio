// hooks/useActiveSection.ts
import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useActiveSection(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Encontrar a entrada que está mais visível
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Pegar o primeiro elemento visível (mais próximo do topo)
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%', // Ativa quando o elemento está na parte superior da viewport
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observar todos os headings
    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // Função para scroll suave até uma seção
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset para não ficar colado no topo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return { activeId, scrollToSection };
}
