const LoadingBar = () => {
  return (
    <div className="w-full px-4 mt-6">
      <progress
        className="progress progress-primary w-full"
        value="40"
        max="100"
      ></progress>
    </div>
  );
};

export default LoadingBar;
