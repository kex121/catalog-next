import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVirtualScrollOptions {
  itemsPerPage: number;
  totalItems: number;
  threshold?: number;
}

export function useVirtualScroll({
  itemsPerPage,
  totalItems,
  threshold = 0.5,
}: UseVirtualScrollOptions) {
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: itemsPerPage,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setVisibleRange((prev) => {
      const newEnd = Math.min(prev.end + itemsPerPage, totalItems);
      return { start: 0, end: newEnd };
    });
  }, [itemsPerPage, totalItems]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleRange.end < totalItems) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold,
      },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, visibleRange.end, totalItems, threshold]);

  return {
    visibleRange,
    loadMoreRef,
    hasMore: visibleRange.end < totalItems,
  };
}
