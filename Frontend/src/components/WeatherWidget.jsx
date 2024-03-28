import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'weatherwidget-io-js';
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="weather-widget-footer">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/hr/45d5518d70/osijek/"
        data-label_1="OSIJEK"
        data-label_2="WEATHER"
        data-days="3"
        data-theme="original"
      >
        OSIJEK WEATHER
      </a>
    </footer>
  );
};

export default WeatherWidget;
