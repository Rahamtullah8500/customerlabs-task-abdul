import React, { useEffect, useState } from "react";
import "./Segment.css";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import SegmentDropdown from "../commonComponents/segmentDropdown/SegmentDropdown";

interface SchemaOption {
  id: number;
  Label: string;
  Value: string;
}

interface SegmentData {
  segment_name: string;
  schema: Array<{ [key: string]: string }>;
}

const options: SchemaOption[] = [
  { id: 1, Label: "First name", Value: "first_name" },
  { id: 2, Label: "Last name", Value: "last_name" },
  { id: 3, Label: "Gender", Value: "gender" },
  { id: 4, Label: "Age", Value: "age" },
  { id: 5, Label: "Account Name", Value: "account_name" },
  { id: 6, Label: "State", Value: "state" },
];

const Segment: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState<SchemaOption | string>("Add schema to segment");
  const [schemas, setSchemas] = useState<SchemaOption[]>([]);
  const [segmentData, setSegmentData] = useState<SegmentData>({
    segment_name: "",
    schema: [],
  });

  useEffect(() => {
    if (schemas.length) {
      const finalSchemas = schemas.map((eachSchema) => {
        const option = { [eachSchema.Value]: eachSchema.Label };
        return { ...option };
      });
      setSegmentData((prev) => ({ ...prev, schema: finalSchemas }));
    }
  }, [schemas]);

  const handleSelectedSchema = (val: SchemaOption | string) => {
    setSelectedSchema(val);
  };

  const handleEdit = (val: SchemaOption, id: number) => {
    const updatedSchemas = schemas.map((eachItem) =>
      eachItem.id === id ? val : eachItem
    );
    setSchemas(updatedSchemas);
  };

  const handleAddSchema = () => {
    if (typeof selectedSchema !== "string" && selectedSchema.id) {
      setSchemas((prevVal) => [...prevVal, selectedSchema]);
    }
    setSelectedSchema("Add schema to segment");
  };

  const handleSegmentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSegmentData((prevVal) => ({ ...prevVal, segment_name: e.target.value }));
  };

  const notSelectedItems: SchemaOption[] = options.filter(
    (item1) => !schemas.some((item2) => item1.id === item2.id)
  );

  const handleCancel = () => {
    setSelectedSchema("Add schema to segment");
  };

  const handleDeleteSchema = (id: number) => {
    setSchemas(schemas.filter((schema) => schema.id !== id));
  };

  const handleSendingDataToServer = () => {
    const url = "https://webhook.site/0bc43187-b74c-46de-8b4e-87a9613aa85a";

    axios
      .post(url, segmentData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response:Response) => {
        setSegmentData({
          segment_name: "",
          schema: [],
        });
        setSchemas([]);
        console.log("Data sent successfully:", response.data);
      })
      .catch((error:Error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="segment-container">
      <button
        className="btn save-segment-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Save segment
      </button>
      <div
        className="offcanvas offcanvas-end segment-popup-container"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div className="segment-popup-header">
            <FaAngleLeft
              type="button"
              className="bi bi-chevron-left"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            />
            <h5 className="offcanvas-title">Saving Segment</h5>
          </div>
        </div>
        <div className="offcanvas-body segment-popup-body-main">
          <div className="segment-popup-body">
            <div>Enter the Name of the Segment</div>
            <input
              className="segment-name-input"
              onChange={handleSegmentName}
              placeholder="Name of the segment"
            />
            <div className="segment-popup-text">
              To save your segment, you need to add the schemas to build the
              query
            </div>
            <div className="segment-legend-container">
              <div className="segment-legend-body">
                <div
                  className="segment-legend-color"
                  style={{ backgroundColor: "#4FBDBA" }}
                ></div>
                <div className="segment-legend-text"> -User Traits</div>
              </div>
              <div className="segment-legend-body">
                <div
                  className="segment-legend-color"
                  style={{ backgroundColor: "#d22020" }}
                ></div>
                <div className="segment-legend-text"> -Group Traits</div>
              </div>
            </div>

            {schemas.length >= 1 && (
              <div className="segment-schemas-list">
                {schemas.map((eachItem) => (
                  <SegmentDropdown
                    key={eachItem.id}
                    id={eachItem.id}
                    options={notSelectedItems}
                    value={eachItem.Label}
                    handleChange={handleEdit}
                    handleDelete={handleDeleteSchema}
                  />
                ))}
              </div>
            )}
            <SegmentDropdown
              options={notSelectedItems}
              value={
                typeof selectedSchema === "string"
                  ? selectedSchema
                  : selectedSchema.Label
              }
              handleChange={handleSelectedSchema}
              handleDelete={handleCancel}
            />
            <div className="segment-add-body" onClick={handleAddSchema}>
              <a href="#" className="segment-add-link">
                Add new schema
              </a>
            </div>
          </div>
        </div>
        <div className="segment-popup-buttons-container">
          <button
            className="segment-button-save save-btn"
            onClick={handleSendingDataToServer}
          >
            Save the Segment
          </button>
          <button
            onClick={handleCancel}
            className="segment-button-cancel cancel-btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


export default Segment;