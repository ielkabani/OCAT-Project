
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  await console.log(`For DB:`, assessment);
  const instrument_type = 1;
  const score1 = parseInt(assessment.PreContact) + parseInt(assessment.PhysAltCat) + parseInt(assessment.PhysAltOwner) +
                parseInt(assessment.PlaysDogs) + parseInt(assessment.HissesStr);
  const risk_level = score1 <= 1 ? `low` : score1 >= 2 && score1 <= 3 ? `medium` : score1 >= 4 ? `high` : `unknown`;
  const cat_Name = assessment.CatName;
  const cat_DOB = new Date(assessment.CatDateOfBirth);
  console.log(instrument_type);
  console.log(score1);
  console.log(risk_level);
  console.log(cat_Name);
  console.log(cat_DOB);
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  try {
    Assessment.create({
      catDateOfBirth: cat_DOB,
      catName: cat_Name,
      instrumentType: instrument_type,
      riskLevel: risk_level,
      score: score1,
    });
  } catch (e) {
    console.error(`Error inserting data`, e);
  }
};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
