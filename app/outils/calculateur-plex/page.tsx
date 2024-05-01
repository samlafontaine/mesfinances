import Image from "next/image";

export default function CalculateurPlex() {
  return (
    <div>
      <Image
        src="/calculateur-plex-2.png"
        width={0}
        height={0}
        alt=""
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="mb-8"
      />
      <h1 className="text-3xl md:text-4xl tracking-tighter md:leading-snug font-semibold mb-4">
        Calculateur Plex
      </h1>
      <div className="space-y-2 prose">
        <p>
          As-tu déjà pensé acheter un immeuble à revenus, communément appelé un
          plex? Ou peut-être que tu es en train de considérer te lancer dans le
          projet? Si c'est le cas, tu es au bon endroit.
        </p>
        <p>
          Plus bas, sur cette page, tu trouveras un lien via lequel tu pourras
          accéder à un fichier Google Sheets que j'ai créé en 2024 alors que
          j'étais en mode recherche pour mon premier plex.
        </p>
        <p>
          Ayant fait mes études universitaires en école de commerce, je baigne
          depuis longtemps dans les chiffres, la comptabilité et la finance en
          général. Je ne pouvais donc pas m'empêcher de me demander:{" "}
          <span className="italic">
            combien ça coûte, vraiement, un immeuble à revenus?
          </span>
        </p>
        <p>
          Je ne parle pas seulement du coût d'acquisition de l'immeuble, bien
          entendu. Un nombre important de dépenses fixes et courantes
          s'accumulent. En voici une liste non-exhaustive:
          <ul>
            <li>Impôts fonciers</li>
            <li>Entretien et réparations</li>
            <li>Assurances</li>
            <li>Électricité</li>
          </ul>
        </p>
        <p>
          De plus, un nombre important de facteurs additionnels doivent être
          pris en compte. Par exemple, allez vous habiter le bâtiment,
          c'est-à-dire occuper un des logements ? Si oui, quelle proportion de
          l'immeuble occupe le logement que vous allez habiter ? C'est important
          à savoir parce que c'est ce qui va déterminer le pourcentage des coûts
          que vous allez pouvoir déduire de vos impôts. Et parlant d'impôts, à
          combien s'élève votre salaire annuel ? Cela déterminera le montant
          total d'impôts additionnels à payer.
        </p>
      </div>
    </div>
  );
}
