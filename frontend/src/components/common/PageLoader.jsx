const PageLoader = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary" />

      <p className="text-sm text-base-content/60">
        Loading Leadora...
      </p>
    </div>
  );
};

export default PageLoader;