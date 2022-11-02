import Image from 'next/image';
import { axiosRequest, apiRequest } from '../lib/axios';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import userAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guesseCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolName, setPoolName] = useState('');

  async function createANewPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await apiRequest.post('pools', { title: poolName });
      const { code } = response.data;
      navigator.clipboard.writeText(code);
      alert(
        'Bolão foi criado com sucesso, o código foi copiado para a área de transferência'
      );
    } catch (error) {
      console.error(error);
      alert('Falha ao criar um bolão');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-7 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já usando
          </strong>
        </div>

        <form onSubmit={createANewPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 outline-none text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolName}
            onChange={(event) => setPoolName(event.target.value)}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700"
            type="submit">
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-5 pt-5 border-t border-gray-600 text-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guesseCount}</span>
              <span>Palpites criados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma previa da aplicação mobile da nlw copa"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolsCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      axiosRequest('pools/count'),
      axiosRequest('guesses/count'),
      axiosRequest('users/count'),
    ]);

  return {
    props: {
      poolCount: poolsCountResponse.data.count,
      guesseCount: guessesCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    },
  };
};
