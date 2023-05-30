const express = require("express");
const router = express.Router();

const EmployeeController = require("../controller/EmployeeController");
router.post("/add_employee_record", EmployeeController.addEmployeeRecord);
router.get("/get_employee_record", EmployeeController.getEmployeeRecord);
router.get("/id", EmployeeController.getById);
router.get("/update_status/:id", EmployeeController.updateStatus);

router
  .route("/:id")
  .get(EmployeeController.getById)
  .patch(EmployeeController.updateById)
  .delete(EmployeeController.deleteById);

module.exports = router;