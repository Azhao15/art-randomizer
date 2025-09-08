export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gallery-sage/20 border-t-gallery-sage rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-gallery-gold rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
      </div>
    </div>
  );
};