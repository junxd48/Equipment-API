/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 }
];

// read all
app.get('/api/equipment', (req, res) => {
  res.status(200).json(equipment);
});

// Keep the filter route before /:id.
// read by category
app.get('/api/equipment/filter', (req, res) => {
  const category = req.query.category;
  const filteredEquipment = equipment.filter(
    (item) => item.category === category
  );
  res.status(200).json(filteredEquipment);
});

// read by id
app.get('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found' });
  }
  res.status(200).json(equipment[id]);
});

// create new 
app.post('/api/equipment', (req, res) => {
  const newEquipment = req.body;
  // check if equipment already exists
  const existingEquipment = equipment.find(
    (item) => item.name === newEquipment.name
  );
  if (existingEquipment) {
    return res.status(409).json({
      message: 'Equipment already exists'
    });
  }
  equipment.push(newEquipment);
  res.status(201).json(newEquipment);
});

// update an equipment
app.put('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedEquipment = req.body;

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({
      message: 'Equipment not found'
    });
  }
  equipment[id] = updatedEquipment;
  res.status(200).json(equipment[id]);
});

// delete an equipment
app.delete('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  
  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({
      message: 'Equipment not found'
    });
  }

  const deletedEquipment = equipment.splice(id, 1);
  res.status(200).json({
    message: 'Equipment deleted successfully',
    equipment: deletedEquipment[0]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
