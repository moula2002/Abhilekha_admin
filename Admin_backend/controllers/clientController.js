import Client from '../models/Client.js';



// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
export const getClients = async (req, res) => {
  const clients = await Client.find({});
  res.json(clients);
};

// @desc    Create a client
// @route   POST /api/clients
// @access  Private
export const createClient = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !image || !category) {
      return res.status(400).json({ message: 'Please provide name, category, and image' });
    }

    const client = new Client({
      name,
      category,
      image
    });

    const createdClient = await client.save();
    res.status(201).json(createdClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};





// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private
export const updateClient = async (req, res) => {
  const { name, image, category } = req.body;

  const client = await Client.findById(req.params.id);

  if (client) {
    client.name = name || client.name;
    client.category = category || client.category;
    client.image = image || client.image;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};


// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private
export const deleteClient = async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};
