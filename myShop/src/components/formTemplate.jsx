import React from 'react';

export function FormTemplate({ handleSubmit, children }) {
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>

  );
}
