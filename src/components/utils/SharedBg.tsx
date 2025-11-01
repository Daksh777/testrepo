const SharedBg = ({ blue = "40vh" }: { blue?: string }) => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full  bg-primary-blue"
        style={{ height: blue }}
      ></div>
    </>
  );
};

export default SharedBg;
