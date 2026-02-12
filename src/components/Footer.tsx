import { FaGithub,FaPaw } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-black p-10 border-t-2 border-neutral-500">
            <div className="flex justify-around items-center text-neutral-400 text-lg">
                <div className='flex space-x-2 items-center '>
                    <FaPaw className='text-2xl'></FaPaw>
                    <p className="">Vet Manager</p>
                </div>
                <div><p>© Vet Manager Company Inc. All rights reserved</p></div>
                <div className='flex space-x-5'>
                    <a href="https://github.com/Justin-deb/veterinaria-desarrollo-de-software-2"
                        target='_blank'
                        className='bg-neutral-800 p-3 rounded-4xl'>
                        <FaGithub className='text-2xl text-white'></FaGithub>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer