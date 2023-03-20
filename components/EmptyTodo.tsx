import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/YgMk40tiS4.json';

function EmptyTodo({ tab }: any) {
  return (
    <div className='h-full flex flex-col justify-center items-center md:w-1/2 md:m-auto'>
      <div>
        <Lottie className='w-72' animationData={lottieJson} loop play />
      </div>
      <p className='align-middle text-center mt-4 mb-6 px-6'>{tab.message}</p>
      {tab.title === 'In Progress' && (
        <Link href='/todo/new-task'>
          <button className='bg-purple-700 text-white flex items-center justify-center py-2 px-6 rounded-md'>
            <span className='font-display'>Add new task</span>
            <i className='ml-2'>
              <MdAdd size={18} />
            </i>
          </button>
        </Link>
      )}
    </div>
  );
}

export default EmptyTodo;
