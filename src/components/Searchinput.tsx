// import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  setIsServer: (value: boolean) => void;
  isServer: boolean;
  value: string;
}
const Searchinput = ({
  onSearchChange,
  value,
  setIsServer,
  isServer,
}: SearchBarProps) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="search by name"
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-2 border-purple-400 p-2 rounded-2xl focus:border-purple-900 hover:scale-105 mt-3 ease-in-out duration-300"
      />

      <label htmlFor="">
        server search
        <input
          type="checkbox"
          checked={isServer}
          onChange={(e) => setIsServer(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default Searchinput;
