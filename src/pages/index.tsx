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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  let result: Result;
  if (req.cookies.result) {
    console.log(req.cookies.result);
    return { props: { result: req.cookies.result as Result } };
  }
  result = getWin() ? "win" : "lose";
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
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
      </Head>
      <Image loading="eager" src={bg} alt="" className="absolute h-full" />
      <div className="z-10 space-y-5 p-1 text-center text-xl text-white">
        <Image
          src={logo}
          alt="FingeRate Logo"
          width={120}
          height={120}
          className="mx-auto rounded-xl shadow"
        />
        <Content />
        <p>Don't forget to Download our App!</p>
        <a
          href="https://qrco.de/bdbfPq"
          target="_blank"
          rel="noopener noreferrer"
          className="align-self-center inline-block rounded-xl bg-white px-4 py-2 font-bold text-blue-500 ring-2"
        >
          FingeRate App
        </a>
        <small className="block">* Available in Google Play & App Store</small>
      </div>
    </>
  );
};

const Win = () => {
  return (
    <>
      <h1 className="text-3xl font-bold ">🤞 Better luck next time! 🤞</h1>
      <p>Please come back tomorrow to test your luck again!</p>
    </>
  );
};

const Lose = () => {
  return (
    <>
      <h1 className="text-3xl font-bold ">🥳 당첨을 축하합니다! 🥳</h1>
      <p>Show this screen to one of the staff and claim you prize!</p>
    </>
  );
};

export default Home;
