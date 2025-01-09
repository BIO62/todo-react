// Footer.js
import React from "react";

const FooterHidden = ({ completedCount, totalCount, handleDeleteAll }) => {
  return (
    <div className="footer">
      <div className="tasks-completed">
        {completedCount} of {totalCount} tasks completed
      </div>
      <div className="delete-btn" onClick={handleDeleteAll}>
        Clear Completed
      </div>
    </div>
  );
};

export default FooterHidden;
