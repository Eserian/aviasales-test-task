import React, { FunctionComponent } from "react";
import './checkbox.css';

type CheckboxProps = {
    stopType: number
    label: string
    isChecked: boolean
    onToggle: any
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({ stopType, isChecked, label, onToggle }) => (
    <div className="checkbox">
        <label className="checkbox-label">
        <input
            type="checkbox"
            className="checkbox-input"
            checked={isChecked}
            onChange={onToggle}
            data-type={stopType}
        />
        <span></span>
        {label}
        </label>
    </div>
)