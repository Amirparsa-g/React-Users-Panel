const Loading = () => {
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold mb-5">Loading...</p>
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </div>
  );
};

export default Loading;
