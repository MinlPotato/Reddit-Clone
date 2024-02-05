import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillTextArea(params) {

  const value = params.info.value
  const setValue = params.info.setValue
  const placeholder = params.info.placeholder || ''

  return <ReactQuill placeholder={placeholder} id='description' theme="snow" value={value} onChange={setValue} />;
}

export default QuillTextArea