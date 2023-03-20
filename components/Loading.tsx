import Lottie from 'react-lottie-player';
import lottieLoading from '../public/bZKb7T8peF.json';

export default function Loading() {
  return (
    <div className="flex flex-col h-full items-center justify-center mt-20">
      <Lottie animationData={lottieLoading} play loop />
    </div>
  );
}
