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


8. Quelle équipe a la plus grande différence entre ses buts marqués à domicile 
et ses buts marqués à l'extérieur (c'est-à-dire, la plus "dépendante" de la 
localisation du match) ? 
11. Quel est le nombre de défaites à domicile du Brésil ? Ce chiffre est-il cohérent 
avec son taux de victoire à domicile et son nombre de nuls à domicile ?

1) 936 matchs dont (Dom: 536 / Ext: 395)
2) Domicile Buts Marqués : 2293 (Dom: 1498 / Ext: 795)
3) Taux Victoire Global : 57.94%, Victoires à Domicile : 342, Victoires à l'Extérieur : 253
4) Taux Victoire Global : 55.18% Victoires à Domicile : 402 Victoires à l'Extérieur : 184
5) France : Buts Encaissés : 1204 (Dom: 585 / Ext: 619), Italie : Buts Encaissés : 875 (Dom: 394 / Ext: 481) donc Italie
6) Espagne : Matchs Nuls : 180, Portugal : Matchs Nuls : 158
7) Brésil
8) /
9) Angleterre
10) Brésil
11) 60 et oui c'est cohérant


## Ce que je n'ai pas fini :
J'ai pas fini les tests unitaires et j'ai pas fini l'implémentation avec mongo