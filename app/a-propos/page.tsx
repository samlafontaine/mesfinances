export default function APropos() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl md:text-4xl tracking-tighter md:leading-snug font-semibold mb-4">
        À propos
      </h1>
      <p className="leading-relaxed">
        Je m'appelle Sam 👋. Je suis un jeune papa Montréalais de 31 ans et je
        travaille dans le milieu des technologies de l'information. J'ai démarré
        ce site au début de 2024 pour deux raisons: d'abord, ça combine deux de
        mes passions, soient le développement/design web ainsi que la finance
        personnelle. Ensuite, parce que j'espère pouvoir aider des gens à
        prendre de meilleures décisions financières. Je ne prétends pas tout
        connaître sur le sujet ni avoir toutes les réponses. Par contre, les
        systèmes, outils et calculatrices que je créé m'aident avec mes
        décisions financières, et je crois sincèrement (et j'espère) que ça peut
        être utile à d'autres personnes. Ce site traite principalement de
        finances personnelles, de frugalité, d'épargne, d'investissement et de
        mode de vie de façon plus générale. Si vous avez envie de contribuer,
        vous pouvez{" "}
        <a
          href="https://buymeacoffee.com/mesfinances"
          className="underline underline-offset-1 font-medium"
        >
          m'acheter un café
        </a>
        !
      </p>
    </div>
  );
}
