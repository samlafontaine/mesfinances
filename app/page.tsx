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
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          <Thumbnail
            link="/outils/calculateur-accessibilite"
            title="Accessibilité immobilière"
            imageSrc="/calculatrice-hypothecaire.png"
            alt="Calculateur Accessibilité"
            description="Ce calculateur t'aide à calculer le prix maximal d'une 
            propriété que tu peux te permettre en fonction de la règle selon 
            laquelle le prix d'une propriété ne doit pas dépasser 28% des revenus annuels bruts."
            year="2024"
            tag="Immobilier"
          />
          <Thumbnail
            link="/outils/calculateur-plex"
            title="Calculateur Plex"
            imageSrc="/calculateur-plex.png"
            alt="Calculateur Plex"
            description="Vous êtes-vous déjà demandé combien ça coûte, vraiment, un immeuble à revenus? 
          Et quel serait le potentiel projeté de revenus et de profits? 
          C'est ce que vous pouvez calculer et estimer facilement à l'aide de ce fichier."
            year="2024"
            tag="Immobilier"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Thumbnail
            link="/outils/acheter-vs-louer"
            title="Acheter vs. Louer"
            imageSrc="/acheter-vs-louer.png"
            alt="Calculateur Acheter vs. Louer"
            description="La question à... plusieurs centaines de milliers de dollars. 
          Qu'est-ce qui est plus rentable, financièrement parlant – acheter une propriété pour l'habiter, ou en louer une?
          C'est une question que beaucoup se posent, et à quoi ce fichier Excel peut vous aider à répondre. "
            year="2024"
            tag="Immobilier"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Thumbnail
            link="/outils/calculatrice-hypothecaire"
            title="Calculatrice Hypothécaire"
            imageSrc="/calculatrice-hypothecaire.png"
            alt="Calculatrice hypothécaire"
            description="Une calculatrice simple et agréable à utiliser qui t'aide à comprendre 
          à quoi ressemble ton calendrier d'amortissement hypothécaire. 
          Tu verras aussi combien, au total, tu auras payé d'intérêts à la fin de ton prêt."
            year="2023"
            tag="Immobilier"
          />
        </div>
      </div>
    </div>
  );
}
