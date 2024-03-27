'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

function CreatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        promt: "",
        tag: "",
    });
    const CreatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch("/api/prompt/new", {
              method: "POST",
              body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
              }),
            });
      
            if (response.ok) {
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsSubmitting(false);
          }
    };
  return (

      <Form 
        type="create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
      />
    
  )
}

export default CreatePrompt
