const Filter = (props) => {
  const { filterState, handleFilterState } = props;

  return (
    <div id="btns">
      <div
        className={`all-btn ${filterState === "ALL" ? "selected" : ""}`}
        onClick={() => handleFilterState("ALL")}
      >
        All
      </div>
      <div
        className={`active-btn ${filterState === "ACTIVE" ? "selected" : ""}`}
        onClick={() => handleFilterState("ACTIVE")}
      >
        Active
      </div>
      <div
        className={`comp-btn ${filterState === "DONE" ? "selected" : ""}`}
        onClick={() => handleFilterState("DONE")}
      >
        Completed
      </div>
      <div
        className={`log-btn ${filterState === "LOG" ? "selected" : ""}`}
        onClick={() => handleFilterState("LOG")}
      >
        #LOG
      </div>
    </div>
  );
};
export default Filter;
