

const LoadingSpinner = () => (
  <div className="flex justify-center gap-1 items-center">
      <div className="bg-purple-300 h-2.5  w-2.5 rounded-full animate-pulse "></div>
      <div className="bg-purple-300 h-2.5  w-2.5 rounded-full animate-pulse "></div>
      <div className="bg-purple-300 h-2.5  w-2.5 rounded-full animate-pulse "></div>
      <div></div>
      <div></div>
  </div>
);

export default LoadingSpinner;