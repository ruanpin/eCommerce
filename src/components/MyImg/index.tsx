import { useState } from "react";
import { Loader2, CloudAlert } from "lucide-react";


const ImageWithLoading = ({ imgSrc }: { imgSrc: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {/* Loading Spinner */}
      {loading && !error && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
          <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
        </div>
      )}

      {/* Image Container */}
        <img
          src={imgSrc}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          alt="Loaded Content"
        />

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
          <CloudAlert />
          <p className="text-gray-500">image fail to load.</p>
        </div>
      )}
    </>
  );
};

export default ImageWithLoading;