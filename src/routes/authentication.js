// Route d'inscription
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Vérification si l'utilisateur existe déjà
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }
  
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Création d'un nouvel utilisateur
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role: 'user'
    };
  
    users.push(newUser);
  
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  });
  
  // Route de connexion
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Recherche de l'utilisateur
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
  
    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
  
    // Création du payload JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  
    // Génération du token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  });
  