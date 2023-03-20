import Link from 'next/link';
import { FormEvent, useContext, useRef } from 'react';
import {
  MdOutlineChevronLeft,
  MdCheckCircle,
  MdOutlineError,
} from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { addTask } from '../firebase/TaskFirestore';
import Task from '../components/TaskInterface';
import AuthContext from '../firebase/AuthContext';

function NewTodo() {
  const { user } = useContext(AuthContext);
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);
  let dueOnRef = useRef(null);
  const minDate =
    new Date().getFullYear() +
    '-' +
    `0${new Date().getMonth() + 1}`.slice(-2) +
    '-' +
    `${new Date().getDate()}`.slice(-2);

  function newTask(event: FormEvent) {
    event.preventDefault();

    const task: Task = {
      //@ts-ignore
      title: titleRef?.current?.value,
      //@ts-ignore
      description: descriptionRef?.current?.value,
      complete: false,
      createdAt: new Date(),
      updatedAt: null,
      //@ts-ignore
      dueAt: new Date(dueOnRef?.current?.value),
      uidUser: user.uid,
    };

    if (task.title.length >= 5 && task.description.length >= 5) {
      addTask(task).then(() => {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className='flex-1 w-0 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5 items-center'>
                  <MdCheckCircle color='#16a34a' size={18} />
                </div>
                <div className='ml-3 flex-1'>
                  <p className='mt-1 text-sm text-zinc-700'>
                    Task successfully added!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
      });
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className='flex-1 w-0 p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0 pt-0.5 items-center'>
                <MdOutlineError color='#be123c' size={18} />
              </div>
              <div className='ml-3 flex-1'>
                <p className='mt-1 text-sm text-zinc-700'>
                  Something went wrong, please try again
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  }

  return (
    <div className='flex flex-col px-6 py-4 md:w-1/2 md:m-auto'>
      <h3 className='mb-4 text-2xl font-semibold font-display'>New Task</h3>
      <form className='flex flex-col' onSubmit={newTask}>
        <label className='mb-2 text-zinc-700 font-display' htmlFor='title'>
          Title
        </label>
        <input
          ref={titleRef}
          minLength={5}
          required={true}
          className='border border-zinc-700 px-3 mb-4 h-12 outline-none rounded-md font-sans'
          placeholder='Choose a title for your task.'
          type='text'
          name='title'
          id='title'
        />
        <label
          className='mb-2 text-zinc-700 font-display'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          ref={descriptionRef}
          minLength={5}
          required={true}
          className='border border-zinc-700 p-3 outline-none border-3 resize-none mb-4 rounded-md font-sans'
          name='description'
          id='description'
          cols={25}
          rows={10}
          placeholder='Give your task a discription.'
        ></textarea>
        <div className='flex'>
          <label htmlFor='dueOn' className='mr-3 font-display'>
            Due On
          </label>
          <input
            ref={dueOnRef}
            min={minDate}
            required={true}
            type='date'
            name='due'
            id='dueOn'
            className='border border-zinc-700 px-3 mb-4 h-12 outline-none w-full rounded-md'
          />
        </div>
        <button
          type={'submit'}
          className='font-display py-3 bg-purple-700 text-white rounded-md mb-4'
        >
          Save
        </button>
      </form>
      <Link href={'/todo'}>
        <button className='flex items-center justify-center border-2 border-purple-700 border-opacity-25 py-2 px-6 rounded-md mr-4'>
          <i className='mr-2'>
            <MdOutlineChevronLeft />
          </i>
          <span className='font-display'>Go back</span>
        </button>
      </Link>
      <Toaster
        position='top-right'
        toastOptions={{
          // Define default options
          duration: 5000,
        }}
      />
    </div>
  );
}

export default NewTodo;
