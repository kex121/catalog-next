'use client';

import { useMemo } from 'react';

import { ProductCard } from '../src/components/ProductCard';
import { useProducts } from '../src/hooks/useProducts';
import { useVirtualScroll } from '../src/hooks/useVirtualScroll';

export default function Home() {
  const { data: products, isLoading, error } = useProducts();

  const { visibleRange, loadMoreRef, hasMore } = useVirtualScroll({
    itemsPerPage: 12,
    totalItems: products?.length || 0,
    threshold: 0.5,
  });

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    return products.slice(visibleRange.start, visibleRange.end);
  }, [products, visibleRange]);

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-destructive mb-2">Ошибка загрузки</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Неизвестная ошибка'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Каталог товаров
          </h1>
          <p className="text-muted-foreground">
            {products && (
              <>
                Показано {visibleRange.end} из {products.length} товаров
              </>
            )}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Загрузка товаров...</p>
            </div>
          </div>
        )}

        {!isLoading && visibleProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div
              ref={loadMoreRef}
              className="flex items-center justify-center mt-10 mb-6"
            >
              {hasMore ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">
                    Загрузка товаров...
                  </span>
                </div>
              ) : (
                <div className="text-center py-8 border-t border-border w-full max-w-md">
                  <span className="text-sm text-muted-foreground">
                    Все товары загружены ({products?.length})
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {!isLoading && (!products || products.length === 0) && (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-2">
                Товары не найдены
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
