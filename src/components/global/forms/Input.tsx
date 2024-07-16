import React, { useState } from "react";
import { EyeOff, EyeOn, InputErrorInfo } from "@assets/svgs";

const TextInput = ({
  containerClass = "",
  required,
  type,
  size,
  className = "",
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  onBlur,
  onKeyDown,
}: {
  placeholder?: string;
  type: string;
  className?: string;
  size?: "sm" | "lg";
  containerClass?: string;
  id?: string;
  label?: string;
  required?: boolean;
  name?: string;
  value?: string;
  onBlur?: any;
  onChange?: any;
  error?: string; // Error message prop
  disabled?: boolean; // Error message prop
  onKeyDown?: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`rt-formGroup ${containerClass}`}>
      {label && (
        <label htmlFor={id}>
          {label}{" "}
          {required && <sup className="text-themeDanger text-[1.25rem]">*</sup>}
        </label>
      )}

      {type === "password" ? (
        <div className="relative">
          <input
            onBlur={onBlur}
            disabled={disabled}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            type={showPassword ? "text" : type}
            className={`rt-themeInput ${className ? className : ""}`}
          />
          {showPassword ? (
            <span
              className={`password__eye ${label ? "" : ""}`}
              onClick={() => setShowPassword(false)}
            >
              <EyeOff />
            </span>
          ) : (
            <span
              className={`password__eye ${label ? "" : ""}`}
              onClick={() => setShowPassword(true)}
            >
              <EyeOn />
            </span>
          )}
        </div>
      ) : (
        <input
          disabled={disabled}
          onBlur={onBlur}
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          onKeyDown={onKeyDown}
          onChange={onChange}
          placeholder={placeholder}
          className={`rt-themeInput ${className ? className : ""}`}
        />
      )}

      {error && ( // Render error message if error exists
        <span className="rt-errorMessage">
          <InputErrorInfo />
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
