import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [input, setInput] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  }, []);

  return [input, onChange];
}

export default useInputs;
