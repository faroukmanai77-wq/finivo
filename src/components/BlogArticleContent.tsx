import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, XCircle, CreditCard, Info } from 'lucide-react';

interface BlogArticleContentProps {
  content: string;
}

export const BlogArticleContent: React.FC<BlogArticleContentProps> = ({ content }) => {
  const parseContent = (text: string) => {
    const lines = text.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Skip empty lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // H2 headers
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-3">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            {line.replace('## ', '')}
          </h2>
        );
        i++;
        continue;
      }

      // H3 headers
      if (line.startsWith('### ')) {
        const headerText = line.replace('### ', '');
        const isError = headerText.includes('❌');
        const isPin = headerText.includes('📌');
        
        elements.push(
          <h3 key={key++} className={`text-xl font-semibold mt-8 mb-3 ${isError ? 'text-destructive' : isPin ? 'text-primary' : 'text-foreground'}`}>
            {headerText}
          </h3>
        );
        i++;
        continue;
      }

      // Table detection
      if (line.includes('|') && lines[i + 1]?.includes('---')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        elements.push(renderTable(tableLines, key++));
        continue;
      }

      // List items
      if (line.startsWith('- ')) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].replace('- ', ''));
          i++;
        }
        elements.push(renderList(listItems, key++));
        continue;
      }

      // Callout detection (lines starting with emojis)
      if (line.match(/^[💡⚠️✅❌📌🛒⛽💻🏨💳➡️]/)) {
        elements.push(renderCallout(line, key++));
        i++;
        continue;
      }

      // Italic notes
      if (line.startsWith('*(') || line.startsWith('*')) {
        elements.push(
          <p key={key++} className="text-sm text-muted-foreground italic my-4 pl-4 border-l-2 border-border">
            {line.replace(/^\*\(?|\)\*$/g, '').replace(/^\*|\*$/g, '')}
          </p>
        );
        i++;
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed my-4">
          {formatInlineStyles(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  const formatInlineStyles = (text: string): React.ReactNode => {
    // Handle bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderTable = (lines: string[], key: number): React.ReactNode => {
    const headers = lines[0].split('|').filter(cell => cell.trim());
    const rows = lines.slice(2).map(line => line.split('|').filter(cell => cell.trim()));

    return (
      <div key={key} className="my-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  {header.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-muted/30 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-sm text-muted-foreground">
                    {formatInlineStyles(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderList = (items: string[], key: number): React.ReactNode => {
    // Determine list type based on content
    const hasErrors = items.some(item => item.includes('❌'));
    const hasSuccess = items.some(item => item.includes('✅') || item.includes('➡️'));
    const hasCards = items.some(item => item.includes('💳'));
    const hasInfo = items.some(item => item.includes('📌'));

    return (
      <ul key={key} className="my-6 space-y-3">
        {items.map((item, idx) => {
          let icon = null;
          let bgClass = 'bg-muted/50';
          let borderClass = 'border-border';
          
          if (item.includes('❌')) {
            icon = <XCircle className="w-5 h-5 text-destructive shrink-0" />;
            bgClass = 'bg-destructive/5';
            borderClass = 'border-destructive/20';
          } else if (item.includes('✅')) {
            icon = <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
            bgClass = 'bg-emerald-500/5';
            borderClass = 'border-emerald-500/20';
          } else if (item.includes('➡️')) {
            icon = <CheckCircle className="w-5 h-5 text-primary shrink-0" />;
            bgClass = 'bg-primary/5';
            borderClass = 'border-primary/20';
          } else if (item.includes('💳')) {
            icon = <CreditCard className="w-5 h-5 text-primary shrink-0" />;
            bgClass = 'bg-primary/5';
            borderClass = 'border-primary/20';
          } else if (item.includes('📌')) {
            icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
            bgClass = 'bg-blue-500/5';
            borderClass = 'border-blue-500/20';
          } else if (item.match(/^[🛒⛽💻🏨]/)) {
            bgClass = 'bg-accent/50';
            borderClass = 'border-accent';
          }

          // Clean the item text from emojis for display
          const cleanText = item.replace(/^[💳❌✅➡️📌🛒⛽💻🏨]\s*/, '');

          return (
            <li 
              key={idx} 
              className={`flex items-start gap-3 p-4 rounded-xl border ${bgClass} ${borderClass} transition-all hover:shadow-sm`}
            >
              {icon || <span className="text-lg">{item.match(/^[🛒⛽💻🏨]/)?.[0]}</span>}
              <span className="text-foreground">{formatInlineStyles(cleanText)}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderCallout = (line: string, key: number): React.ReactNode => {
    const isTip = line.includes('💡');
    const isWarning = line.includes('⚠️');
    const isSolution = line.includes('➡️');

    if (isTip) {
      return (
        <div key={key} className="my-6 p-5 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Astuce</span>
            <p className="text-foreground mt-1">
              {formatInlineStyles(line.replace(/^💡\s*/, '').replace(/^\*\*Astuce\*\*\s*:\s*/, ''))}
            </p>
          </div>
        </div>
      );
    }

    if (isWarning) {
      return (
        <div key={key} className="my-6 p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-sm font-semibold text-amber-500 uppercase tracking-wide">Attention</span>
            <p className="text-foreground mt-1">
              {formatInlineStyles(line.replace(/^⚠️\s*/, ''))}
            </p>
          </div>
        </div>
      );
    }

    if (isSolution) {
      return (
        <div key={key} className="my-4 p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
          <p className="text-foreground">
            {formatInlineStyles(line.replace(/^➡️\s*/, ''))}
          </p>
        </div>
      );
    }

    return (
      <p key={key} className="text-muted-foreground my-4">
        {formatInlineStyles(line)}
      </p>
    );
  };

  return (
    <div className="blog-content">
      {parseContent(content)}
    </div>
  );
};
