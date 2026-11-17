function Loader({ message }) {
  return (
    <div className="loader" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  );
}

export default Loader;

