import { Button } from '@nextui-org/button';

export default function Home() {
  return (
    <main
      data-testid='home-page'
      className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>¡Bienvenido a mi página!</h1>
      <Button>¡Hola!</Button>
    </main>
  );
}
