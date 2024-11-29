// controllers/model1Controller.js
const Model1 = require('../models/model1');
const Model1Fb = require('../models/model1_fb');

// Example function to create a new entry in model1
async function createModel1(req, reply) {
  const { name, description } = req.body;

  try {
    const newEntry = await Model1.create({ cc, age, hoi, user, full_response });
    return reply.code(201).send(newEntry);
  } catch (error) {
    return reply.code(500).send({ error: 'Error creating entry in model1' });
  }
}

// Example function to get all entries in model1
async function getAllModel1(req, reply) {
  try {
    const entries = await Model1.findAll();
    return reply.send(entries);
  } catch (error) {
    return reply.code(500).send({ error: 'Error fetching entries from model1' });
  }
}

async function storeModel1(req, reply) {
  const { id, cc, hoi, age, full_response, data } = req.body;

  try {
    let model1Id;

    if (id && id !== 0) {
      // Update the existing model
      //const existingModel = await Model1.where('id', id).first();

      const existingModel = await Model1.findOne({ where: { id } });
      if (existingModel) {
        await existingModel
          .update({
            cc: cc,
            hoi: hoi,
            age: age,
            full_response: full_response,
          });

        // Delete related records
        //await Model1Fb.where('model1_id', id).del();
        await Model1Fb.destroy({ where: { model1_id: id } });
      }

      model1Id = id;
    } else {
      // Insert a new model
      const createdBy = req.user.id;//req.user ? req.user.name : 'anonymous'; // Replace with actual user authentication logic
      const createdDt = new Date().toDateString();

      /* const [newModelId] = await Model1.create({
        cc: cc,
        hoi: hoi,
        age: age,
        full_response: full_response,
        created_by: createdBy,
        user: createdBy,
        created_dt: createdDt,
      });

      model1Id = newModelId; */

      const result = await Model1.create({
        cc: cc,
        hoi: hoi,
        age: age,
        full_response: full_response,
        created_by: createdBy,
        user: req.user.name,
        created_dt: createdDt,
      });
      
      newModelId = result;//[0] || null; // Safely extract the new ID
      model1Id = result.id;
    }

    // Process related data
    if (Array.isArray(data)) {
      const relatedData = data.map((value) => ({
        model1_id: model1Id,
        icd10: value.icd10_code,
        feedback: value.feedback,
        missing: value.missing,
      }));

      await Model1Fb.bulkCreate(relatedData);
    }
      /* if (data && Array.isArray(data)) {
        const relatedData = data.map((value) => ({
          model1_id: model1Id,
          icd10_id: value.response ? value.response.icd10_code : null,
          feedback: value.feedback || null,
          missing: value.missing || null,
        }));
      
        if (relatedData.length > 0) {
          await db('model1_fb').insert(relatedData);
        }
      } else {
        console.warn('Data is not an array or is undefined:', data);
      } */
    // Send the response back with the model ID
    reply.send({ id: model1Id });
  } catch (error) {
    console.error('Error handling request:', error);
    reply.status(500).send({ error: 'An error occurred while processing the request.xxx' , data: req.body.data, body: req.body, hoi: req.body.hoi});
  }
}


module.exports = {
  createModel1,
  getAllModel1,
  storeModel1,
};
