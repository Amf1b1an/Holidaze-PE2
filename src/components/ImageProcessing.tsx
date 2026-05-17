import { useState, useEffect } from "react";

interface ImageProcessingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  filter?: string;
}

export default function ImageProcessing({
  src,
  alt,
  fallback = "https://placehold.co/800x450?text=Holidaze+Venue",
  className = "",
  filter = "",
  ...props
}: ImageProcessingProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setImgSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#007878]/10 animate-pulse">
          <div className="w-8 h-8 border-4 border-[#FF8800] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        {...props}
        src={hasError ? fallback : imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`
          w-full h-full object-cover transition-all duration-700 ease-in-out
          ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          ${filter} 
          ${className}
        `}
      />
    </div>
  );
}
