module.exports = {
  developmentDatabaseConnection: {
    databaseContainerName: "ds151014",
    databasePort: "51014",
    databaseName: "kanban-variant-development",
    username: "kanban-test-user",
    password: "kinethicc69",
    options: { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  productionDatabaseConnection: {
    databaseContainerName: "ds147946",
    databasePort: "47946",
    databaseName: "kanban-variant",
    username: "kanban-admin",
    password: "kinethicc69",
    options: { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
}
