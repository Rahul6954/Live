// controllers/vault/MainCRUD/VaultControllers.js

const Site = require('../../../models/site'); // Corrected import statement
const { encrypt } = require('../../../configs/EncryptionHandler.js');

// GET api/vault-home
const VaultGeneral = (req, res) => {
  res.status(200).json({ success: true, msg: 'Hi There from Vault Home' });
};

const VaultCreate = async (req, res) => {
  const { siteUrl, uname, password } = req.body;

  const encryptedPassword = encrypt(password);

  const site = new Site({
    siteUrl: siteUrl,
    uname: uname,
    password: encryptedPassword,
    // iv: encryptedPassword.iv
  });

  try {
    await site.save();
    await Site.findOneAndUpdate({ siteUrl: siteUrl });
    res.status(200).json({ success: true, msg: 'Added' });
  } catch (err) {
    res.status(401).json({ success: false, msg: 'An error occurred!' });
    console.log(err);
  }
};

module.exports = {
  VaultGeneral,
  VaultCreate,
};
