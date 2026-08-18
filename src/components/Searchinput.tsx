// import { useState } from "react";

import { useState } from "react";

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
  const [serverValue, setServerValue] = useState<string>("");
  return (
    <div className="flex flex-col justify-center w-full items-center mx-auto ">
      {!isServer && (
        <input
          type="text"
          placeholder="search by name"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-2 border-purple-400 p-2 rounded-2xl focus:border-purple-900 hover:scale-105 mt-3 ease-in-out duration-300"
        />
      )}
      {isServer && (
        <div className="flex  flex-col">
          <input
            type="text"
            placeholder="search by name"
            value={serverValue}
            onChange={(e) => setServerValue(e.target.value)}
            className="border-2 border-purple-400 p-2 rounded-2xl focus:border-purple-900 hover:scale-105 mt-3 ease-in-out duration-300"
          />

          <button
            className="border border-green-500 p-2 m-2 rounded-2xl active:bg-green-500 hover:scale-105 active:text-white ease-in-out duration-300"
            onClick={() => onSearchChange(serverValue)}
          >
            search
          </button>
        </div>
      )}
      <label className="flex flex-row gap-1 justify-center items-center mt-3">
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
