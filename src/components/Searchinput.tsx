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
    <div className="flex justify-center w-full items-center mx-auto my-4">
      <div className="flex flex-col sm:flex-row w-full items-center gap-4 border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
        {!isServer && (
          <div className="flex flex-1 w-full items-center gap-2 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
              className="flex-shrink-0"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
              type="text"
              placeholder="search by name"
              value={value}
              onChange={(e) => onSearchChange(e.target.value)}
              className="focus:outline-none bg-transparent w-full"
            />
          </div>
        )}

        {isServer && (
          <div className="flex flex-col flex-1 w-full gap-3 px-2">
            <div className="flex items-center w-full gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
                className="flex-shrink-0"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              <input
                type="text"
                placeholder="search by name"
                value={serverValue}
                onChange={(e) => setServerValue(e.target.value)}
                className="focus:outline-none bg-transparent w-full"
              />
            </div>

            <button
              className="w-full border border-success px-4 py-1.5 rounded-md active:bg-success hover:scale-105 active:text-white ease-in-out duration-300 text-sm"
              onClick={() => onSearchChange(serverValue)}
            >
              search
            </button>
          </div>
        )}

        <div className="hidden sm:block w-px bg-gray-300 mx-2 self-stretch my-1"></div>

        <label className="flex flex-row gap-2 justify-center items-center cursor-pointer text-sm text-gray-700 px-2 sm:pr-4 whitespace-nowrap">
          server search
          <input
            type="checkbox"
            checked={isServer}
            onChange={(e) => setIsServer(e.target.checked)}
            className="cursor-pointer w-4 h-4 accent-success"
          />
        </label>
      </div>
    </div>
  );
};

export default Searchinput;
