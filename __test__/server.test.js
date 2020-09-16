/* eslint-disable no-undef, no-underscore-dangle */
const supergoose = require("@code-fellows/supergoose");
const http = require("http");
const { server, start } = require("../lib/server");

const mockRequest = supergoose(server);

let testCategoryId;
let testProductId;

const category = {
  name: "category",
  display_name: "category",
  description: "category",
};

const product = {
  name: "adnan",
  display_name: "adnan",
  description: "adnan",
  category: "category",
};

describe("Server module", () => {
  it("Server listening", () => {
    start();
    const options = {
      host: "127.0.0.1",
      port: 3000,
      path: "/",
    };
    const req = http.request(options);
    req.end();
  });

  it("Test Hello World", () => mockRequest
    .get("/").then((response) => {
      expect(response.status).toBe(200);
    }));

  it("Server error status code 404", () => mockRequest
    .get("/not-found").then((response) => {
      expect(response.status).toBe(404);
    }));

  it("POST /categories", () => mockRequest
    .post("/categories")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(200);
      testCategoryId = results.body._id;
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body[key]);
      });
    }));

  it("GET /categories", () => mockRequest
    .get("/categories")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body.result[0][key]);
      });
    }));

  it("GET /categories/id", () => mockRequest
    .get(`/categories/${testCategoryId}`).then((results) => {
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body[0][key]);
      });
    }));

  it("GET /categories/id of not found", () => mockRequest
    .get("/categories/000000000000000000000000").then((results) => {
      expect(results.status).toBe(404);
    }));

  it("PUT /categories/id", () => mockRequest
    .put(`/categories/${testCategoryId}`)
    .send(category)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body[key]);
      });
    }));

  it("PUT /categories/id of not found", () => mockRequest
    .put("/categories/000000000000000000000000")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(404);
    }));

  it("PATCH /categories/id", () => mockRequest
    .patch(`/categories/${testCategoryId}`)
    .send(category)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body[key]);
      });
    }));

  it("PATCH /categories/id of not found", () => mockRequest
    .patch("/categories/000000000000000000000000")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(404);
    }));

  it("DELETE /categories/id", () => mockRequest
    .delete(`/categories/${testCategoryId}`).then((results) => {
      expect(results.status).toBe(200);
    }));

  it("DELETE /categories/id of not found", () => mockRequest
    .delete("/categories/000000000000000000000000").then((results) => {
      expect(results.status).toBe(404);
    }));

  /* products */

  it("POST /products", () => mockRequest
    .post("/products")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        testProductId = results.body._id;
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("GET /products ", () => mockRequest
    .get("/products")
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body.result[0][key]);
      });
    }));

  it("GET /products/id", () => mockRequest
    .get(`/products/${testProductId}`).then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[0][key]);
      });
    }));

  it("GET /products/id of not found", () => mockRequest
    .get("/products/000000000000000000000000").then((results) => {
      expect(results.status).toBe(404);
    }));

  it("PUT /products/id", () => mockRequest
    .put(`/products/${testProductId}`)
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("PUT /products/id of not found", () => mockRequest
    .put("/products/000000000000000000000000")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(404);
    }));

  it("PATCH /products/id", () => mockRequest
    .patch(`/products/${testProductId}`)
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("PATCH /products/id of not found", () => mockRequest
    .patch("/products/000000000000000000000000")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(404);
    }));

  it("DELETE /products/id", () => mockRequest
    .delete(`/products/${testProductId}`).then((results) => {
      expect(results.status).toBe(200);
    }));

  it("DELETE /products/id of not found", () => mockRequest
    .delete("/products/000000000000000000000000").then((results) => {
      expect(results.status).toBe(404);
    }));

  /* api/v1 */

  it("POST /api/v1/inValidModel", () => mockRequest
    .post("/api/v1/inValidModel")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(500);
    }));

  // test categories test case
  it("POST /api/v1/categories", () => mockRequest
    .post("/api/v1/categories")
    .send(category)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(category).forEach((key) => {
        expect(category[key]).toBe(results.body[key]);
      });
    }));

  /* products */
  it("POST /api/v1/products", () => mockRequest
    .post("/api/v1/products")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        testProductId = results.body._id;
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("GET /api/v1/products ", () => mockRequest
    .get("/api/v1/products")
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body.results[0][key]);
      });
    }));

  it("GET /api/v1/products/id", () => mockRequest
    .get(`/api/v1/products/${testProductId}`).then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[0][key]);
      });
    }));

  it("GET /api/v1/products/id of not found", () => mockRequest
    .get("/api/v1/products/000000000000000000000000").then((results) => {
      expect(results.status).toBe(200);
    }));

  it("PUT /api/v1/products/id", () => mockRequest
    .put(`/api/v1/products/${testProductId}`)
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("PUT /api/v1/products/id of not found", () => mockRequest
    .put("/api/v1/products/000000000000000000000000")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      expect(JSON.stringify(results.body)).toBe("{}");
    }));

  it("PATCH /api/v1/products/id", () => mockRequest
    .patch(`/api/v1/products/${testProductId}`)
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      Object.keys(product).forEach((key) => {
        expect(product[key]).toBe(results.body[key]);
      });
    }));

  it("PATCH /api/v1/products/id of not found", () => mockRequest
    .patch("/api/v1/products/000000000000000000000000")
    .send(product)
    .then((results) => {
      expect(results.status).toBe(200);
      expect(JSON.stringify(results.body)).toBe("{}");
    }));

  it("DELETE /api/v1/products/id", () => mockRequest
    .delete(`/api/v1/products/${testProductId}`).then((results) => {
      expect(results.status).toBe(200);
    }));

  it("DELETE /api/v1/products/id of not found", () => mockRequest
    .delete("/api/v1/products/000000000000000000000000").then((results) => {
      expect(results.status).toBe(200);
      expect(JSON.stringify(results.body)).toBe("{}");
    }));
});
