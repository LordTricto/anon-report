import "./style.css";

import { ErrorMessage, useField } from "formik";

import React from "react";

const Input = ({ name, placeholder, type, ...otherProps }) => {
  const [field] = useField(name);

  const configInputField = {
    ...field,
    ...otherProps,
  };

  return (
    <div>
      <div className="input">
        <input
          type={type}
          name={name}
          {...configInputField}
          required
          onChange={field.onChange}
        />
        <label htmlFor={name} className="label_name">
          <span className="content_name">{placeholder}</span>
        </label>
      </div>
      <span className="input__error">
        <ErrorMessage name={field.name} />
      </span>
    </div>
  );
};

export default Input;
