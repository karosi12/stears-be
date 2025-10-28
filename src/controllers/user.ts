import { Request, Response } from "express";
import { UserService } from "../services/internal-service/user-service";
import { Database } from "better-sqlite3";

export class UserController {
  private service: UserService;

  constructor(db: Database) {
    this.service = new UserService(db);
  }

  createUser = (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: "name and email required" });
      }
      const user = this.service.create({ name, email });
      res.status(201).json(user);
    } catch (err: any) {
      if (/UNIQUE constraint failed/.test(err.message)) {
        return res.status(409).json({ message: "email exists" });
      }
      res.status(500).json({ message: err.message });
    }
  };

  getAllUsers = (_req: Request, res: Response) => {
    const users = this.service.findAll();
    res.json(users);
  };

  getUserById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = this.service.findById(id);
    if (!user) return res.status(404).json({ message: "not found" });
    res.json(user);
  };

  updateUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = this.service.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "not found" });
    res.json(updated);
  };

  deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = this.service.delete(id);
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.status(204).send();
  };
}
