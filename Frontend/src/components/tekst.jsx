import React from "react";

function MyComponent() {
  const text = `
  Ribolovni Dnevnik je web aplikacija koja nadopunjuje  forum.
  
  Služi kao zamjena za  razne bilježnice, te  omogućuje 
  
  vođenje detaljne evidencije ulova, vodostaja i drugih bitnih 
  
  informacija koje bilježite. Svakako isprobajte
                                                                                Bistro!!!!
  `;
  const style = {
    whiteSpace: "pre-wrap",
  };

  return <div style={style}>{text}</div>;
}

export default MyComponent;
