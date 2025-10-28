import { Router } from "express";
import { UserController } from "../controllers/user";
import { Database } from "better-sqlite3";

export function createUserRoutes(db: Database) {
  const router = Router();
  const controller = new UserController(db);

  router.post("/", controller.createUser);
  router.get("/", controller.getAllUsers);
  router.get("/:id", controller.getUserById);
  router.put("/:id", controller.updateUser);
  router.delete("/:id", controller.deleteUser);

  return router;
}
