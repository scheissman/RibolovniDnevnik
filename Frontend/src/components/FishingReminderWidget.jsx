import React, { useEffect } from "react";

const FishingReminderWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.fishingreminder.com/public/widgets/fishingtimes-callback?lat=45.5511100&lng=18.6938900";
    script.async = true;
    document.body.appendChild(script);

    // Callback function
    window.frmcallback = function (data) {
      document.getElementById("frmdr").innerHTML = data.html;
    };

    return () => {
      document.body.removeChild(script);
      delete window.frmcallback;
    };
  }, []);

  return (
    <div style={{ width: "150px" }}>
      <div id="frmdr"></div>
      <a href="https://www.fishingreminder.com" title="Fishing Calendar"></a>
    </div>
  );
};

export default FishingReminderWidget;
