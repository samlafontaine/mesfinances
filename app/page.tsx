import Thumbnail from "./components/thumbnail";

export default function Page() {
  return (
    <div className="slide-up text-center">
      <div className="space-y-3 md:space-y-0.5 mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl tracking-tighter md:leading-snug font-semibold">
          Prends tes finances 💸 en main ✋
        </h1>
        <p className="md:text-xl text-black/80">
          Calculatrices, outils et ressources pour t'aider à prendre de
          meilleures décisions financières.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Thumbnail
          link="/outils/calculateur-plex"
          title="Calculateur Plex"
          imageSrc="/logo-full.png"
          alt="Calculateur Plex"
          description="Vous êtes-vous déjà demandé combien ça coûte, vraiment, un immeuble à revenus? 
          Et quel serait le potentiel projeté de revenus et de profits? 
          C'est ce que vous pouvez calculer et estimer facilement à l'aide de ce fichier."
          year="2024"
          tag="Immobilier"
        />
        <Thumbnail
          link="/outils/acheter-vs-louer"
          title="Acheter vs. Louer"
          imageSrc="/acheter-louer.png"
          alt="Calculateur Acheter vs. Louer"
          description="Vous êtes-vous déjà demandé combien ça coûte, vraiment, un immeuble à revenus? 
          Et quel serait le potentiel projeté de revenus et de profits? 
          C'est ce que vous pouvez calculer et estimer facilement à l'aide de ce fichier."
          year="2024"
          tag="Immobilier"
        />
        <Thumbnail
          link="/outils/calculatrice-hypothecaire"
          title="Calculatrice Hypothécaire"
          imageSrc="/logo-full.png"
          alt="Calculatrice hypothécaire"
          description="Vous êtes-vous déjà demandé combien ça coûte, vraiment, un immeuble à revenus? 
          Et quel serait le potentiel projeté de revenus et de profits? 
          C'est ce que vous pouvez calculer et estimer facilement à l'aide de ce fichier."
          year="2023"
          tag="Immobilier"
        />
      </div>
    </div>
  );
}
