// import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}
const Searchinput = ({ onSearchChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="search by name"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Searchinput;
