import React from 'react';

const InputField = ({ name, value, onChange, placeholder }) => {
  return (
    <div className="sm:col-span-3 mt-2">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {placeholder}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={name}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default InputField;
