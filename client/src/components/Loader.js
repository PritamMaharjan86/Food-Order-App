import { ClipLoader } from 'react-spinners';


const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-20 ">
            <ClipLoader
                color="#6b46c1"
            />
        </div>
    )
}

export default Loader
