const Bundle = require('../models/Bundle');

exports.createBundle = async (req, res) => {
  try {
    const data = { ...req.body, owner: req.user.userId };
    const bundle = new Bundle(data);
    await bundle.save();
    res.status(201).json(bundle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find({ owner: req.user.userId });
    res.json(bundles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBundle = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'Bundle ID is required for update.' });
    }

    const bundle = await Bundle.findOneAndUpdate(
      { _id, owner: req.user.userId },
      updateData,
      { new: true }
    );

    if (!bundle) {
      return res.status(404).json({ error: 'Bundle not found or not authorized.' });
    }

    res.json(bundle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBundle = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Bundle.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ message: 'Bundle deleted successfully' });
  } catch (error) {
    console.error('Error deleting bundle:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
