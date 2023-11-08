import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="mt-2 spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
