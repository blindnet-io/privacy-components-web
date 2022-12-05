import { html } from 'https://unpkg.com/lit@latest/index.js?module';
import { str } from 'https://unpkg.com/@lit/localize@latest/lit-localize.js?module';

// Do not modify this file by hand!
/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
const templates = {
    'demand-form-action-sentence-start': `Détails de ma`,
    'h00995735c540a9b2': html `L'organisation <strong>n'a pas</strong> de
                          données sur vous`,
    'h13d5761d00e9feca': html `Ce système et tous les systèmes au sein de cette organisation`,
    'h19239c6c3bcb708a': html `Toutes représentations graphiques (image, vidéo) de moi`,
    'h1c2eb9adfca54c27': html `Toutes les informations permettant de me classer dans une catégorie démographique`,
    'h2aec9ed333a3965d': html `<b>Toutes</b> les catégories de données que l'organisation a sur moi`,
    'h2e0471ec4dcdc556': html `Données relatives à mes caractéristiques génétiques`,
    'h3c711aa2f112dd02': html `Révoquer <b>tous</b> les consentements`,
    'h3e84c2b5bd403e6a': html `Obtenues auprès d'un utilisateur, fournissant des données sur lui-même`,
    'h44e758245f098aed': html `Prénoms, Noms, surnoms et autres noms`,
    'h4606c8f9df5fda02': html `${0}
                            Demande`,
    'h47caddfa59939013': html `<b>Toutes</b> les informations relatives aux pratiques de traitement de données et à mes données`,
    'h4cdb7d228db17962': html `Transférées depuis un autre système`,
    'h5033dab8c17f05f2': html `Traitée`,
    'h581c73258e16b269': html `Localisation géographique`,
    'h5974ce8e8b048cf4': html `Données sur mon comportement`,
    'h5c13ee829f9345d8': html `Transférées depuis le<i>${0}</i> système`,
    'h5ca5531e6edbcbd6': html `Obtenues auprès d'un utilisateur, fournissant des données sur lui-même, dans
                  le <i>${0}</i> système`,
    'h67e8c8ac8d7bb0d9': html `Un <b><i>périmètre</i></b> décrit un ou plusieurs types de
              données (<i>catégories de données</i>), comment elles sont traitées (<i>catégories de traitement</i>), et pourquoi elles sont traitées (<i>buts du traitement</i>).`,
    'h708a9ebbef41c270': html `Les données sur les relations que j'ai avec les autres, activité sociale et interaction`,
    'h7a93d23c2fe2e792': html `Toutes données qui m'identifient de manière unique`,
    'h84d8977d66f8ae52': html `<b>Tous</b> les buts`,
    'h87332548e751bc1c': html `<b>Autre donnée :</b> Spécifiez un autre type de donnée`,
    'h906586cf73f251ad': html `Révoquer <b>certains</b> consentements (sélectionnez ceux que vous souhaitez <b>révoquer</b>)`,
    'h9210239263c5ae81': html `Données permettant de me contacter`,
    'h9552e7ccf7b9afc6': html `Ce système, tous les systèmes au sein de cette organisation et tous les partenaires avec lesquels des données ont été <b>partagées ou obtenues</b>`,
    'h9c3201e3fb42f57f': html `Obtenues auprès d'un utilisateur`,
    'ha029657b4c716b1c': html `Groupes et organisations auxquels je suis lié par le travail, les études ou l'adhésion`,
    'ha12117b3405289d5': html `Données de paiement, historique financier et données sur ma situation financière`,
    'ha30c4d3b566b6b1a': html `Annulée`,
    'ha6a83bab31190c68': html `Données sur ma santé`,
    'ha8ea706cb7b3c5f2': html `Toutes les cibles`,
    'haf63d34c8601dd41': html `${0}`,
    'hb2029b140d2b8e3a': html `Ce système`,
    'hba521eb4ef623c9e': html `<b>Toutes</b> les catégories de traitements`,
    'hc10f9a4c8891fc49': html `<b>Toutes</b> les informations relatives aux pratiques de traitement de données et à mes données`,
    'hc70db2f9828c4ea7': html `Obtenues auprès d'un utilisateur du
                  <i>${0}</i> système`,
    'hc7ebaff05b625ee2': html `Obtenues auprès d'un utilisateur, d'un autre système et/ou dérivées de
                données existantes, dans un autre système`,
    'hcaaf3c1a2b64d70f': html `Dérivées de données existante dans le
                  <i>${0}</i> système`,
    'hcb47993d17bb887d': html `L'organisation <strong>a</strong> des données sur
                          vous`,
    'hcbf29ce484222325': html ``,
    'hcce222f3306e9a66': html `Obtenues auprès d'un utilisateur, d'un autre système et/ou dérivées de
                  données existantes, dans le <i>${0}</i> système`,
    'hcd600f5012ef03c7': html `Ce système, tous les systèmes au sein de cette organisation et tous les systèmes partenaires avec lesquels des données ont été <b>partagées</b>`,
    'hd24d40d3ad44c862': html `Toutes autres catégories ou formes de données`,
    'hd50ab52715fef8a9': html `Toutes données établissant un degré de similitude avec d'autres (par exemple, clusters, profils d'utilisateurs)`,
    'hd5c761f88f15ee20': html `Données sur mes caractéristiques physiques uniques`,
    'hd63ace037da055b1': html `En cours de traitement`,
    'he2005086fb53a347': html `Dérivées de données existantes dans un autre système`,
    'he7ee03a3b8cd0b3a': html `Ce système, tous les systèmes au sein de cette organisation et tous les systèmes partenaires avec lesquels des données ont été <b>obtenues</b>`,
    'heafc12d5a32356ad': html `Donné le ${0}`,
    'heb19908ed8209df2': html `Résumé de la Demande`,
    'hf460bedf6edf9f04': html `
          Données de
          <span class="scope-counter"><b>${0}</b></span>
          catégories, traitées de
          <span class="scope-counter"><b>${1}</b></span>
          façons, pour
          <span class="scope-counter"><b>${2}</b></span>
          buts
        `,
    'hfde9788418b19230': html `<b>périmètre</b>`,
    'hff3b775b64d0793c': html `Partiellement traitée`,
    'hff91edfe0b603c35': html `Données sur l'appareil que j'ai utilisé`,
    's0183ba7ba54416cc': `Contact - Données d'Email`,
    's01a8d45397ec133b': `Sécurité`,
    's035f0451c192f516': `Chargement des demandes...`,
    's055718e64eaa99fb': str `De ${0}`,
    's05df7d9cfd917da2': `Justice`,
    's06512f8e4c8355cb': `Identifiant Unique - Adresse IP`,
    's0651438e4c8377c7': `Identifiant Unique - Identification`,
    's0671d05bf6feb1c5': `Les coordonnées du délégué à la protection des données`,
    's075b3282c6f1f8ba': `Il n'y a aucune information sur le lieu où vos données sont stockées`,
    's08c83907b56ac0a4': `à`,
    's08e22a2dc90d9557': `Transparence`,
    's09d23403a2394adf': `Transparence - Connaissance`,
    's09e91b2be10ba9a7': `Identifiant Unique - Données de Réseaux Sociaux`,
    's0a2434ac9ab6d86f': `Demander des informations sur les pratiques de traitement de données et savoir si le système a des données sur moi`,
    's0aa4aeddbaeb0008': `Restreindre pour une provenance spécifique`,
    's0b0a02a4470de153': `Appareil`,
    's0bc8fc90c7fe8285': `Biométrique`,
    's0c69f72a518db453': `Emploi`,
    's0e871352ba4b17d3': `Révocation`,
    's0fbf6dc6a1966408': `Suivant`,
    's112704ba77c815e3': `Vendre des données à un tiers`,
    's11bafd52956fc434': `Aucune demande à traiter !`,
    's121d4949c579d589': `demande de Transparence - But`,
    's12ee89ea2db800f3': `Anonymisation`,
    's12f6b3b9aa6fe76c': `Recommandée`,
    's13c123f97668a70b': `Accès`,
    's147b846f3bed0096': `dérivées`,
    's19d7082d69fb9605': `Suivre des informations sur le comportement et l'activité des utilisateurs en ligne`,
    's1ac72a304e9962fd': `Les catégories de données que l'organisation a sur moi`,
    's1b5927bac5c7499e': `Modifier ou compléter mes données`,
    's1c62dea8a9fcc2ae': `Transparence - But`,
    's1d678178a2cacb88': `Comportement - Données de Connexion`,
    's1e55a47eccb89757': `Demandes`,
    's1ebe491408762bb4': `Je limite le traitement de mes données au périmètre suivant :`,
    's1f6d6c826285a0d0': `Données de Relations`,
    's1f6e12ff7db89f1a': `demande de Modification`,
    's1f8ebb62edb4014b': `Démographiques - Orientation Sexuelle`,
    's208ea5ca39142a3a': `Transparence - Rétention`,
    's213a15cab3105248': `sont conservées pendant`,
    's2142728a8840d713': `Affiliation adhésion`,
    's21ba09ae7cdd6e66': `Affiliation - Données de Lieu de Travail`,
    's21e36d8fc7bab2d5': `Comportement - Données de Télémétrie`,
    's22837da638fcc66a': `demande de Révocation`,
    's22a6bd776f195c07': `demande de Portabilité`,
    's232c5da90a3947da': `Télécharger vos données`,
    's24713431bc8a3ec8': `Demandes envoyées`,
    's2480bc720a26e622': `Affiliation - Lieu de Travail`,
    's24b43708ccb264f0': `demande de Transparence - Catégories de Traitements`,
    's255eaeef4249ebf2': `Qui peut accéder aux données que l'organisation a sur moi`,
    's25b9a7c705c6942c': `mois après`,
    's28360fa3d4d84322': `Message optionnel`,
    's293e3a9c7dea3414': `Entrée non valide`,
    's297342d4b6ea3424': `demande de Restriction`,
    's298104654055b365': `Restriction`,
    's29ec563d56cf6c6b': `Autres Options`,
    's2a32ad5ec5fc7e5c': `Il n'y a pas de source de données vous concernant`,
    's2a880deefa02ab59': `Profilage`,
    's2b7bb3f9a459d7dd': `Historique bientôt disponible !`,
    's2e39367a8c5564b7': `Autres données`,
    's2fa47f3acd802112': `Identifiant Unique - Compte Utilisateur`,
    's3137e812940ae6b7': `Vos données sont en cours d'obtention, veuillez patienter et ne pas actualiser la page`,
    's3176f9811c35d533': `Catégories de données`,
    's31a4a5e072be4a9d': `Obtenues par un transfert depuis un autre système`,
    's340c4324c106697e': `Vente`,
    's34474de8cf6c9fc9': `Pubilicté`,
    's34596f334f77ca12': `Chargement des détails de la demande...`,
    's3572e59cf0dcad41': `Le traitement est nécessaire à l'exécution d'une mission effectuée dans l'intérêt public ou dans l'exercice d'une autorité publique`,
    's36d273fcd01916af': `En cours de traitement`,
    's381b5599a35bcd11': `Votre demande de portabilité a été approuvée`,
    's38ad01608e1ddf20': `Je sélectionne le`,
    's38f7dd7efa14c98c': `Recherche`,
    's393166d4f3231e3c': `Traitement des données personnelles de telle sorte que les données personnelles ne puissent plus être attribuées à une personne concernée spécifique sans l'utilisation d'informations supplémentaires`,
    's3934f6f7d7ba151c': `Nom :`,
    's3ab6eb333ca4c106': `demande de Transparence - Connaissance`,
    's3acfd7f19f5d1d3b': `Le traitement est nécessaire pour protéger les intérêts vitaux de la personne concernée ou d'une autre personne physique`,
    's3b91d548b3c1db64': `Cliquez pour développer`,
    's3b9d3842690b4065': `Comportement - Préférence`,
    's3ba90bfb0c4793ba': `Le traitement est nécessairement effectué dans le cadre des services fournis à la personne concernée ou des contrats et transactions conclus avec elle`,
    's3bb21faafa4adfe4': `Le traitement est nécessaire aux fins de l'emploi, de la sécurité sociale et de la protection sociale`,
    's3c4b723da364f824': `Contact - Données d'Adresse`,
    's3d93f9ea0c5a13fa': `Image`,
    's3da20143f9e8ada5': `Données de Comportement`,
    's3e43bbb829de6465': `Identifiant Unique - Données d'Identification`,
    's3f2acea3f9106217': `Je souhaite accéder à :`,
    's3fc1f890d4f5a074': `Toutes provenances`,
    's40717e0539504811': `Spécifier une période pour les catgéories de données sélectionnées`,
    's4143d6263470dc7e': `Le traitement est nécessaire à des fins de médecine préventive ou de médecine du travail, pour l'évaluation de la capacité de travail de l'employé, le diagnostic médical, la procuration de soins ou de traitements sanitaires ou sociaux ou la gestion des systèmes et services de santé ou sociaux`,
    's41d0e1ff19aa568b': `Flèche pour développer ou réduire la liste déroulante`,
    's43184a4b085df935': `Les données fournies par la personne concernée`,
    's43ceedf5cc8524cc': `Je m'oppose au traitement des mes données pour un`,
    's4458b825a083bf32': `demande d'Accès`,
    's44c3458a53fa9c48': `Services - Services Basiques`,
    's45aea633edb60ede': `Les données fournies par un utilisateur du système (potentiellement la personne concernée)`,
    's4618111b41da4ae5': `Autre type de donnée :`,
    's47279c5508899779': `Transparence - DPO`,
    's47665adef9b4c820': `Votre demande a été approuvée`,
    's48270e8126b2d43e': `Déduire de manière automatique des données sur la personne, y compris pour le profilage et le regroupement en cluster`,
    's491b94499fd520a5': `Autre but spécifique`,
    's49928d6fe2a8fd6e': `Je m'oppose au traitement de mes données au sein du périmètre suivant :`,
    's49940a6f4a947f4a': `pas moins de`,
    's4b044729b490b909': `Cette demande a été refusée. Raison: `,
    's4b221d259e80e7b6': `Inférence Automatisée`,
    's4b8e28a9f6b6b481': `M'opposer au traitement de mes données`,
    's4c210c9cf5eb43b3': `Il n'y a aucune information sur les personnes qui ont accès à vos données`,
    's4c243c3f1453ac59': `Il n'y a pas de catégories de données sur vous`,
    's4e9963fcaff6c652': `Pour contacter l'utilisateur afin de proposer des produits, des services ou d'autres promotions`,
    's4ffccdcb24fe516c': `Dates non valides !`,
    's50a9a49620765e30': `Consulter et utiliser des données`,
    's50da375325f4276f': `Type :`,
    's51aff46c003815da': `Démographiques - Genre`,
    's538bd2706b2090da': `Partiellement Approuvée`,
    's55b7584ba4fd4ba5': `Votre demande de suppression a été approuvée`,
    's55ec8ec1b154d89c': `Suivi`,
    's56a561b67193c5f3': `Personnalisation`,
    's585fef41538d4f6b': `Aucune demande à afficher`,
    's58db29275a7c5acd': `Démographiques - Données sur les Croyances`,
    's593285644730e804': `Fournir le service de base à la personne`,
    's596b2b3fe93df182': `Les sources d'où viennent les données me concernant`,
    's597bfa27b84f363d': `demande de Transparence - Politiques`,
    's5a48b3d79e3d57e1': `Identifiant Unique - Données d'Adresse IP`,
    's5b1ab0dc1d835fa7': `Le traitement est effectué pour se conformer à une obligation légale`,
    's5ce18a9690b1b5ba': `Catégories de traitements`,
    's5ce3b26debb20854': `Stocker des données pour une utilisation ultérieure, incluant l'adapation et le formatage des données`,
    's5d0a8873a8f42ed5': `demande de Suppression`,
    's6068927c705090ea': `Buts des traitements`,
    's61d28f3db3da4264': `Réponse envoyée`,
    's6238f519db67980d': `Identifiant Unique`,
    's628e070280d4ffef': `Données Fiancières de compte en banque`,
    's6303c9c96b50c164': `Ma demande s'applique aux données provenant de :`,
    's63ce35e313760199': `Affiliation`,
    's6474bdc2902b6b69': `Données de Contact`,
    's64bc2fa2e7402075': `Génération`,
    's6549b89e26be06ee': `Données d'Images`,
    's659e808a77702d35': `Protection Sociale`,
    's65da2532e028b935': `Rendre des données publiquement accessibles`,
    's6766adc97fecdb7c': `Financière`,
    's684a712107b118fe': `Traitées`,
    's6976edd03bbc39db': `Fournies par vous lors de l'utilisation du système`,
    's6b89c52fe7ea6744': `Portabilité`,
    's6e70bde5ac66f7de': `Cette demande est en cours de traitement`,
    's6e7271676eaebf45': `Intérêt Vital`,
    's6f90b5eab3bb96bb': `Les types de données dans mon périmètre sont :`,
    's712b5f5ca69a98bc': `Autres - Données de Preuve`,
    's7154a359944ac56f': str `À ${0}`,
    's7174e3af10fba733': `Message additionnel`,
    's71b60b01f673c416': `demande de Transparence - Bases Légales`,
    's726641e532d6bd7e': `demande de Transparence - Organisation`,
    's730182ad28374cda': `Opposition`,
    's754bfbdde3c2fbbf': `Démographiques - Croyances`,
    's7629854d26f1c5e6': `J'adresse ma demande à :`,
    's76752fb00b3ab121': `Transparence - Catégories de traitements`,
    's77e1c36b35a92152': `Pour fournir à l'utilisateur une expérience personnalisée`,
    's78636b92c1a3909c': `En attente`,
    's792decfb4eff6aa6': `Faire ou connaître autre chose. Veuillez noter que la demande pourrait être plus longue à traiter`,
    's794f12abe8666b7f': `Retour aux demandes`,
    's7b7163270e57e8b4': `Actualiser`,
    's7b81fc085a19b55a': `Les raisons pour traiter les données dans mon périmètre :`,
    's7bcc6ab045e037e2': `Restreindre le traitement de mes données à un périmètre particulier`,
    's7c398dddd3171afc': `Autre - Preuve`,
    's7c3c0641612548f7': `Comportement - Données d'Activité`,
    's7c5e05d40e9c56e9': `Il n'y a aucune catégorie de traitement effectué sur vos données`,
    's7c9992bcec8e44cf': `Restreindre pour une période spécifique`,
    's7d6780e4032b48f2': `utilisateur`,
    's7df54bbc72821f4e': `Démographiques - Données sur le Genre`,
    's7faa0f0ebcb806db': `Transparence - Provenance`,
    's8086d8767e40329d': `Prise de décision automatisée`,
    's80ad94771c626ec2': `pas plus de`,
    's827bbc2fb2917a33': `Partage`,
    's83de2f2eabcad899': `Faire correspondre des données sur une même personne au travers de plusieurs sources de données`,
    's86c0a813feb2e101': `fin du service`,
    's87bae2710b2492c3': `Contact`,
    's87cacfb74533591e': `Pour la formation du personnel, le recrutement, la paie, la gestion, etc.`,
    's88d1c1e15ca1aade': `Alertes`,
    's89ae1e885dc56196': `Identifiant Unique - Données de Compte Utilisateur`,
    's8cb671d3ccc0163a': `Démographiques - Données sur la Race`,
    's8db5bd427e71652a': `Affiliation adhésion`,
    's8db6d10d5c9641df': `Démographiques - Données sur l'Origine`,
    's8e533185069b8d9b': `Collecter des données sur la personne auprès de la personne ou d'une autre source, y compris une autre personne ou un système`,
    's8f3d616b2891dd0d': `Les façons dont les données de mon périmètre sont traitées :`,
    's8f4b90725c742dfd': `Financière compte en banque`,
    's8f83b5cb52f62fd3': `Demandes`,
    's91a3ac163365cce5': `demande d'Opposition`,
    's92cb628ac6c248ad': `transférées`,
    's93390561e1afc0b6': `Refusée`,
    's943ff37beeb8970c': `Le but du traitement des données que l'organisation a sur moi`,
    's956cfa37796224d1': `Je voudrais accéder aux données des catégories suivantes :`,
    's964d2cfe826f7218': `Contact - Données de Téléphone`,
    's9758d00d61bc6bfb': `Demandé :`,
    's9807f589aabcdf73': `début de la relation`,
    's9869411458b789f4': `Contact - Adresse`,
    's98d8f26ab7b65ae0': `début du service`,
    's99db8323c728b6a2': `demande de Transparence - Provenance`,
    's9a2a2fda9cfa1ddc': `Copier le lien`,
    's9c662c11ea400adb': `utilisateur - personne concernée`,
    's9cf1313e5cd787ff': `Données d'Identifiant Unique`,
    's9d29c94545a33542': `Il n'y a aucune base légale pour le traitement de vos données`,
    's9d64b343d41708a7': `Comportement - Données de Préférence`,
    's9f0a5e615ad80bfc': `Fournies par un utilisateur du système`,
    's9f2760d67ffa4687': `date de capture`,
    's9f298d385fc0a783': `Soumettre une demande`,
    's9f5e7bf124a7d1c8': `Avoir mes données supprimées`,
    'sa093d3a69b0f7943': `Autres catégories de traitements`,
    'sa1c91e686db3bd4c': `Contact - Email`,
    'sa226344a76b563a2': `Il n'y a aucune information indiquant si l'organisation dispose de données sur vous`,
    'sa230593c8931148b': `Fournir les services dont la personne a besoin et qui ne font pas partie du service de base`,
    'sa2597570ae2a514b': `Description :`,
    'sa27cc41810878675': `Comportement - Activité`,
    'sa2a57f4ca828f912': str `De ${0} à ${1}`,
    'sa30c4d3b566b6b1a': `Annulée`,
    'sa442044b586ec8bf': `Action`,
    'sa58a43eaa517ec9e': `Réponse`,
    'sa6ab5184d6315895': `De`,
    'sa7ee6646f0fd7ced': `Où sont stockées les données me concernant`,
    'sa7eea45fe1e4d231': `Collecte`,
    'sa8fb9f24637f10f5': `Accéder à mes données`,
    'sacc3aa0c8f59f856': `Buts`,
    'sad3e3c8146fc920f': `Statut`,
    'sae19feef2bd60f9f': `Cette demande a été partiellement approuvée`,
    'saedc3af85cfe6dc7': `Cible de la Demande`,
    'saf349b7ca2f1b5ce': `demande de Transparence`,
    'saf60db23f48e15d9': `Stockage`,
    'safdf52d3db58ccbb': `Dérivées des actions de l'utilisateur, extraites d'autres données ou déduites`,
    'sb0e683c9fb3cc3b5': `Non Recommandée`,
    'sb237ed4890fc3b37': `Comportement - Télémétrie`,
    'sb2ebc88d3c0d2d14': `Révoquer un consentement précédemment donné pour le traitement de mes données`,
    'sb3d4f79d9d8b71e5': `Envoyer`,
    'sb3e8587e0fb82077': `Affiliation - Données d'Adhésion Syndicale`,
    'sb41b2cfbbc52565b': `Création`,
    'sb48ca5b949c9e482': `Données de Localisation`,
    'sb58ce3ee7c93d3b5': `Produire de nouvelles données relatives à la personne comme l'enregistrement de photo, voix ou vidéo, ou l'enregistrement d'actions utilisateurs pour en faire un historique`,
    'sb5a6f73a21ad7dc5': `Développez la liste déroulante pour personnaliser votre périmètre`,
    'sb7a10b9644ec1870': `Votre demande de transparence a été approuvée et divisée en plusieurs demandes ci-dessous`,
    'sb852d100f91db23f': `Aucune demande à afficher`,
    'sb9586fe24efc93c6': `Données Démographiques`,
    'sba276cb8c1f20862': `Démographiques - Âge`,
    'sba4d027000b24726': `Affiliation - Données d'École`,
    'sbaace8219b5f4612': `Tout sélectionner`,
    'sbaf0a7c417e388af': `Santé`,
    'sbb56c7b43dca3565': `Les données dérivées des actions de l'utilisateur, extraites d'autres données ou déduites`,
    'sbbaad0d65c8d25aa': `demande de Transparence - Où`,
    'sbbb81705e6790a3c': `Données Financières`,
    'sbbc22dd988ec7fc4': `Données Génétiques`,
    'sbd5cf6928792aa61': `Démographiques - Données sur l'Orientation Sexuelle`,
    'sbe01eafd8958380c': `Recherche Scientifique et Étude de Marché`,
    'sbec2072e6d47df18': `demande de Transparence - DPO`,
    'sbed7c16bacbe2364': `Il n'y a aucune information sur la durée de conservation de vos données`,
    'sbfbdf997d43c2403': `Données de Profilage`,
    'sc012f988b7ad6aed': `Démographiques - Origine`,
    'sc0903d723b382f53': `Détails de ma demande :`,
    'sc0cb6c17db8d9e1c': `Il n'y a aucune information sur les politiques appliquées au traitement des données`,
    'sc12f511c98f7f0dc': `Votre demande de révocation de consentement a été approuvée`,
    'sc1628adf9b7d6b65': `Identifiant Unique - Réseaux Sociaux`,
    'sc16e00a7a8b2fde2': `Retour`,
    'sc30e2031cb4c1e39': `Données d'Appareil`,
    'sc35bea743e6a3aa2': `Transparence - Politiques`,
    'sc3f063a1f8ee6d42': `Les politiques appliquées au traitement de mes données`,
    'sc420894701de5ea3': `Modification`,
    'sc63ac9a7839ff67c': `Médical`,
    'sc701a36eb0707b6e': `Démographiques - Race`,
    'sc7deb5f37293e501': `Si l'organisation a des données sur moi`,
    'sc93bffea1ecccd28': `Je voudrais supprimer les données des catégories suivantes :`,
    'sc9e494c8346b7cb5': `Autre`,
    'scbf29ce484222325': ``,
    'sccb6b30ae5a61c02': `Pour le fonctionnement et la sécurité du produit, l'application des conditions d'utilisation, la prévention des fraudes, la protection des utilisateurs et des biens, etc.`,
    'scce5ff1ed4bbfeb2': `Il n'y a aucune information sur les buts de traitements de vos données`,
    'scd73a2ff5bb51768': `Les données obtenues par un transfert depuis un autre système`,
    'sce2c42fd7076a0ad': `Je révoque les consentements suivants :`,
    'sce609a90c72becb9': `Les bases légales pour le traitement de mes données (incluant les intérêts légitimes)`,
    'scf3d7fe3d333384b': `Je voudrais :`,
    'sd0680e7343dedb27': `Refuser`,
    'sd146a706d91d6dc7': `Données Biométriques`,
    'sd1c189abaf754629': `Pour combien de temps sont conservées les données me concernant`,
    'sd22025af1f467374': `Je voudrais savoir :`,
    'sd256a1527b556494': `Génétique`,
    'sd25a75c08073005d': `Personne concernée`,
    'sd34681e25ec9a24f': `Marketing`,
    'sd3b15d6d4ea696f7': `Mon message additionnel :`,
    'sd4520937a52ffc4d': `Le traitement est nécessaire à l'établissement, l'exercice ou la défense d'un droit en justice ou à tout moment où les tribunaux agissent dans l'exercice de leurs fonctions judiciaires`,
    'sd48ca659208e0c35': `Services - Services Additionnels`,
    'sd4f3b1edddb791ce': `Pour afficher des annonces ciblées sur l'utilisateur spécifique ou non ciblées`,
    'sd5b7c7380eaa3926': `Démographiques - Données sur l'Âge`,
    'sd5cb4c0ac4fa8ca6': `Je limite le traitement de mes données à`,
    'sd5e82049916f5aa0': `Comportement - Connexion`,
    'sd618af95c6055b8c': `Transparence - Catégories de données`,
    'sd7076a5eb4212b38': `Relations`,
    'sd7146754c9355360': `Transparence - Qui`,
    'sd7c908a61557d927': `Transparence - Organization`,
    'sdc48acf07f776cb1': `Les catégories de traitements effectués sur les données que l'oragnisation a sur moi`,
    'sdc673e73b5c13aea': `Suppression`,
    'sdf7c88ae65f54276': `Votre demande de modification a été approuvée`,
    'se025d2a5dd4128f5': `Affiliation - Adhésion Syndicale`,
    'se05f0d609b64589c': `Votre demande de restriction a été approuvée`,
    'se1ad99292eaa4000': `Envoyer la demande`,
    'se1c45b4c74b2840a': `Conformité`,
    'se22c8d93a5dec6c3': `Données d'Affiliation`,
    'se2b203c77031740e': `Autre message`,
    'se2c51ad0e243477d': `Données de Santé`,
    'se33c5b54381239f7': `Il n'y a aucune information sur l'organisation`,
    'se40a735383dec962': `Annuler la demande`,
    'se4c36df50ac776c6': `fin de la relation`,
    'se6589c06149b15cc': `Il n'y a aucun DPO repertorié`,
    'se7db4c6959b7d393': `Transparence - Où`,
    'se90de8a37c063005': `demande de Transparence - Conservation`,
    'se9a6555c13f02262': `Affiliation - Ecole`,
    'se9d3fd22de82a3a2': `Données de Noms`,
    'se9e76660770debd1': `Cette demande a été annulée`,
    'seb19908ed8209df2': `Résumé de la Demande`,
    'sebbb864b5cee4a82': `Veuillez noter que l'ajout d'un message personnalisé peut entraîner un délai de traitement plus long`,
    'sede62db83f81a130': `Contact - Téléphone`,
    'see2fcaedf9743ec6': `Localisation`,
    'see4e21f60d66f454': `Approuvée`,
    'see4fad7db93f594b': `Intérêt Public`,
    'sef16778fe7074a8d': `Approuver`,
    'sef49aec68fd1dc66': `Nom`,
    'sef4fb4ae50ad09c5': `L'identité et les coordonnées de l'organisation traitant mes données`,
    'sefcd28524d5a7a14': `Autre Demande`,
    'sf001a3d2b15b8787': `Utilisation`,
    'sf0da5c24d6d9dd80': `Publication`,
    'sf2f18e811b53b013': `demande de Transparence - Qui`,
    'sf31b34a597b18b5f': `demande de Transparence - Catégories de données`,
    'sf33a710108e9f843': `Autres options :`,
    'sf4c59c00ddcda487': `Comportement`,
    'sf55d634dcc743595': `Services`,
    'sf71bab33326da61c': `Je souhaite supprimer :`,
    'sf73152adfeeec472': `Partager des données de manière contrôlée avec des acteurs clairement identifiés`,
    'sf91b17a548f3d04e': `Prise de Décision Automatisée`,
    'sf993bb199fefbe04': `Tous`,
    'sfa4fa48e6eecb702': `Démographique`,
    'sfa8da7259c07d643': `Autre But`,
    'sfb7446376756e8bc': `Autre traitement`,
    'sfc317a214ea59dcf': `Transparence - Bases Légales`,
    'sfcfd5cc8ded3a99e': `Affiliation - Données d'Adhésion`,
    'sfdad6bb711adaff5': `Votre demande d'opposition a été approuvée`,
    'sfef5aebda25a65db': `Erreur lors de l'obtention des détails de la demande. Veuillez actualiser la plage plus tard.`,
    'sff7e60a212b3fa64': `Prendre mes données et les faire transférer ailleurs`,
};

export { templates };
//# sourceMappingURL=fr-FR.js.map
