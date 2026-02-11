export const ADD_PRODUCT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Generated schema for Root",
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    price: {
      type: "number",
    },
    description: {
      type: "string",
    },
    images: {
      type: "array",
      items: {
        type: "string",
      },
    },
    category: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        name: {
          type: "string",
        },
        image: {
          type: "string",
        },
        slug: {
          type: "string",
        },
      },
      required: ["id", "name", "image", "slug"],
    },
    id: {
      type: "number",
    },
    creationAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
  },
  required: [
    "title",
    "slug",
    "price",
    "description",
    "images",
    "category",
    "id",
    "creationAt",
    "updatedAt",
  ],
};

export const PRODUCT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Generated schema for Root",
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    title: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    price: {
      type: "number",
    },
    description: {
      type: "string",
    },
    category: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        name: {
          type: "string",
        },
        image: {
          type: "string",
        },
        slug: {
          type: "string",
        },
      },
      required: ["id", "name", "image", "slug"],
    },
    images: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["id", "title", "slug", "price", "description", "category", "images"],
};

export const CLIENT_ERROR_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Generated schema for Root",
  type: "object",
  properties: {
    message: {
      type: "array",
      items: {
        type: "string",
      },
    },
    error: {
      type: "string",
    },
    statusCode: {
      type: "number",
    },
  },
  required: ["message", "error", "statusCode"],
};
