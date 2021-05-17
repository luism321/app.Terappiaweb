import React, { useState,useEffect,useRef } from "react";



const Checkbox = ({ initialState, id, onChange,value }) => {
  const [checked, setChecked] = useState(initialState);
  
  const onClick=(checked)=>{
   setChecked(checked);
   onChange(id, checked,value);
  }
  return (
    <input
      type="checkbox"
      onChange={e => onClick(e.target.checked)}
      checked={checked}
      value=""
    />
  );
};

export default Checkbox;
