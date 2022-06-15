import React, { useRef } from "react";

const FileUpload = ({ setFile, accept, children, multiple, disabled }) => {
  const ref = useRef();

  if (disabled) return children;

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        multiple={multiple}
        onChange={setFile}
      />
      {children}
    </div>
  );
};

export default FileUpload;
