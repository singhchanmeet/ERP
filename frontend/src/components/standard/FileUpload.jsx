import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

const FileUpload = ({ label, accept, onChange, name,id }) => {

  return (
    <div className="col-span-full w-[400px]">
      <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
        <p className="text-xl leading-5 text-gray-600 py-4">{label}</p>
        <div className="text-center">
          <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 text-lg px-2 focus-within:ring-offset-2 hover:text-indigo-500">
              
              <input
                type="file"
                accept={accept}
                id={id}
                name={name}
                onChange={onChange}
              />
            </label>
          </div>
          <p className="pl-1">or drag and drop</p>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
