import React, { useState } from "react";

function useInput() {
  const [value, setValue] = useState("");
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, handler];
}

export default useInput;
