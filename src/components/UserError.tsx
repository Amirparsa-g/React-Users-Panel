const UserError = ({ LoadUser }: { LoadUser: () => void }) => {
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold">Error</p>
      <p className="caption mb-5">Could not load users. </p>
      <button onClick={LoadUser} className="neutral-button p-2 w-fit">
        Retry
      </button>
    </div>
  );
};

export default UserError;
