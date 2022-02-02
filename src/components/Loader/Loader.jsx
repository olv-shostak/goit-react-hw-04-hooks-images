import { BallTriangle } from  'react-loader-spinner'


const Loader = () => {
    return (
      <div className="Loader">
        <BallTriangle
          heigth="100"
          width="100"
          color="#080cfd"
          arialLabel="loading-indicator"
        />
      </div>
    );
  };
  
  export default Loader;