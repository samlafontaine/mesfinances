import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AcheterVsLouer() {
  return (
    <div>
      <Image
        src="/acheter-vs-louer-2.png"
        width={0}
        height={0}
        alt=""
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="mb-8"
      />
      <h1 className="text-3xl md:text-4xl tracking-tighter md:leading-snug font-semibold mb-4">
        Acheter vs Louer
      </h1>
      <div className="space-y-2 prose">
        <p>
          <i>Acheter vs Louer</i> est un outil qui permet de comparer ta
          situation financière projetée suite à l'achat d'une maison, par
          rapport à la situation financière projetée suite à un choix de
          location.
        </p>
        <p>En gros, l'outil te permet de répondre à la question suivante:</p>
        <blockquote className="relative border-s-4 ps-4 sm:ps-6">
          <p className="text-gray-800 sm:text-xl">
            <em>Devrais-je acheter une maison ou continuer à louer?</em>
          </p>
        </blockquote>
        <p>
          C'est une question que je me suis posée moi-même. Q'est-ce qui est
          plus rentable, financièrement, entre acheter une maison ou un
          appartement, ou tout simplement louer? Il n'y a pas de réponse
          universelle à cette question, et cela dépend de nombreux facteurs.
        </p>
        <p>
          C'est une questions qui est d'autant plus d'actualité aujourd'hui avec
          la montée fulgurante des taux d'intérêts, qui chamboule les habitudes
          et les idées préconçues de tous.
        </p>
        <p>
          Je tiens à mentionner qu'il n'y a pas que les facteurs financiers qui
          viennent en compte lorsque l'on décide d'acheter une maison. Pour
          certains, il y a une valeur émotionnelle, de sécurité, ou
          d'accomplissement personnel. Par contre, le fichier ci-dessous prend
          bien évidemment en compte que les les facteur financiers qui sont
          calculables.
        </p>
        <p>Pour accéder au document, c'est par ici 👇</p>
        <br></br>
        <Link
          href="https://docs.google.com/spreadsheets/d/1AnSmcqzzMBndRxDfZmynvplvAOxjS1uCHdMQPwHtmLA/edit?usp=sharing"
          target="_blank"
        >
          <Button>Acheter vs. Louer - Fichier Google Sheets</Button>
        </Link>
        <br></br>
        <br></br>
        <p>
          J'espère sincèrement que ce document vous aide à prendre cette
          importante décision financière de façon plus éclairée. Si vous avez
          bénéficié de de document, vous pouvez me remercier en{" "}
          <a href="https://buymeacoffee.com/mesfinances">m'achetant un café</a>!
        </p>
      </div>
    </div>
  );
}
