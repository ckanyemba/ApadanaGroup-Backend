// Events.js

import React, { useState, useEffect } from 'react';

const Events = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    // Fetch events data from an API or any other data source
    // For example, using the Fetch API
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.example.com/events');
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the fetchEvents function to get events data
    fetchEvents();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>
      {eventData.length > 0 ? (
        <ul className="events-list">
          {eventData.map((event) => (
            <li key={event.id} className="events-item">
              <h2>{event.title}</h2>
              <p className="events-description">{event.description}</p>
              <p>Date: {event.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="events-no-data">No events available</p>
      )}
    </div>
  );
};

export default Events;
