# Projecte M12 IOC

## Descripció

    Espai per definir la descripció del projecte

## Taula de Continguts


## Branques (Branch)

Sempre treballarem a la nostra branca o a la branca del component en qüestió **mai** sobre la branca _main_ ja que és la principal i ha d'estar el més neta possible.
D'aquesta manera evitem possibles errors "greus" i que ens efecti la funcionalitat de l'aplicació poguent trencar-la. :boom:

Un cop tinguem el component o pàgina acabat, que funciona al 100% i no te cap error de funcionament o per consola podem procedir a fer PR (Pull Request). Aqui si que serem més descriptius ja que serà amb la que acabarem fent "merge" i fusionarem a la branca principal 'main'.

Fet això, i tinguent incorporat el codi a la branca principal, podem eliminar la branca. D'aquesta manera no acumularem coses que ja no necessitem.

Quan la PR s'hagi acceptat tots haurem d'actualitzar el nostre repositori local per tenir el codi al dia i així evitar errors de compatibilitats.


## Funcionament dels 'Commits'

### Explicació del funcionament dels commits.

Anirem treballant el codi amb l'IDE que més ens agradi i un cop el codi del component o pàgina sigui funcional farem el commit. El farem de la següent manera.

Establim quatre possibles commits; _Feature, Update, Error i Fixed_. L'estil anirà de la següent manera: **Tipus** seguit de "**:**" i una **petita descripció** de unes 4-5 paraules aprox. el més descriptives possible.

Exemples de commit:

- S'ha incorporat el component de "login" a l'aplicació, funciona l'estil però encara no tenim la call a la API i per tant no podem validar els usuaris a la BD, per tant no està acabat.

Podria quedar d'aquesta menera: feature: incorporem component de login.

- Imaginem que s'ha acabat el component per fer login a la web. Tot funciona bé, fa les validacions correctament i el disseny no dona errors. Tot va bé.

Podem fer: update: login acabat. 

- Estem fent un component que crida a una API per fer "X" i aquesta ens dona un error que no som capaços de solucionar i necesitem ajuda. Per altra banda tenim més feina o podem treure'n per un altre costat. 

Podriem fer: error: La call de la API per fer "X" peta (O el que passi, si tenim número d'error el podem posar).

- Aquella mateixa tarda el company que fa la API sap que està passant i ens ajuda a solucionar-ho. Faltava acabar una cosa per fer la trucada i obtenir repsosta.

Ho podem actualitzar i un cop el codi funciona bé > commit: fixed: la call ja funciona.


## Comandes bàsiques de Git.

Per clonar un repositori nou et situes a la carpeta on vols que es guardi localment i escrius `git clone <url>`.

Per crear una branca nova "branch" fem `git branch <nom_branca>` i la creem localment.

Fem servir `git push -u <remote> <nom_branca>` per publicar la branca creada anteriorment al repository.

Per veure les branques existents `git branch` o també `git branch --list`.

Per eliminar una branca (PR acceptada per exemple) ho fem amb `git branch -d <nom_branca>`.

Fes servir `git status` per obtenir informació detallada de; _commits, push, pulls_. Arxius en _staged, unstaged o untracked_ i _també arxius creats, editats o eliminats_. 

Fes servir `git checkout` per saber la branca actual i `git checkout + nom_branca` per canviar de la branca actual a la nova branca.

Podem crear una nova branca i canviar a ella directament amb `git checkout -b <nom_branca>`. És un 2 en 1.

Per fer commit ho podem fer per el IDE (més fàcil i visual) o bé per comanda, més ràpid. Per fer-ho `git commit -m "missatge"`.
S'ha de tenir en compte que és local, si el volem publicar al repositori s'ha de fer amb un **push**.

Per publicar el commit al repository `git push <remote> <nom_branca>`. **Sempre** desrpés d'un commit i sent conscients que funciona i està ben fet.
Ja que el "push" només funcionarà si el commit està ben fet. Hi ha altres variants d'aquesta comanda.

Per actualitzar-nos localment post-PR (sempre que hagi anat tot bé) ho farem amb un "pull" `git pull <remote>`


## Altres :speech_balloon:


        