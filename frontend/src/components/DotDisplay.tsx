'use client';

interface DotDisplayProps {
  dotArt: string;
  color?: string;
}

export default function DotDisplay({ dotArt, color = '#000000' }: DotDisplayProps) {
  return (
    <div className="font-mono text-sm whitespace-pre p-4 rounded-lg bg-gray-50">
      {dotArt.split('\n').map((line, i) => (
        <div key={i} style={{ color }}>
          {line}
        </div>
      ))}
    </div>
  );
}
