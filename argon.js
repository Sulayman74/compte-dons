const argon2 = require('argon2');

async function hashPassword() {
  try {
    // Le mot de passe à hacher
    const password = 'Azerty@1';

    // Générer le hachage du mot de passe
    const hashedPassword = await argon2.hash(password);

    // Afficher le mot de passe haché
    console.log('Hashed Password:', hashedPassword);
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// Exécuter la fonction
hashPassword();
