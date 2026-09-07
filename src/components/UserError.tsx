import Buttons from "./Buttons";

const UserError = ({ LoadUser }: { LoadUser: () => void }) => {
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold">Error</p>
      <p className="caption mb-5">Could not load users. </p>
      <Buttons comp="button" onClick={LoadUser} buttonType="neutral">
        Retry
      </Buttons>
    </div>
  );
};

export default UserError;
