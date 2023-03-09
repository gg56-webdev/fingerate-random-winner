import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import Image from "next/image";
import bg from "../assets/bg.png";
import logo from "../assets/logo.png";

type Result = "win" | "lose";

const getWin = () => {
  const rn = Math.floor(Math.random() * 5) + 1;
  return rn === 1;
};

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {
  if (req.cookies.result) {
    return { props: { result: req.cookies.result as Result } };
  }
  const result: Result = getWin() ? "win" : "lose";
  const expires = new Date();
  expires.setHours(expires.getHours() + 12);
  res.setHeader(
    "Set-Cookie",
    `result=${result}; expires=${expires.toUTCString()}`
  );
  return { props: { result } };
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ result }) => {
  const Content = result === "win" ? Win : Lose;
  return (
    <>
      <Head>
        <title>FingeRate Random Winner</title>
        <meta
          name="description"
          content="Test your luck in winnig prizes from FingeRate"
        />
      </Head>

      <Image loading="eager" src={bg} alt="" className="absolute h-full" />
      <div className="z-10 space-y-5 p-1 text-center text-xl text-white">
        <Image
          loading="eager"
          src={logo}
          alt="FingeRate Logo"
          width={120}
          height={120}
          className="mx-auto rounded-xl shadow"
        />
        <Content />
        <p>우리 앱을 다운로드하는 것을 잊지 마세요!</p>
        <a
          href="https://qrco.de/bdbfPq"
          target="_blank"
          rel="noopener noreferrer"
          className="align-self-center inline-block rounded-xl bg-white px-4 py-2 font-bold text-blue-500 shadow ring-2"
        >
          FingeRate App ▶
        </a>
        <small className="block">
          * Google Play 및 App Store에서 이용 가능합니다
        </small>
        <a
          href="http://fingerate.world"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm underline"
        >
          FingeRate 웹사이트로 이동하기
        </a>
      </div>
    </>
  );
};

const Lose = () => {
  return (
    <>
      <h1 className="text-3xl font-bold ">🤞 다음에는 좋은 운을 빕니다! 🤞</h1>
      <p>내일 다시 운을 시도하러 돌아와주세요!</p>
    </>
  );
};

const Win = () => {
  return (
    <>
      <h1 className="text-3xl font-bold ">🥳 당첨을 축하합니다! 🥳</h1>
      <p>이 화면을 스태프 중 한 명에게 보여주고 상품을 수령하세요!</p>
    </>
  );
};

export default Home;
