import React from "react";
interface RadioButtonProps {
  name: string;
  value: string;
  selected: boolean;
  color?: string;
  OnClick: (value: string) => void;
  disabled?: boolean;
  fontSize?: string;
}
const RadioButton = ({
  name,
  value,
  selected,
  color,
  OnClick,
  disabled = false,
  fontSize,
}: RadioButtonProps) => {
  // console.log(category.selected);
  return (
    <button
      className="flex flex-row my-3 items-center  mr-3 px-3 py-2 justify-between bg-[#FFFAF5] rounded-[8px]"
      onClick={() => {
        OnClick(value);
      }}
      disabled={disabled}
    >
      <h1
        className=" font-euclid"
        style={{
          //   fontFamily: 'Roboto',
          fontSize: fontSize,
          fontStyle: "normal",
          fontWeight: "500",

          // color: labelColor,
          color: "#FFA234",
        }}
      >
        {name}
      </h1>
      <div
        style={{
          height: 25,
          width: 25,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: disabled ? "#949494" : color ?? "#FFA234",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 16,
          display: "flex",
        }}
      >
        {selected ? (
          <div
            style={{
              height: 15,
              width: 15,
              backgroundColor: disabled ? "#949494" : color ?? "#FFA234",
              borderRadius: 15,
            }}
          />
        ) : null}
      </div>
    </button>
  );
};

export default RadioButton;
