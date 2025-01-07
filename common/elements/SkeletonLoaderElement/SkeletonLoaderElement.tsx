const SkeletonLoader = ({
  height = "100px",
  width = "100%",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded-md ${className}`}
      style={{ height, width }}
    ></div>
  );
};

export default SkeletonLoader;
