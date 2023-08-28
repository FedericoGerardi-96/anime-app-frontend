export const metadata = {
  title: 'Login',
  description: 'Login Page for the app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid='login-layout-page'
      className='w-screen h-auto max-h-screen overflow-x-hidden lg:grid lg:grid-cols-2 md:flex md:flex-col block
          bg-[linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,1)),url("/YukinoLoginMobile.webp")] 
          bg-no-repeat bg-top-center bg-cover md:bg-none'>
      <div
        className='hidden md:block
          lg:bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,1)),url("/YukinoLogin.webp")] 
          md:bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.6)),url("/TakinaLoginTablet.webp")]                     
          bg-no-repeat bg-top-center bg-cover h-screen w-full'
      />
      <div
        className='container mx-auto flex items-cente         
          flex-col justify-center 
          md:w-full md:h-full md:px-0
          w-screen h-screen px-10 
          lg:p-0 p-10 lg:px-16'>
        {children}
      </div>
    </div>
  );
}
