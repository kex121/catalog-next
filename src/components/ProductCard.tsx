import React from 'react';

import Image from 'next/image';

import { categoryGradients, categoryColors } from '@/constants/categoryStyles';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

import type { Product } from '../types/product';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleAddToCart = () => {
    alert(
      `Вы добавили товар в корзину!\n\nНо, к сожалению, корзина пока отсутствует.`,
    );
  };

  const gradient =
    categoryGradients[product.category] ||
    'from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30';
  const badgeColor =
    categoryColors[product.category] ||
    'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-800';

  return (
    <Card className='w-full h-[420px] flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group bg-card'>
      <div
        className={`h-[160px] p-4 flex items-center justify-center bg-gradient-to-br ${gradient} relative`}
      >
        <div className='relative w-[140px] h-[140px] group-hover:scale-105 transition-transform duration-300'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes='140px'
            className='object-contain drop-shadow-md'
            loading='lazy'
          />
        </div>

        <div className='absolute top-0 right-0 w-20 h-20 bg-white/30 dark:bg-white/10 rounded-full blur-2xl'></div>
        <div className='absolute bottom-0 left-0 w-16 h-16 bg-white/20 dark:bg-white/5 rounded-full blur-xl'></div>
      </div>

      <CardContent className='flex-1 p-4 flex flex-col justify-between'>
        <div className='space-y-2.5'>
          <Badge
            variant='outline'
            className={`text-xs px-2.5 py-1 capitalize font-medium border ${badgeColor}`}
          >
            {product.category}
          </Badge>

          <h3
            className='font-semibold text-sm leading-tight overflow-hidden text-card-foreground'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '2.5rem',
              lineHeight: '1.25rem',
            }}
            title={product.title}
          >
            {product.title}
          </h3>

          <div className='flex items-center gap-1.5 text-xs'>
            <div className='flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-md'>
              <span className='text-yellow-500 dark:text-yellow-400'>⭐</span>
              <span className='font-semibold text-yellow-700 dark:text-yellow-300'>
                {product.rating.rate}
              </span>
            </div>
            <span className='text-muted-foreground'>
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className='pt-3 mt-3'>
          <span className='text-2xl font-bold text-primary'>
            ${product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Button
          className='w-full group-hover:scale-[1.02] transition-transform'
          size='default'
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};
