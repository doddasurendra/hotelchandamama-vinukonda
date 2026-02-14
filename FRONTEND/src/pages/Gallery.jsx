import React, { useState, useEffect } from 'react';
import { getGalleryImages } from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await getGalleryImages();
      setImages(response.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Gallery</h1>
          <p className="text-xl text-gray-600">
            Take a glimpse of our restaurant and delicious food
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <>
            {images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div
                    key={image._id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                      <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        View Full Size
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-xl">No images available yet.</p>
              </div>
            )}
          </>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-screen">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300"
              >
                ×
              </button>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || 'Gallery image'}
                className="max-w-full max-h-screen object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
