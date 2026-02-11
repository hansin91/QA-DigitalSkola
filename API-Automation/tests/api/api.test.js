import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import { ADD_PRODUCT_SCHEMA, CLIENT_ERROR_SCHEMA, PRODUCT_SCHEMA } from "../schema/schema.js";
import { before } from "mocha";

const BASE_URL = "https://api.escuelajs.co/api/v1";
const API_URL = `${BASE_URL}/products`;

const createProduct = async (payload, extraHeader = {}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...extraHeader,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { response, data };
};

const deleteProduct = async (productId) => {
  const response = await fetch(`${API_URL}/${productId}`, { method: "DELETE" });
  return { response, data: await response.json() };
};

const getProductBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/slug/${slug}`);
  return { response, data: await response.json() };
};

describe("Store API Testing", () => {
  let productId = 0;
  describe("Add new product", async () => {
    it("Create a new product successfully", async () => {
      const payload = {
        title: "Gouwn with Red velvet",
        price: 350,
        description: "A description of red velvet gouwn",
        categoryId: 1,
        images: ["https://images.pexels.com/photos/2233703/pexels-photo-2233703.jpeg"],
      };

      const { response, data } = await createProduct(payload);
      expect(response.status).to.equal(201);
      productId = data.id;
      if (productId) await deleteProduct(productId);

      const ajv = new Ajv();
      const validate = ajv.compile(ADD_PRODUCT_SCHEMA);
      const schemaValidation = validate(data);
      expect(schemaValidation).to.be.true;

      expect(data).to.be.an("object");
      expect(data.title).to.equal(payload.title);
      expect(data.price).to.equal(payload.price);
      expect(data.description).to.equal(payload.description);
      expect(data.images).to.deep.equal(payload.images);
      expect(data.category).to.be.an("object");
      expect(data.category.id).to.equal(payload.categoryId);
    });

    it("Failed when a required file is empty (e.g., title)", async () => {
      const payload = {
        title: "",
        price: 350,
        description: "A description of red velvet gouwn",
        categoryId: 1,
        images: ["https://images.pexels.com/photos/2233703/pexels-photo-2233703.jpeg"],
      };

      const { response, data } = await createProduct(payload);
      expect(response.status).to.equal(400);

      const ajv = new Ajv();
      const validate = ajv.compile(CLIENT_ERROR_SCHEMA);
      const schemaValidation = validate(data);
      expect(schemaValidation).to.be.true;

      expect(data.error).to.contain("Bad Request");
      expect(data.message.length).to.greaterThan(0);
    });

    it("Failed when a required field is missing (e.g., title)", async () => {
      const payload = {
        price: 45,
        description: "A description of yellow hoody",
        categoryId: 1,
        images: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"],
      };

      const { response } = await createProduct(payload);
      expect(response.status).to.be.within(400, 499, "Status code should be 400");
    });

    it("Failed when invalid types (price as string) ", async () => {
      const payload = {
        title: "Red Hoody",
        price: "45",
        description: "A description of red hoody",
        categoryId: 1,
        images: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"],
      };
      const { response, data } = await createProduct(payload);
      if (response.status === 201) {
        productId = data.id;
        if (productId) await deleteProduct(productId);
        // throw new Error("Price should be integer type");
      }
      expect(response.status).to.be.oneOf([400, 422], "Price should be integer type");
    });

    it("Failed when a category does not exist", async () => {
      const payload = {
        title: "Red Hoody",
        price: 65,
        description: "A description of red hoody",
        categoryId: 99999999,
        images: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"],
      };
      const { response } = await createProduct(payload);
      expect(response.status).to.be.equal(400);
    });
  });

  describe("Get product by slug", async () => {
    let slug = "";
    let productId = 0;
    before(async () => {
      const payload = {
        title: "Jean's stylish Jacket",
        price: 245,
        description: "A description of stylish jacket",
        categoryId: 1,
        images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
      };
      const { data } = await createProduct(payload);
      productId = data.id;
      slug = data.slug;
    });

    after(async () => {
      if (productId) await deleteProduct(productId);
    });

    it("Load a product detail by slug", async () => {
      const { response, data } = await getProductBySlug(slug);
      expect(response.status).to.equal(200);
      const ajv = new Ajv();
      const validate = ajv.compile(PRODUCT_SCHEMA);
      const schemaValidation = validate(data);
      expect(schemaValidation).to.be.true;

      expect(data.slug).to.equal(slug);
    });

    it("Product not found when invalid slug", async () => {
      const { response, data } = await getProductBySlug("handmade-fresh-table");
      expect(response.status).to.be.oneOf([400, 404]);
      expect(data).haveOwnProperty("message");
    });

    it("Case sensitivity of slug", async () => {
      function toTitleSlug(slug) {
        return slug
          .split("-")
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("-");
      }
      slug = toTitleSlug(slug);
      const { response, data } = await getProductBySlug(slug);
      expect(response.status).to.be.oneOf([400, 404]);
      expect(data).haveOwnProperty("message");
    });
  });
});
