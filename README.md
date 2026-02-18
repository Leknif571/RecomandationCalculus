# Projet calcul de recommandation TRD avec Clean architecture

```bash
bun install
```

Pour démarrer:
```bash
bun run index.ts
```

Pour démarrer avec docker et strategy mongodb

```bash
docker compose up --build
```

![Image](Schema_Architecture/CleanArchitecture.png)


## Réponse aux questions

5. Entre la France et l'Italie, laquelle encaisse le moins de buts à domicile ? 
6. Entre l'Espagne et le Portugal, laquelle a le plus grand nombre de matchs nuls 
à l'extérieur ? 
7. Quelle équipe possède le meilleur taux de victoire à domicile parmi les 
équipes suivantes : France, Brésil, Allemagne, Argentine ? 
8. Quelle équipe a la plus grande différence entre ses buts marqués à domicile 
et ses buts marqués à l'extérieur (c'est-à-dire, la plus "dépendante" de la 
localisation du match) ? 
9. Existe-t-il une équipe parmi France, Brésil, Angleterre, Italie qui gagne plus 
souvent à l'extérieur qu'à domicile ? 
10. Quelle équipe a le ratio buts marqués / buts encaissés le plus élevé à 
l'extérieur parmi : France, Allemagne, Brésil, Argentine ? 
11. Quel est le nombre de défaites à domicile du Brésil ? Ce chiffre est-il cohérent 
avec son taux de victoire à domicile et son nombre de nuls à domicile ?

1) 936 matchs dont (Dom: 536 / Ext: 395)
2) Domicile Buts Marqués : 2293 (Dom: 1498 / Ext: 795)
3) Taux Victoire Global : 57.94%, Victoires à Domicile : 342, Victoires à l'Extérieur : 253
4) Taux Victoire Global : 55.18% Victoires à Domicile : 402 Victoires à l'Extérieur : 184
5)
6)
7)
8)
9)
10)
11)


## Ce que je n'ai pas fini :
J'ai pas fini les tests unitaires et j'ai pas fini l'implémentation avec mongo