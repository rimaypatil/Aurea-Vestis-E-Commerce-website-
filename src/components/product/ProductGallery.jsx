import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No Image Available</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails - Vertical on Desktop, Horizontal on Mobile */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 md:h-[600px] scrollbar-hide">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-20 md:w-full md:h-24 rounded-md overflow-hidden border-2 transition-all ${selectedImage === index
                                ? 'border-brand-primary ring-1 ring-brand-primary'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-gray-50 rounded-lg overflow-hidden h-[400px] md:h-[600px] group">
                <img
                    src={images[selectedImage]}
                    alt="Product View"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Simple Zoom Hint */}
                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" /> */}
            </div>
        </div>
    );
};

export default ProductGallery;
