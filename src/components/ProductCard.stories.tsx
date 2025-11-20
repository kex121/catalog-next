import { ProductCard } from './ProductCard';

import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description: 'Your perfect pack for everyday use',
  category: "men's clothing",
  image: 'https://placehold.co/400x400/e2e8f0/334155?text=Backpack&font=raleway',
  rating: {
    rate: 3.9,
    count: 120,
  },
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const Electronics: Story = {
  args: {
    product: {
      id: 2,
      title: 'Samsung 49-Inch CHG90 Gaming Monitor',
      price: 999.99,
      description: '49 INCH SUPER ULTRAWIDE',
      category: 'electronics',
      image: 'https://placehold.co/400x400/dbeafe/1e40af?text=Monitor&font=raleway',
      rating: {
        rate: 4.5,
        count: 250,
      },
    },
  },
};

export const Jewelry: Story = {
  args: {
    product: {
      id: 3,
      title: 'White Gold Plated Princess Diamond Ring',
      price: 9.99,
      description: 'Classic ring',
      category: 'jewelery',
      image: 'https://placehold.co/400x400/fae8ff/86198f?text=Ring&font=raleway',
      rating: {
        rate: 3.0,
        count: 400,
      },
    },
  },
};

export const WomensClothing: Story = {
  args: {
    product: {
      id: 4,
      title: "Women's Soft Casual T-Shirt",
      price: 29.99,
      description: 'Comfortable everyday wear',
      category: "women's clothing",
      image: 'https://placehold.co/400x400/ffe4e6/be123c?text=T-Shirt&font=raleway',
      rating: {
        rate: 4.2,
        count: 180,
      },
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div
      className="grid grid-cols-4 gap-6 p-8 bg-background"
      style={{ width: '1200px' }}
    >
      {[
        { cat: "men's clothing", color: 'e2e8f0/334155', text: 'Men' },
        { cat: 'electronics', color: 'dbeafe/1e40af', text: 'Electronics' },
        { cat: 'jewelery', color: 'fae8ff/86198f', text: 'Jewelry' },
        { cat: "women's clothing", color: 'ffe4e6/be123c', text: 'Women' },
      ].map((item, i) => (
        <ProductCard
          key={i}
          product={{
            ...mockProduct,
            id: i,
            category: item.cat,
            image: `https://placehold.co/400x400/${item.color}?text=${item.text}&font=raleway`,
            title: `${item.text} Product ${i + 1}`,
          }}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
