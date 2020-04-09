module.exports = {
  developmentDatabaseConnection: {
    databaseContainerName: "ds151014",
    databasePort: "51014",
    databaseName: "kanban-variant-development",
    username: "kanban-test-user",
    password: "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  productionDatabaseConnection: {
    databaseContainerName: process.env.DATABASE_CONTAINER_NAME || "ds147946",
    databasePort: process.env.DATABASE_PORT || "47946",
    databaseName: process.env.DATABASE_NAME || "kanban-variant",
    username: process.env.USERNAME || "kanban-admin",
    password: process.env.PASSWORD || "kinethicc69",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
}