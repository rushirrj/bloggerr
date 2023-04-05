import React from 'react';
import dynamic from 'next/dynamic'

const DynamicCreatePostPage = dynamic(() => import('../screens/createPostPage'), {
  loading: () => <p>Loading...</p>,
})
const CreatePost = () => {
    return (
        <div className='w-full flex justify-center'>
            <DynamicCreatePostPage/>
        </div>
    );
}

export default CreatePost;
