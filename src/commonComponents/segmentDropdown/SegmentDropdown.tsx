
import React, { useState } from "react";
import "./SegmentDropdown.css";
import { FaAngleDown } from "react-icons/fa";

interface SchemaOption {
  id: number;
  Label: string;
}

interface DropDownProps {
  value: string;
  options: SchemaOption[];
  handleChange: (val: SchemaOption, id: number) => void;
  id: number;
  handleDelete: (id: number) => void;
}

const SegmentDropdown: React.FC<DropDownProps> = ({
  value,
  options,
  handleChange,
  id,
  handleDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelected = (val: SchemaOption) => {
    handleChange(val, id);
    setSelectedValue(val.Label);
    handleIsOpen();
  };

  const getColor = (value: string) => {
    switch (value) {
      case "First name":
        return "#4bcebc";
      case "Account Name":
        return "#d22020";
      default:
        return "#d5eff9";
    }
  };

  return (
    <div className="schema-dropdown-container">
      <div
        className="schema-dropdown-type"
        style={{ backgroundColor: getColor(value) }}
      ></div>
      <div className="schema-dropdown-body" onClick={handleIsOpen}>
        <div className="schema-dropdown-input">{value || selectedValue}</div>
        <div className="schema-dropdown-icon">
          <FaAngleDown style={{ fontSize: "1.2rem", color: " #5a7c93" }} />
        </div>
        <div className={`schema-dropdown-list ${isOpen ? "visible" : ""}`}>
          {options.map((eachItem) => (
            <div
              key={eachItem.id}
              className="schema-dropdown-list-item"
              onClick={() => handleSelected(eachItem)}
            >
              {eachItem.Label}
            </div>
          ))}
        </div>
      </div>
      <div className="schema-dropdown-delete" onClick={() => handleDelete(id)}>
        <div className="schema-dropdown-delete-icon"></div>
      </div>
    </div>
  );
};

export default SegmentDropdown;
