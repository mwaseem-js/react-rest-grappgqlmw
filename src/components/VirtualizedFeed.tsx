// VirtualizedFeed component using @tanstack/react-virtual
import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedFeed: React.FC = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedFeed;