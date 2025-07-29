import React from "react";
import { Form } from "react-bootstrap";
import "./FormRadioButton.css";

/**
 * A reusable radio button group component
 *
 * @param {Object} props
 * @param {string} props.label - Label for the radio button group
 * @param {string[]} props.options - Array of options to display as radio buttons
 * @param {string} props.name - Name attribute for the radio inputs
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Handler function when an option is selected
 * @param {string} props.controlId - ID for the Form.Group
 * @param {string} props.className - Additional class names for the Form.Group
 * @param {string} props.labelClassName - Additional class names for the label
 * @param {string} props.optionClassName - Additional class names for each option
 */
const FormRadioButton = ({
  label,
  options = [],
  name,
  value,
  onChange,
  controlId,
  className = "",
  labelClassName = "text-start paragraph-small-regular text-content-secondary",
  optionClassName = "caption-regular text-content-secondary",
}) => {
  return (
    <Form.Group className={className} controlId={controlId}>
      {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
      <div className="d-flex gap-2 flex-wrap">
        {options.map((option, index) => (
          <div
            key={index}
            className={`form-radio-option ${
              value === option ? "selected" : ""
            }`}
            onClick={() => onChange(option)}
          >
            <label className={`w-100 m-0 ${optionClassName}`}>{option}</label>
            <input
              type="radio p-0 m-0"
              id={`${name}-${index}`}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => {}} // Handled by the onClick on parent div
              hidden
            />
          </div>
        ))}
      </div>
    </Form.Group>
  );
};

export default FormRadioButton;
