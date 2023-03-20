import { signInWithGoogle, signInAnonymous } from '../firebase/Authentication';
import { AiOutlineGoogle, AiOutlineEyeInvisible } from 'react-icons/ai';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/0X14cp3TDB.json';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const loginWithGoogle = () => {
    try {
      signInWithGoogle().then(() => {
        router.push('/todo');
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logInAnonymous = () => {
    try {
      signInAnonymous().then(() => {
        router.push('/todo');
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex flex-col h-full items-center justify-center mt-20">
        <p className="font-medium text-5xl mb-6 font-display">Todoze</p>
        <div>
          <Lottie className="w-72" animationData={lottieJson} loop play />
        </div>
        <p className="text-md my-6 font-sans">Get work done. Efficienlty.</p>
        <div className="flex">
          <button
            className="flex items-center justify-center border-2 border-purple-700 border-opacity-25 py-2 px-6 rounded-md mr-4"
            onClick={loginWithGoogle}
          >
            <i className="mr-2">
              <AiOutlineGoogle size={18} />
            </i>
            <span className="font-display">Google</span>
          </button>
          <button
            className="bg-purple-700 text-white flex items-center justify-center py-2 px-6 rounded-md"
            onClick={logInAnonymous}
          >
            <i className="mr-2">
              <AiOutlineEyeInvisible />
            </i>
            <span className="font-display">Anonymous</span>
          </button>
        </div>
      </div>
    </>
  );
}
