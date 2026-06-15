import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ClipLoader
        size={60}
        color="#2563eb"
      />
    </div>
  );
}

export default Loader;