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

    // Função para detectar scroll manual - mais confiável
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset para melhor detecção
      
      let currentActiveId = '';
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            currentActiveId = heading.id;
          } else {
            break;
          }
        }
      }
      
      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    // Observer como fallback
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          
          if (topEntry.target.id !== activeId) {
            setActiveId(topEntry.target.id);
          }
        }
      },
      {
        rootMargin: '-10% 0% -50% 0%',
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    // Observar todos os headings
    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executa uma vez para definir o estado inicial

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, activeId]);

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
