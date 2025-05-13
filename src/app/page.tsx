import Header from "./components/header";
import Informations from "./components/informations";
import Card from "./components/card";

export default function Home() {
  return (
    <>
      <Header />
      <Informations />
      <nav className="flex flex-col gap-5 px-50 justify-center items-center">
        <h1 className="text-3xl">Modelos 3D</h1>
        <span className="text-gray-300">
          Inspecione modelos 3D e faça vídeos
        </span>
        <div className="flex justify-center items-center gap-50">
          <Card />
          <Card />
          <Card />
        </div>
      </nav>
    </>
  );
}
