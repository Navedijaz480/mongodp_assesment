const express = require("express");
const router = express.Router();

const BuilddingController = require("../controller/BuilddingController");
router.post("/add_buildding", BuilddingController.addBuildding);
router.get("/get_buildding", BuilddingController.getBuildding);
router.get("/id", BuilddingController.getById);
router.get("/update_status/:id", BuilddingController.updateStatus);

router
  .route("/:id")
  .get(BuilddingController.getById)
  .patch(BuilddingController.updateById)
  .delete(BuilddingController.deleteById);

module.exports = router;