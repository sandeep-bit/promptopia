'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const email = post.creator.email;
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState('');
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile');
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard?.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card '>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            className='rounded-full object-contain'
            height={40}
            width={40}
            alt='user Image'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900 '>
              {post.creator.name}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              @{email.slice(0, 7)}
              {Math.floor(Math.random() * 900) + 100}
            </p>
          </div>
        </div>
        <div
          className='copy_btn'
          onClick={handleCopy}
        >
          <Image
            alt='copy'
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='flex mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
