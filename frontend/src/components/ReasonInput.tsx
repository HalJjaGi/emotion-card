'use client';

import { useState } from 'react';

interface ReasonInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function ReasonInput({
  value,
  onChange,
  maxLength = 30,
}: ReasonInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">이유를 작성해주세요</h2>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          placeholder="30자 이내로 작성해주세요..."
          className={`
            w-full p-4 rounded-lg border-2 resize-none
            transition-all duration-200
            focus:outline-none
            ${isFocused ? 'border-blue-500' : 'border-gray-200'}
          `}
          rows={2}
        />
        <div
          className={`
            absolute bottom-2 right-3 text-sm
            ${value.length >= maxLength ? 'text-red-500' : 'text-gray-400'}
          `}
        >
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}
