// import { useState } from "react";

import { useState } from "react";
type Filters = "active" | "inactive" | "all";
interface SearchBarProps {
  onSearchChange: (value: string) => void;
  setIsServer: (value: boolean) => void;
  isServer: boolean;
  value: string;
  setUserStatus: (filter: Filters) => void;
}
const Searchinput = ({
  onSearchChange,
  value,
  setIsServer,
  isServer,
  setUserStatus,
}: SearchBarProps) => {
  const [serverValue, setServerValue] = useState<string>("");
  return (
    <div className="flex flex-col justify-center w-full items-center mx-auto ">
      {!isServer && (
        <div className="flex userStats-card gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input
            type="text"
            placeholder="search by name"
            value={value}
            onChange={(e) => onSearchChange(e.target.value)}
            className="focus:outline-none"
          />
          <select
            onChange={(e) => {
              if (e.target.value === "all") setUserStatus("all");
              else if (e.target.value === "active") setUserStatus("active");
              else setUserStatus("inactive");
            }}
            className="hidden md:flex"
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="inactive">inacive</option>
          </select>
        </div>
      )}
      {isServer && (
        <div className="flex  flex-col">
          <div className="flex userStats-card gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
              type="text"
              placeholder="search by name"
              value={serverValue}
              onChange={(e) => setServerValue(e.target.value)}
              className="focus:outline-none"
            />
            <select className="hidden md:flex">
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="inactive">inacive</option>
            </select>
          </div>
          <button
            className="border border-success p-2 m-2 rounded-md active:bg-success hover:scale-105 active:text-white ease-in-out duration-300"
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
