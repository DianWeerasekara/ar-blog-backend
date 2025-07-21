import request from "supertest";
import { AppDataSource } from "../data-source";
import app from '../app'

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async ()=> {
    await AppDataSource.destroy();
});

describe("User API Tests", () => {
    let createdUserId: number;

    it("should create a user", async() => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "Test User",
                email: "testemail@gmailcom"
            })
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("userid");
        expect(res.body.name).toBe("Test User");
        expect(res.body.email).toBe("testemail@gmailcom");
        createdUserId = res.body.userid;
    });

    it("should fetch all users", async() => {
        const res = await request(app).get("/users");
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should fetch a user by id", async() => {
        const res = await request(app).get(`/users/${createdUserId}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("userid", createdUserId);
        expect(res.body.name).toBe("Test User");
    });
    
    it("should update a user", async() => {
        const res = await request(app)
            .put(`/users/${createdUserId}`)
            .send({ name: "Updated User", email: "updated@example.com" });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated User");
    });

    it("should delete a user", async () => {
        const res = await request(app).delete(`/users/${createdUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User deleted successfully");
     });

})