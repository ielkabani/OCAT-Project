const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;
      // await console.log(`The data:`, assessment);
      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters
      await AssessmentService.submit(assessment);
      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      // const assessments = [];
      // console.log(`Route hit! req.query:`, req.query);
      // Call the AssessmentService.getList function
      const assessments = await AssessmentService.getList(req.query);
      // console.log(`Incoming query:`, assessments);
      ResponseHandler(
        res,
        `Fetched assessments`, assessments,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.delete(`/:id`, async (req, res, next) => {
  try {
    await AssessmentService.softDelete(req.params.id);
    res.json({ message: `Assessment soft deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = { assessmentRouter };
