'use client';

import { useCallback, useMemo } from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  isDraggable?: boolean;
  isResizable?: boolean;
  items?: number;
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  cols?: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
}

export default function GridLayout({
  isDraggable = true,
  isResizable = true,
  items = 10,
  rowHeight = 40,
  onLayoutChange = () => {},
  cols = { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
}: GridLayoutProps) {
  const generateLayouts = useCallback(() => {
    const times = [...Array(items)];

    const widths = { lg: 3, md: 4, sm: 6, xs: 12, xxs: 12 };

    return Object.keys(widths).reduce(
      (memo, breakpoint) => {
        const width = widths[breakpoint as keyof typeof widths];
        const columnCount = cols[breakpoint as keyof typeof cols];

        memo[breakpoint] = times.map((_, i) => ({
          x: (i * width) % columnCount,
          y: 0,
          w: width,
          h: 4,
          i: String(i),
        }));

        return memo;
      },
      {} as Record<string, Array<{ x: number; y: number; w: number; h: number; i: string }>>
    );
  }, [items, cols]);

  const layouts = useMemo(() => generateLayouts(), [generateLayouts]);

  const gridItems = useMemo(
    () =>
      [...Array(items)].map((_, i) => (
        <div
          key={i}
          className="border border-zinc-300 bg-zinc-200 w-full h-full select-none cursor-pointer flex items-center justify-center"
        >
          <span className="font-mono text-4xl">{i}</span>
        </div>
      )),
    [items]
  );

  const handleLayoutChange = useCallback(
    (layout: Layout[]) => {
      onLayoutChange(layout);
    },
    [onLayoutChange]
  );

  return (
    <div className="w-full">
      <ResponsiveReactGridLayout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        isDraggable={isDraggable}
        resizeHandles={['se', 's', 'e']} // 추가: 리사이즈 핸들 설정
        isResizable={isResizable}
        rowHeight={rowHeight}
        cols={cols}
      >
        {gridItems}
      </ResponsiveReactGridLayout>
    </div>
  );
}
