import "./List.css";

const List = ({ label, handleChange }) => {
  return (
    <label className="list">
      <input
        id={label.at(-1)}
        type="checkbox"
        onChange={(e) => handleChange(e)}
      />
      {label}
    </label>
  );
};

export default List;
