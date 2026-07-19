// import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}
const Searchinput = ({ onSearchChange }: SearchBarProps) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="search by name"
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-2 border-purple-400 p-2 rounded-2xl focus:border-purple-900 "
      />
    </div>
  );
};

export default Searchinput;
