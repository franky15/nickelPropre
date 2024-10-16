
//importations des images avant et après

import moquettes  from '../src/images/moquettes.png';
import siegeauto from '../src/images/siegeauto.png';
import canape  from '../src/images/canap.jpg';
import remiseneuf  from '../src/images/remiseneuf.jpg';

// import bmwAvantApres  from '../src/images/bmw.png';
// import siegeAutoAvantApres from '../src/images/avant1.png';
// import canapeAvantApres  from '../src/images/avant2.png';
// import toilettesAvantApres  from '../src/images/toilettes.png';

//données des services pour la page d'accueil
const servicesData = [
  {
    id: 1,
    title: "Nettoyage de Canapé",
    description: `Bénéficiez d'un nettoyage de canapé à domicile, réalisé par des professionnels, sans produits chimiques.`,
    picture: canape,
    keyWords: "meubles(canapés, matelas)",
    details: ["Nettoyage de canapés en tissu, microfibre, daim, velours et cuir", "Élimination de tous types de taches et de mauvaises odeurs","Utilisation de détergents bio, sans danger pour les animaux et les enfants","Préservation et revitalisation des fibres d’ameublement et du cuir", "Désinfection GRATUITE incluse dans le service"]
  },
  {
    id: 2,
    title:  "Nettoyage à neuf de l'intérieur de votre voiture",
    description: `Remise à neuf de l'intérieur de votre voiture`,
    picture: remiseneuf,
    keyWords: "intérieurs voitures"
  },
  {
    id: 3,
    title: "Remise à neuf et Siege Automobile",
    description: `Retrouvez votre voiture propre et sans odeur grâce à notre service de remise à neuf du véhicule`,
    picture:  siegeauto,
    keyWords: "sièges voitures"
  },
  {
    id: 4,
    title: "Nettoyage de moquettes à domicile",
    description: `Notre service de nettoyage de moquettes `,
    picture: moquettes,
    keyWords: "moquettes"
  }
];

// const servicesData = [
//     {
//       id: 1,
//       title: "Nettoyage de Canapé",
//       description: `Bénéficiez d'un nettoyage de canapé à domicile, réalisé par des professionnels, sans produits chimiques.`,
//       picture: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       keyWords: "meubles(canapés, matelas)",
//       details: ["Nettoyage de canapés en tissu, microfibre, daim, velours et cuir", "Élimination de tous types de taches et de mauvaises odeurs","Utilisation de détergents bio, sans danger pour les animaux et les enfants","Préservation et revitalisation des fibres d’ameublement et du cuir", "Désinfection GRATUITE incluse dans le service"]
//     },
//     {
//       id: 2,
//       title:  "Nettoyage de Matelas",
//       description: `Vos matelas peuvent vite s’encrasser. Il est prouver que dormir sur un lit Propre et sans odeur est bénéfique pour la santé`,
//       picture: "https://img.freepik.com/photos-gratuite/gros-plan-processus-entretien-voiture_23-2149193592.jpg?t=st=1725671822~exp=1725675422~hmac=d77d097c37e869f43d6b4f169d4546ea309b03ab4fc8007c6d6c23607e27183b&w=1060",
//       keyWords: "intérieurs voitures"
//     },
//     {
//       id: 3,
//       title: "Remise à neuf et Siege Automobile",
//       description: `Retrouvez votre voiture propre et sans odeur grâce à notre service de remise à neuf du véhicule`,
//       picture: "https://img.freepik.com/photos-gratuite/station-detaillant-lavage-voiture_1303-22314.jpg?t=st=1725671747~exp=1725675347~hmac=554a902e3ab69a121981707d858ab4a7857f4d1adc71723c1ec0ff76a6b828cd&w=1060",
//       keyWords: "sièges voitures"
//     },
//     {
//       id: 4,
//       title: "Nettoyage de moquettes à domicile",
//       description: `Notre service de nettoyage de moquettes `,
//       picture: "https://img.freepik.com/photos-gratuite/homme-faisant-service-nettoyage-domicile-professionnel_23-2150359034.jpg?t=st=1725671212~exp=1725674812~hmac=59368ef4b3edd88b7fd569c88efb66f116a8f791485c7ffc31d6e0feb836fb00&w=1060",
//       keyWords: "moquettes"
//     }
//   ];
  
  
  export default servicesData;

  
  //export default avis = 4.8;

  
  