
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // console.log(`For DB:`, assessment);
  const instrument_type = `Cat Behavioral Instrument`;
  const calc_score = parseInt(assessment.PreContact) +
                    parseInt(assessment.PhysAltCat) +
                    parseInt(assessment.PhysAltOwner) +
                    parseInt(assessment.PlaysDogs) +
                    parseInt(assessment.HissesStr);
  const risk_level = calc_score <= 1 ? `low` : calc_score >= 2 && calc_score <= 3 ? `medium` :
    calc_score >= 4 ? `high` : `unknown`;
  const cat_Name = assessment.CatName;
  const cat_DOB = new Date(assessment.CatDateOfBirth);
  // console.log(instrument_type);
  // console.log(score1);
  // console.log(risk_level);
  // console.log(cat_Name);
  // console.log(cat_DOB);
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  try {
    await Assessment.create({
      catDateOfBirth: cat_DOB,
      catName: cat_Name,
      instrumentType: instrument_type,
      riskLevel: risk_level,
      score: calc_score,
    });
  } catch (e) {
    console.error(`Error inserting data`, e);
  }
};

exports.getList = async (query = {}) => {

  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  try {
    // You can pass query filters to findAll if needed
    const where = {};
    if (query.id) { where.id = Number(query.id); }
    if (query.catName) { where.catName = query.catName; }
    if (query.catDateOfBirth) { where.catDateOfBirth = query.catDateOfBirth; }
    if (query.instrumentType) { where.instrumentType = query.instrumentType; }
    if (query.riskLevel) { where.riskLevel = query.riskLevel; }
    if (query.score) { where.score = Number(query.score); }
    if (query.createdAt) { where.createdAt = query.createdAt; }
    // For pagination
    // const page = Number(query.page) > 0 ? Number(query.page) : 1;
    // const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
    // const offset = (page - 1) * pageSize;
    // const limit = pageSize;

    /* console.log(`Filter query:`, query, `Sequelize where:`, where);

    const assessments = await Assessment.findAll({
      where,
      attributes: [
        `id`,
        `catName`,
        `catDateOfBirth`,
        `instrumentType`,
        `score`,
        `riskLevel`,
        `createdAt`,
      ],
      raw: true,
    });
    return assessments;
    */
    const findOptions = {
      attributes: [
        `id`,
        `catName`,
        `catDateOfBirth`,
        `instrumentType`,
        `score`,
        `riskLevel`,
        `createdAt`,
      ],
      //   limit,
      //   offset,
      raw: true,
    };

    // Only add 'where' if there are filters
    if (Object.keys(where).length > 0) {
      findOptions.where = where;
    }

    // console.log(`Filter query:`, query, `Sequelize where:`, where);
    //  const totalCount = await Assessment.count({ where });
    //  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    // const assessments = await Assessment.findAll(findOptions);
    // return { assessments, totalPages };
    const assessments = await Assessment.findAll(findOptions);
    return assessments;

  } catch (e) {
    console.error(`Error fetching assessments`, e);
    // return { assessments: [], totalPages: 1 };
    return [];
  }
};
