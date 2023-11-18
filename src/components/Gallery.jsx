// Gallery.jsx
import React from 'react';
const Gallery = () => {
    // Sample gallery data, you can replace it with your own data
    const images = [
        'https://images.unsplash.com/photo-1562362898-d1a9d124fd77?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1603641067483-e74571874a45?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        // Add more image URLs as needed
    ];

    return (
        <div className="gallery-container">
            <h1 className="gallery-title">Gallery</h1>
            <div className="image-container">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} className="gallery-image" />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
