import Buttons from "./Buttons";
const ButtomNav = () => {
  return (
    <nav className="nav-mobile">
      <Buttons comp="navLink" navigation="/" buttonType="buttomNavLink">
        <div className="flex gap-1 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
          <p className="buttomNav-font">Dashboard</p>
        </div>
      </Buttons>
      <Buttons
        comp="navLink"
        navigation="/users"
        end
        buttonType="buttomNavLink"
      >
        <div className="flex gap-1 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M320-400h320v-22q0-44-44-71t-116-27q-72 0-116 27t-44 71v22Zm216.5-183.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
          <p className="buttomNav-font">Users</p>
        </div>
      </Buttons>
      <Buttons
        comp="navLink"
        navigation="/users/new"
        buttonType="buttomNavLink"
      >
        <div className="flex gap-1 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          <p className="buttomNav-font">Add User</p>
        </div>
      </Buttons>
      <Buttons comp="navLink" navigation="/about" buttonType="buttomNavLink">
        <div className="flex gap-1 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-680q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm-40 320h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
          <p className="buttomNav-font">About</p>
        </div>
      </Buttons>
    </nav>
  );
};

export default ButtomNav;
