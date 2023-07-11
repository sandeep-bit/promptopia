import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & share
        <br className='max-md:hidden' />
        <span className='blue_gradient text-center'> AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia ia an open-source platform for AI-generated prompting tool
        for modern world to discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
