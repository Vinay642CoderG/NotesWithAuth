
const Loading = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="d-flex align-items-center gap-2">
        <h5 className="fs-2">Loading....</h5>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
