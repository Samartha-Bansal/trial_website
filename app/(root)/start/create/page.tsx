import { auth } from '@/auth';
import StartForm from '@/components/StartForm';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await auth();
    if (!session) redirect('/');
  return (
    <>
    <section className='pink_container !min-h-height-[256px]'>
        <h1 className='heading'>Submit</h1>
    </section>

    <StartForm />
    </>
  );
};

export default page