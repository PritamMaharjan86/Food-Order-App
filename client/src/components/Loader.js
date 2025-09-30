import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <ClipLoader color="white" size={100} />
        </div>
    );
};

export default Loader;
