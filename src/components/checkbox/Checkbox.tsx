import React,{ FC, SyntheticEvent } from "react";
import './checkbox.css';

type CheckboxProps = {
  stopType: string
  label: string
  isChecked: boolean
  onToggle: (e: SyntheticEvent) => void
}

export const Checkbox: FC<CheckboxProps> = ({ stopType, isChecked, label, onToggle }) => (
  <div className="checkbox">
    <label className="checkbox-label">
    <input
      type="checkbox"
      className="checkbox-input"
      checked={isChecked}
      onChange={onToggle}
      data-type={stopType}
    />
    <span className="checkbox-display"></span>
    {label}
    </label>
  </div>
)