# jlm-auth-passport-example

Cette application express démontre comment intégrer l'authentification jlm2017 à votre application.

L'authentification via jlm2017 vous permet notamment de récupérer le profil de l'utilisateur tel qu'il a été
rempli sur jlm2017.fr, et de s'assurer par là même qu'il a bien signé pour la campagne de Jean-Luc Mélenchon.

La majeure partie de la logique d'authentification se trouve dans le fichier ``auth.js``. Le fichier ``config.js``
comprend et documente tous les éléments de configuration que vous devez récupérer pour faire fonctionner
l'authentification via jlm2017.fr.

Si vous souhaitez effectivement intégrer l'authentification jlm2017.fr à votre application, vous devrez rentrer
en contact avec l'équipe plateforme de la campagne pour obtenir les identifiants client nécessaire, via
le [chat coders JLM2017](https://chat.coders.jlm2017.fr).

## Tester cette application

Pour tester cette application, suivez les étapes suivantes :

1. Clonez ce dépôt.
2. Installez les prérequis à l'aide de ``npm install``.
3. Lancer l'application avec ``node ./server.js``.
4. Rendez-vous sur <http://localhost:8000/>
