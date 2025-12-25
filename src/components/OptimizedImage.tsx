// filepath: c:\Users\Administrator\Desktop\port\src\components\OptimizedImage.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized source URLs
  const generateSrcSet = (originalSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(width => {
        // For external images, return as-is
        if (originalSrc.startsWith('http')) {
          return `${originalSrc} ${width}w`;
        }
        // For local images, you could implement your own optimization
        return `${originalSrc}?w=${width}&q=${quality} ${width}w`;
      })
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Show placeholder while not in view or loading
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-slate-800 animate-pulse ${className}`}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      >
        {placeholder === 'blur' && blurDataURL && (
          <img
            src={blurDataURL}
            alt=""
            className="w-full h-full object-cover filter blur-sm opacity-50"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`bg-slate-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg
          className="w-8 h-8 text-slate-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcSet={generateSrcSet(src)}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto'
        }}
      />
    </motion.div>
  );
};

export default OptimizedImage;