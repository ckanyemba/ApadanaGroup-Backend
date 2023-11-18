import React from 'react';

const About = () => {
    return (
        <div className="about-background-image">
        <div className="about-container">
            <h1 className="about-heading">About Us:</h1>
            {/* Your existing content */}
            <p className="about-text">
                [Gothrone] is more than just a fashion. We are a conglomerate..., a "hub for artistic exploration, a platform for emerging talent, or a celebration of futurism, fashion, and art. Our journey began in 2022 with the vision of creating a safe space for freedom and artistic expression, an innovative space for sonic and visual expression, a safe haven for boundary-pushing art, or a blend of technology, fashion, and artistic exploration.
            </p>
            <h1 className="about-heading">Our Mission:</h1>
            {/* Your existing content */}
            <p className="about-text">
                At Gothrone, we strive to build a community of creatives and foster creativity, to push artistic boundaries, or provide a platform for emerging talent or artists while cultivating an environment and atmosphere that stimulates creative thinking, in a vibrant and inclusive community, in a futuristic cultural hub. We believe in the power of your creativity, innovative thinking, and individual self-expression. We also want you to build bonds not only with us but also with people you meet during our events to help you build your clientele and build a solid foundation in the creative industry.
            </p>
            <h1 className="about-heading">Join Us:</h1>
            {/* Your existing content */}
            <p className="about-text">
                At Gothrone, we strive to build a community of creatives and foster creativity, to push artistic boundaries, or provide a platform for emerging talent or artists while cultivating an environment and atmosphere that stimulates creative thinking, in a vibrant and inclusive community, in a futuristic cultural hub. We believe in the power of your creativity, innovative thinking, and individual self-expression. We also want you to build bonds not only with us but also with people you meet during our events to help you build your clientele and build a solid foundation in the create industry.
            </p>
            <h1 className="about-heading">Location</h1>
            <div className="map-container">
                {/* Add your embedded map */}
                <iframe
                    title="Gothrone Location Map"
                    width="100%"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LATITUDE_HERE!2dYOUR_LONGITUDE_HERE!3dYOUR_ZOOM_LEVEL_HERE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xYOUR_LATITUDE_HERE!2sYOUR_LONGITUDE_HERE!5e0!3m2!1sen!2sus!4vYOUR_MAP_API_KEY_HERE"
                />
            </div>
        </div>
        </div>
    );
}

export default About;
