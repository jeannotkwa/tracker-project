# Configuration Email avec Resend

## 1. Création du compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour inclus)
3. Vérifiez votre email

## 2. Configuration du domaine

### Option A: Domaine personnalisé (recommandé)
1. Dans le dashboard Resend, allez dans "Domains"
2. Cliquez "Add Domain"
3. Entrez votre domaine (ex: constructpro.fr)
4. Ajoutez les enregistrements DNS fournis :
   \`\`\`
   Type: MX
   Name: @
   Value: feedback-smtp.eu-west-1.amazonses.com
   Priority: 10
   
   Type: TXT
   Name: @
   Value: "v=spf1 include:amazonses.com ~all"
   
   Type: TXT
   Name: _dmarc
   Value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@constructpro.fr"
   
   Type: CNAME
   Name: [clé fournie par Resend]
   Value: [valeur fournie par Resend]
   \`\`\`
5. Attendez la vérification (peut prendre jusqu'à 72h)

### Option B: Sous-domaine Resend (rapide)
- Utilisez directement `onboarding@resend.dev` pour les tests

## 3. Génération de la clé API

1. Dans le dashboard, allez dans "API Keys"
2. Cliquez "Create API Key"
3. Nommez-la "ConstructPro Production"
4. Sélectionnez les permissions :
   - ✅ Send emails
   - ✅ Domain access (si domaine personnalisé)
5. Copiez la clé (elle ne sera plus visible après)

## 4. Configuration des variables d'environnement

### Vercel (Production)
\`\`\`bash
# Dans le dashboard Vercel, section Environment Variables
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://constructpro.fr
EMAIL_FROM=contact@constructpro.fr
EMAIL_TO=contact@constructpro.fr
\`\`\`

### Local (.env.local)
\`\`\`bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_FROM=contact@constructpro.fr
EMAIL_TO=contact@constructpro.fr
\`\`\`

## 5. Test de la configuration

1. Déployez sur Vercel
2. Testez le formulaire de contact
3. Vérifiez la réception des emails
4. Consultez les logs Resend pour le suivi

## 6. Monitoring et limites

### Plan gratuit Resend :
- 100 emails/jour
- 3 000 emails/mois
- Support email

### Plan Pro (20$/mois) :
- 50 000 emails/mois
- Support prioritaire
- Analytics avancées
- Webhooks

## 7. Dépannage

### Emails non reçus :
1. Vérifiez les spams
2. Consultez les logs Resend
3. Vérifiez la configuration DNS
4. Testez avec un autre email

### Erreurs API :
- Vérifiez la clé API
- Contrôlez les limites de taux
- Vérifiez le format des emails

## 8. Sécurité

- ✅ Clé API en variable d'environnement
- ✅ Validation des données côté serveur
- ✅ Rate limiting implémenté
- ✅ Sanitisation des inputs
- ✅ HTTPS obligatoire en production
\`\`\`

Créons un script de test pour vérifier la configuration :
