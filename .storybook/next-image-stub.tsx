export default function Image(props: any) {
  const { src, alt, fill, className, style, loading, ...rest } = props;

  let imageUrl: string;

  if (typeof src === 'string') {
    imageUrl = src;
  } else if (src?.src) {
    imageUrl = src.src;
  } else {
    imageUrl = '';
  }

  if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    console.warn('⚠️ Relative image URL detected:', imageUrl);
  }

  console.log('📸 Final Image URL:', imageUrl);

  if (fill) {
    return (
      <img
        src={imageUrl}
        alt={alt || 'Product image'}
        className={className}
        style={{
          objectFit: className?.includes('object-contain')
            ? 'contain'
            : 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          ...style,
        }}
        loading={loading || 'lazy'}
        onLoad={() => console.log('Изображение успешно загружено')}
        onError={(e) => {
          console.error('Ошибка загрузки изображения', imageUrl);
          const img = e.target as HTMLImageElement;
          img.style.background =
            'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
        }}
        {...rest}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || 'Product image'}
      className={className}
      style={style}
      loading={loading || 'lazy'}
      onLoad={() => console.log('Изображение успешно загружено')}
      onError={(e) => {
        console.error('Ошибка загрузки изображения', imageUrl);
      }}
      {...rest}
    />
  );
}
