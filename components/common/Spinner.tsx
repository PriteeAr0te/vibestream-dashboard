import { ClipLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#10B981",
};

const Spinner = () => {
    return (
        <div className="flex justify-center sweet-loading items-center h-[50vh]" role="status" aria-live="polite" aria-atomic="true">
            <ClipLoader
                color="#4f46e5"
                size={100}
                cssOverride={override}
                aria-label="Loading"
                data-testid="loader"
            />
            <span className="sr-only">Loading</span>
        </div>
    )
}

export default Spinner